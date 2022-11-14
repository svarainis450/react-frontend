export interface QuoteProps {
  quoteList: Array<{
    name: string,
    text: string
  }>;
  className?: string;
}