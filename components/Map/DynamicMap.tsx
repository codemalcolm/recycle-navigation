"use client"
import dynamic from "next/dynamic";

// needed for to bypass nextjs window error
export const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
});