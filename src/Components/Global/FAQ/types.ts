import { ReactNode } from "react";

export interface FAQprops {
  faqItems: Array<{
    title: string,
    text: string | ReactNode | (() => void),
  }>
  noTitle?: boolean;
  noCta?: boolean;
  className?: string;
}