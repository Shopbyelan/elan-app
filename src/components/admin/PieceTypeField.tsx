"use client";

import { useState } from "react";
import { RING_SIZES } from "@/lib/ring-sizes";

interface PieceTypeFieldProps {
  defaultType?: string;
  /** US sizes already offered; empty means every size. */
  defaultSizes?: string[];
}

export function PieceTypeField({ defaultType = "", defaultSizes = [] }: PieceTypeFieldProps) {
  const [type, setType] = useState(defaultType);
  const [sizes, setSizes] = useState<string[]>(
    defaultSizes.length > 0 ? defaultSizes : RING_SIZES.map((s) => s.us)
  );

  function toggle(us: string) {
    setSizes((prev) => (prev.includes(us) ? prev.filter((s) => s !== us) : [...prev, us]));
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Piece Type</label>
        <select
          name="productType"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors appearance-none"
        >
          <option value="">— None —</option>
          <option value="necklace">Necklace</option>
          <option value="earrings">Earrings</option>
          <option value="ring">Ring</option>
          <option value="bracelet">Bracelet</option>
          <option value="jewelry-set">Jewelry Set</option>
        </select>
        <p className="font-sans text-[12px] text-[#9A9A9A] mt-1.5">Used for the Necklaces / Earrings / Rings / Bracelets / Jewelry Set collections</p>
      </div>

      {type === "ring" && (
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase">Available Ring Sizes</label>
            <div className="flex gap-4 font-sans text-[12px] text-[#3A5A78]">
              <button type="button" onClick={() => setSizes(RING_SIZES.map((s) => s.us))} className="underline underline-offset-4">All</button>
              <button type="button" onClick={() => setSizes([])} className="underline underline-offset-4">None</button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {RING_SIZES.map((size) => {
              const checked = sizes.includes(size.us);
              return (
                <label
                  key={size.us}
                  className={`flex flex-col items-center justify-center py-2 border cursor-pointer transition-colors ${
                    checked ? "border-[#3A5A78] bg-[#3A5A78] text-white" : "border-[#E4E1DA] text-[#3A3A3A] hover:border-[#85A0B5]"
                  }`}
                >
                  <input type="checkbox" name="ringSizes" value={size.us} checked={checked} onChange={() => toggle(size.us)} className="sr-only" />
                  <span className="font-sans text-sm leading-none">US {size.us}</span>
                  <span className={`font-sans text-[10px] mt-1 leading-none ${checked ? "text-white/70" : "text-[#9A9A9A]"}`}>UK {size.uk}</span>
                </label>
              );
            })}
          </div>
          <p className={`font-sans text-[12px] mt-1.5 ${sizes.length === 0 ? "text-[#8A3B1F]" : "text-[#9A9A9A]"}`}>
            {sizes.length === 0
              ? "No sizes ticked — customers will be offered every size on the chart."
              : `Customers can choose from the ${sizes.length} size${sizes.length === 1 ? "" : "s"} ticked here.`}
          </p>
        </div>
      )}
    </div>
  );
}
