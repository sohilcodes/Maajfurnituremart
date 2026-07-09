"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/actions/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname, document.referrer);
  }, [pathname]);

  return null;
}
