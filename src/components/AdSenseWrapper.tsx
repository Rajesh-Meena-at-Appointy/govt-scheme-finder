"use client";

import { usePathname } from "next/navigation";
import AdSense from "./AdSense";

const NO_ADS_PATHS = ["/privacy-policy", "/terms", "/about", "/contact"];

export default function AdSenseWrapper() {
  const pathname = usePathname();

  // Don't show ads on policy pages
  if (NO_ADS_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  return <AdSense />;
}
