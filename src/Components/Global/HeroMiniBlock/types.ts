import React from "react"

export interface HeroMiniBlockProps {
  children: React.ReactNode;
  ctaText: string;
  ctaLink: string;
  img?: string;
  color?: string;
  className?: string;
}