import { BaseHTMLAttributes, FC, ReactNode } from "react";
import { theme } from "src/theme";
import styled from "styled-components";

import circle from "src/Assets/icons/circle.svg";
import circle_checked from "src/Assets/icons/circle_checked.svg";
import { Flex } from "src/Components";

interface OptionCardProps extends BaseHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isSelected?: boolean;
  isSelectable?: boolean;
  imgSrc?: string;
}

export const OptionCard: FC<OptionCardProps> = ({
  children,
  imgSrc,
  ...restProps
}) => {
  return (
    <Wrapper {...restProps} alignItems="center">
      {imgSrc && <Img src={imgSrc} />}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)<{ isSelected?: boolean; isSelectable?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.875rem;
  margin-bottom: 1rem;
  background: ${theme.colors.white};
  border: 1px solid #fff;
  border-radius: 0.3125rem;
  cursor: pointer;

  ${({ isSelected, isSelectable }) =>
    isSelectable &&
    `
    &::before {
       content: '';
       background: url(${isSelected ? circle_checked : circle});
       background-repeat: no-repeat;
       margin-right: 1rem;
       height: 21px;
       width: 21px;
       background-size: contain;
     }

    ${
      isSelected &&
      `border: 1px solid #0022ff;
        background: rgba(0, 34, 255, 0.1);`
    }
  `}
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0.75rem;
`;
