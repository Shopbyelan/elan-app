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
        <div className="w-28 h-px bg-[#F7F5F2] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#85A0B5] to-transparent animate-[shimmer-bar_1.6s_ease-in-out_infinite]" />
        </div>

        {/* <span className="font-sans text-[11px] tracking-[0.4em] text-[#9A9A9A] uppercase">
          Loading
        </span> */}
      </div>
    </div>
  );
}
