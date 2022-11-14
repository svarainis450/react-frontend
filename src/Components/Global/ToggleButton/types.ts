export interface ToggleButtonProps {
  className?: string;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  labelClassName?: string;
  label?: string;
}
