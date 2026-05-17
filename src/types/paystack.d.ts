declare module "@paystack/inline-js" {
  interface PaystackMetadataField {
    display_name: string;
    variable_name: string;
    value: string;
  }

  interface PaystackSetupOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref?: string;
    reference?: string;
    metadata?: {
      orderId?: string;
      orderNumber?: string;
      custom_fields?: PaystackMetadataField[];
      [key: string]: unknown;
    };
    callback_url?: string;
    callback: (response: { reference: string; status: string }) => void;
    onClose: () => void;
  }

  interface PaystackHandler {
    openIframe(): void;
  }

  interface PaystackPop {
    setup(options: PaystackSetupOptions): PaystackHandler;
  }

  const PaystackPop: PaystackPop;
  export default PaystackPop;
}
