"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useUploadGate } from "@/components/admin/UploadGate";

interface UploadedImage {
  url: string;
  publicId: string;
  preview: string;
  isPrimary: boolean;
}

interface Props {
  maxImages?: number;
  existingCount?: number;
  /**
   * Submit the enclosing <form> automatically once a batch of uploads
   * finishes, instead of requiring a separate manual "save" click. Use this
   * when ImageUploader is the only thing in its form (e.g. "add photos to
   * an existing product") — never on a form that also has other required
   * fields still being filled in (e.g. the "new product" form), since that
   * would submit those fields prematurely.
   */
  autoSubmit?: boolean;
}

export function ImageUploader({ maxImages = 4, existingCount = 0, autoSubmit = false }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasUploading = useRef(false);
  const { uploading, setUploading, setImageCount } = useUploadGate();

  useEffect(() => {
    setImageCount(images.length);
  }, [images.length, setImageCount]);

  // Fires once per finished batch (uploading: true -> false), after React
  // has committed the hidden imageUrls/imagePublicIds inputs for every
  // image in that batch — so requestSubmit always sees the full set.
  useEffect(() => {
    if (autoSubmit && wasUploading.current && !uploading && images.length > 0) {
      inputRef.current?.form?.requestSubmit();
    }
    wasUploading.current = uploading;
  }, [uploading, autoSubmit, images.length]);

  const slots = maxImages - existingCount;
  const canAdd = images.length < slots && !uploading;

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, slots - images.length);
    e.target.value = "";
    if (!files.length) return;

    setUploading(true);
    setError(null);

    try {
      for (const file of files) {
        const preview = URL.createObjectURL(file);
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Upload failed");

        setImages((prev) => [
          ...prev,
          { url: data.url, publicId: data.publicId, preview, isPrimary: prev.length === 0 && existingCount === 0 },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function remove(i: number) {
    setImages((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      // ensure first image is primary if none are
      if (next.length > 0 && !next.some((img) => img.isPrimary)) {
        next[0].isPrimary = true;
      }
      return next;
    });
  }

  function setPrimary(i: number) {
    setImages((prev) => prev.map((img, idx) => ({ ...img, isPrimary: idx === i })));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group">
            <input type="hidden" name="imageUrls" value={img.url} />
            <input type="hidden" name="imagePublicIds" value={img.publicId} />
            <input type="hidden" name="imagePrimary" value={img.isPrimary ? "true" : "false"} />

            <div className={`relative w-24 h-24 bg-[#F7F5F2] border-2 transition-colors ${img.isPrimary ? "border-[#85A0B5]" : "border-transparent"}`}>
              <Image src={img.preview} alt="" fill className="object-cover" />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className="bg-[#85A0B5] text-black font-sans text-[10px] tracking-wider uppercase px-1.5 py-0.5"
                  >
                    Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="bg-red-900/80 text-white w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {img.isPrimary && (
                <span className="absolute bottom-0 left-0 right-0 bg-[#85A0B5]/90 text-black font-sans text-[10px] tracking-wider uppercase text-center py-0.5">
                  Primary
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Add slot */}
        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-24 h-24 border border-dashed border-[#E4E1DA] hover:border-[#85A0B5] flex flex-col items-center justify-center gap-1.5 text-[#9A9A9A] hover:text-[#3A5A78] transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase">Add Photo</span>
          </button>
        )}

        {/* Loading slot */}
        {uploading && (
          <div className="w-24 h-24 border border-dashed border-[#E4E1DA] flex items-center justify-center text-[#9A9A9A]">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {error && <p className="font-sans text-xs text-red-400">{error}</p>}

      <p className="font-sans text-[12px] text-[#9A9A9A]">
        {images.length + existingCount} / {maxImages} photos · Click an image to set as primary
      </p>
    </div>
  );
}
