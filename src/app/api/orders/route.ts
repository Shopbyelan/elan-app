import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  productName: z.string(),
  productImg: z.string().nullable().optional(),
});

const orderSchema = z.object({
  items: z.array(itemSchema).min(1),
  subtotal: z.number().positive(),
  deliveryFee: z.number().min(0),
  total: z.number().positive(),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
  address: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const data = orderSchema.parse(body);

    // Verify products exist and prices match
    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json({ message: "One or more products are unavailable" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const reference = `ELN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    // Handle coupon
    let couponId: string | undefined;
    let discount = 0;
    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: data.couponCode, isActive: true },
      });
      if (coupon) {
        couponId = coupon.id;
        discount = coupon.discountType === "PERCENTAGE"
          ? (data.subtotal * coupon.discountValue) / 100
          : coupon.discountValue;
      }
    }

    // Resolve userId — create guest user record if not logged in
    let userId = session?.user?.id;
    if (!userId) {
      const guestUser = await prisma.user.upsert({
        where: { email: data.address.email },
        create: {
          email: data.address.email,
          name: `${data.address.firstName} ${data.address.lastName}`,
          phone: data.address.phone,
          role: "CUSTOMER",
        },
        update: {
          name: `${data.address.firstName} ${data.address.lastName}`,
          phone: data.address.phone,
        },
      });
      userId = guestUser.id;
    }

    // Always save the delivery address (linked to user or guest user)
    const addr = await prisma.address.create({
      data: {
        firstName: data.address.firstName,
        lastName: data.address.lastName,
        phone: data.address.phone,
        address: data.address.address,
        city: data.address.city,
        state: data.address.state,
        userId,
      },
    });

    const order = await createOrder(userId, data, orderNumber, discount, couponId, addr.id);
    const transaction = await createTransaction(order.id, reference, data.total);
    return NextResponse.json({ order, reference: transaction.reference }, { status: 201 });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}

async function createOrder(
  userId: string,
  data: z.infer<typeof orderSchema>,
  orderNumber: string,
  discount: number,
  couponId?: string,
  addressId?: string
) {
  return prisma.order.create({
    data: {
      orderNumber,
      userId,
      addressId,
      couponId,
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      discount,
      total: data.total - discount,
      notes: data.notes,
      status: "PENDING",
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          productName: item.productName,
          productImg: item.productImg,
        })),
      },
    },
  });
}

async function createTransaction(orderId: string, reference: string, amount: number) {
  return prisma.transaction.create({
    data: {
      orderId,
      reference,
      amount,
      currency: "NGN",
      status: "PENDING",
      gateway: "paystack",
    },
  });
}

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
      address: true,
      transaction: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
