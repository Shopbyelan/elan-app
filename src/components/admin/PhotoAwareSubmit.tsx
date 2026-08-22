"use client";

import { Button } from "@/components/ui/button";
import { useUploadGate } from "@/components/admin/UploadGate";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Button> {
  /** Also disable when no images have finished uploading yet. */
  requireImages?: boolean;
}

/**
 * A submit button that stays disabled while ImageUploader (elsewhere in the
 * same UploadGateProvider) has an upload in flight, so the form can't be
 * submitted before the hidden image inputs exist.
 */
export function PhotoAwareSubmit({ requireImages, disabled, ...props }: Props) {
  const { uploading, imageCount } = useUploadGate();
  return (
    <Button
      type="submit"
      disabled={disabled || uploading || (requireImages && imageCount === 0)}
      {...props}
    />
  );
}
