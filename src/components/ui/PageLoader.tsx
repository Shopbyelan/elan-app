import Image from "next/image";

export function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* ÉLAN badge */}
        <div className="bg-[#85A0B5] px-10 py-6 animate-pulse">
          <Image src="/ElanLogoblack.png" alt="Élan Fine Jewellery" width={140} height={56} className="h-10 w-auto" />
        </div>

        {/* Animated loading bar */}
        <div className="w-28 h-px bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#85A0B5] to-transparent animate-[shimmer-bar_1.6s_ease-in-out_infinite]" />
        </div>

        <span className="font-sans text-[9px] tracking-[0.4em] text-[#3A3A3A] uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
