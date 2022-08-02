import classNames from "classnames";
import React from "react";

import "./TwoSideSimple.scss";

export interface TwoSideSimpleProps {
  children: React.ReactNode;
  className?: string;
  rtl?: boolean;
}

export const TwoSideSimple = ({children, className, rtl} : TwoSideSimpleProps) => {
  return (
    <div className={classNames("TwoSideSimple", {"TwoSideSimple--rtl":rtl}, className)}>
      {children}
    </div>
  )
}

const Left = ({children, className} : {children : React.ReactNode, className?:string}) => <div className={classNames("TwoSideSimple__left", className)}>{children}</div>
const Right = ({children, className} : {children : React.ReactNode, className?:string}) => <div className={classNames("TwoSideSimple__right", className)}>{children}</div>

TwoSideSimple.Left = Left;
TwoSideSimple.Right = Right;