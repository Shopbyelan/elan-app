"use client";

import { createContext, useContext, useState } from "react";

interface UploadGateValue {
  uploading: boolean;
  setUploading: (v: boolean) => void;
  imageCount: number;
  setImageCount: (n: number) => void;
}

const UploadGateContext = createContext<UploadGateValue | null>(null);

/**
 * Shared client-side state between an ImageUploader and whatever submit
 * button sits elsewhere in the same <form> (possibly authored in a parent
 * Server Component). Without this, a form can be submitted mid-upload —
 * the hidden imageUrls/imagePublicIds inputs for in-flight files don't
 * exist yet, so they silently never reach the server action.
 */
export function UploadGateProvider({ children }: { children: React.ReactNode }) {
  const [uploading, setUploading] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  return (
    <UploadGateContext.Provider value={{ uploading, setUploading, imageCount, setImageCount }}>
      {children}
    </UploadGateContext.Provider>
  );
}

export function useUploadGate() {
  const ctx = useContext(UploadGateContext);
  if (!ctx) throw new Error("useUploadGate must be used within an UploadGateProvider");
  return ctx;
}
