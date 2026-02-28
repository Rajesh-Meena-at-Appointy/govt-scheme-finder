"use client";

import { useEffect, useRef } from "react";

const PUB_ID = "ca-pub-9419529406465609";

function AdUnit({ slot, format = "auto", layout }: { slot: string; format?: string; layout?: string }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (ref.current && (window as any).adsbygoogle) {
        try {
          (window as any).adsbygoogle.push(ref.current);
        } catch (e) {
          console.error("AdSense error:", e);
        }
        clearInterval(timer);
      }
    }, 100);

    // Stop trying after 5 seconds
    setTimeout(() => clearInterval(timer), 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={PUB_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layout ? { "data-ad-layout": layout } : {})}
    />
  );
}

export default function AdSense() {
  return <AdUnit slot="2927234096" />;
}

export function AdSenseBanner() {
  return <AdUnit slot="5384538194" format="horizontal" />;
}

export function AdSenseInline() {
  return <AdUnit slot="1431300395" format="rectangle" />;
}

export function AdSenseFooter() {
  return <AdUnit slot="2492150593" />;
}

export function AdSenseSkyscraper() {
  return <AdUnit slot="1234567890" format="vertical" layout="display" />;
}
