import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Élan database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@elan-jewelry.com" },
    create: {
      name: "Élan Admin",
      email: "admin@elan-jewelry.com",
      password: adminPassword,
      role: "ADMIN",
    },
    update: {},
  });
  console.log(`✓ Admin: ${admin.email}`);

  // Categories
  const categories = [
    { name: "18k Gold", slug: "18k-gold", gradient: "gradient-gold", sortOrder: 1, description: "Premium 18k yellow, white, and rose gold pieces — the jeweller's standard." },
    { name: "Sterling Silver", slug: "sterling-silver", gradient: "gradient-silver", sortOrder: 2, description: "925 rhodium-plated sterling silver with anti-tarnish sealing." },
    { name: "Cultivated Diamond", slug: "cultivated-diamond", gradient: "gradient-diamond", sortOrder: 3, description: "GIA-certified lab-grown diamonds, chemically identical to mined." },
    { name: "Platinum", slug: "platinum", gradient: "gradient-platinum", sortOrder: 4, description: "950 platinum — the rarest, purest choice." },
    { name: "Crystal Moissanite", slug: "crystal-moissanite", gradient: "gradient-moiss", sortOrder: 5, description: "DEF colour VVS clarity crystal moissanite — 2.4× the fire of diamond." },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: {},
    });
    createdCategories[cat.slug] = c.id;
    console.log(`✓ Category: ${c.name}`);
  }

  // Products
  const products = [
    {
      name: "Soleil Bangle",
      slug: "soleil-bangle",
      description: "A sculptural bangle in 18k yellow gold, hand-finished to a high polish. The inner surface is satin-finished for comfort against the wrist. 7mm width, available in three internal diameter sizes.",
      shortDesc: "Hand-finished 18k yellow gold bangle with satin interior. 7mm width.",
      price: 1240000,
      comparePrice: null,
      sku: "ELN-001",
      stock: 12,
      material: "18k Yellow Gold",
      isFeatured: true,
      badge: "FEATURED COLLECTION",
      categorySlug: "18k-gold",
      careInstr: "Store in the provided Élan pouch when not worn. Avoid contact with perfumes and chlorine. Polish with a soft cloth to restore brilliance.",
    },
    {
      name: "Lumière Pendant",
      slug: "lumiere-pendant",
      description: "A sculptural teardrop pendant in 18k white gold, suspended on a 45cm fine chain. The pendant's surface is alternately polished and brushed, creating a play of light. Certificate of Authenticity enclosed.",
      shortDesc: "Sculptural teardrop in 18k white gold. 45cm fine chain included. Certificate of Authenticity enclosed.",
      price: 1650000,
      comparePrice: 1900000,
      sku: "ELN-002",
      stock: 8,
      material: "18k White Gold",
      isFeatured: true,
      badge: "NEW ARRIVAL",
      categorySlug: "18k-gold",
    },
    {
      name: "Éclat Chain Necklace",
      slug: "eclat-chain-necklace",
      description: "A rhodium-plated 925 silver chain in a 3mm box link pattern, 42cm in length. Anti-tarnish sealed for lasting brilliance. The clasp is a double-lock lobster claw for security.",
      shortDesc: "Rhodium-plated 925 silver chain, 3mm box link, 42cm length. Anti-tarnish sealed.",
      price: 320000,
      comparePrice: null,
      sku: "ELN-003",
      stock: 25,
      material: "Sterling Silver 925",
      isFeatured: true,
      badge: "SILVER ÉCLAT",
      categorySlug: "sterling-silver",
    },
    {
      name: "Constellation Halo Ring",
      slug: "constellation-halo-ring",
      description: "A 2ct cushion-cut crystal moissanite centre stone, DEF colour, VVS clarity, set in an 18k white gold micro-pavé halo. The shank is comfort-fit for everyday wear. Élan Stone Specification Card included.",
      shortDesc: "2ct cushion-cut crystal moissanite, DEF colour, VVS clarity. 18k white gold halo setting.",
      price: 980000,
      comparePrice: 1200000,
      sku: "ELN-004",
      stock: 6,
      material: "Crystal Moissanite · 18k White Gold",
      isFeatured: true,
      badge: "GIA CERTIFIED",
      categorySlug: "crystal-moissanite",
    },
    {
      name: "Nova Drop Earrings",
      slug: "nova-drop-earrings",
      description: "1ctw oval crystal moissanite drop earrings in a sterling silver 925 rhodium setting. The drops measure 18mm in length and move gently with the wearer. Certificate included.",
      shortDesc: "1ctw oval crystal moissanite drop earrings. Sterling silver 925 rhodium setting. Certificate included.",
      price: 620000,
      comparePrice: null,
      sku: "ELN-005",
      stock: 14,
      material: "Crystal Moissanite · Sterling Silver 925",
      isFeatured: true,
      badge: "CRYSTAL MOISSANITE",
      categorySlug: "crystal-moissanite",
    },
    {
      name: "Absolue Platinum Band",
      slug: "absolue-platinum-band",
      description: "A court-shaped platinum 950 wedding band, 4mm width, weight-comfort interior. The exterior is polished; the interior is satin-finished. Available in full and half sizes.",
      shortDesc: "Court-shaped platinum 950 band, 4mm width. Comfort-fit interior.",
      price: 2100000,
      comparePrice: null,
      sku: "ELN-006",
      stock: 10,
      material: "Platinum 950",
      isFeatured: false,
      badge: "PRESTIGE",
      categorySlug: "platinum",
    },
  ];

  for (const p of products) {
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: data.slug },
      create: {
        ...data,
        categoryId: createdCategories[categorySlug],
        images: {
          create: [
            {
              url: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80`,
              alt: data.name,
              isPrimary: true,
              sortOrder: 0,
            },
          ],
        },
      },
      update: {},
    });
    console.log(`✓ Product: ${data.name}`);
  }

  // Sample coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    create: {
      code: "WELCOME10",
      description: "10% off your first order",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderAmount: 200000,
      maxUses: 1000,
      isActive: true,
    },
    update: {},
  });
  console.log("✓ Coupon: WELCOME10 (10% off)");

  console.log("\n✅ Seed complete!");
  console.log("Admin login: admin@elan-jewelry.com / admin123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
