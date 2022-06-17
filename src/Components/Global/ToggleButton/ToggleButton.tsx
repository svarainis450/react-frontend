import classNames from "classnames";
import { ToggleButtonProps } from "./types";
import "./ToggleButton.scss";

export const ToggleButton = ({
  className,
  labelClassName,
  isChecked,
  onChange,
  isDisabled,
  label,
}: ToggleButtonProps) => {
  return (
    <label className={classNames("ToggleButton", className)}>
      <span className="ToggleButton__switch">
        <input
          className="ToggleButton__input"
          type="checkbox"
          onChange={onChange}
          disabled={isDisabled}
          checked={isChecked}
        />

        <span className="ToggleButton__slider"></span>
      </span>
      {label && (
        <p
          className={classNames("ToggleButton__label", labelClassName)}
        >
          {label}
        </p>
      )}
    </label>
  );
};
