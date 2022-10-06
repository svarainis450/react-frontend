export interface PaymentOptionsProps {
  className?: string;
  currentOption: string;
  minimal?: boolean;
  setCurrentPricingOption: (value: string) => void;

  isSelected: number;
  isSelectedHandler: (value: number) => void;
  navigateHandler?: (value: boolean) => void;
}
