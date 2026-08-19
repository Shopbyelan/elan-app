import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    // Old product slugs from before the accent-stripping bug in slugify() was fixed
    // and before a batch of products were given placeholder slugs on entry.
    const oldToNewProductSlugs: Record<string, string> = {
      "ternit-full-eternity-ban": "eternite-full-eternity-band",
      "lumi-re-crystal-tennis-bracelet": "lumiere-crystal-tennis-bracelet",
      "croix-pav-cross-necklace": "croix-pave-cross-necklace",
      "z-nith-chevron-bar-necklace": "zenith-chevron-bar-necklace",
      "lumi-re-triple-row-pav-huggie-hoops": "lumiere-triple-row-pave-huggie-hoops",
      "gold-ring-set": "cercle-tresse-jewellery-set",
      "toile-cluster-pendant-necklace": "etoile-cluster-pendant-necklace",
      "trinit-charm-station-necklace": "trinite-charm-station-necklace",
      "clat-pav-huggie-earrings": "eclat-pave-huggie-earrings",
      "diamant-g-o-station-bracelet": "diamant-geo-station-bracelet",
      "gold-d": "marquise-est-ouest-solitaire-ring",
      "rose-gold-set": "filigrane-cushion-jewellery-set",
      "tress-pav-ring": "tresse-pave-ring",
      "orbe-pav-sphere-necklace": "orbe-pave-sphere-necklace",
      "forsty-set": "etoile-de-neige-jewellery-set",
      "double-ring": "lumiere-flottante-bridal-set",
      "big-gold-ring": "ovale-trillion-three-stone-ring",
      "clat-stud-collection": "eclat-stud-collection",
      "pav-ternit-wide-band-ring": "pave-eternite-wide-band-ring",
      "cascade-tennis-drop-earrings": "cascade-tennis-bracelet",
      "platinum-ring": "toi-et-moi-pear-solitaire-ring",
      "aur-ole-halo-jewellery-set": "aureole-halo-jewellery-set",
    };

    return [
      { source: "/", destination: "/home", permanent: true },
      ...Object.entries(oldToNewProductSlugs).map(([oldSlug, newSlug]) => ({
        source: `/product/${oldSlug}`,
        destination: `/product/${newSlug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
