const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE = "https://api.paystack.co";

interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

interface InitializeData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface VerifyData {
  status: string;
  reference: string;
  amount: number;
  paid_at: string;
  gateway_response: string;
  customer: { email: string };
}

async function paystackFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PaystackResponse<T>> {
  const res = await fetch(`${PAYSTACK_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res.json();
}

export async function initializePayment(data: {
  email: string;
  amount: number; // in kobo (multiply NGN by 100)
  reference: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
}) {
  return paystackFetch<InitializeData>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyPayment(reference: string) {
  return paystackFetch<VerifyData>(`/transaction/verify/${reference}`);
}

export function amountToKobo(naira: number): number {
  return Math.round(naira * 100);
}

export function koboToNaira(kobo: number): number {
  return kobo / 100;
}
