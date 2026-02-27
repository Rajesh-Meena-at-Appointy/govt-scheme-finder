"use client";

import { useEffect } from "react";

export default function AdSense() {
  const pubId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUB_ID;

  useEffect(() => {
    // Load AdSense script
    if (pubId && pubId !== "ca-pub-xxxxxxxxxxxxxxxx") {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        document.head.removeChild(script);
      };
    }
  }, [pubId]);

  // Don't render ad slot if no valid pub ID
  if (!pubId || pubId === "ca-pub-xxxxxxxxxxxxxxxx") {
    return null;
  }

  return (
    <div className="my-8">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={pubId}
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Component for inline ads (between results)
export function AdSenseInline() {
  const pubId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUB_ID;

  useEffect(() => {
    if (pubId && pubId !== "ca-pub-xxxxxxxxxxxxxxxx") {
      try {
        // @ts-ignore
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [pubId]);

  if (!pubId || pubId === "ca-pub-xxxxxxxxxxxxxxxx") {
    return null;
  }

  return (
    <div className="my-6">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={pubId}
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
    </div>
  );
}
