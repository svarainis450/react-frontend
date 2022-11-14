import { FC, memo, useCallback, useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { theme } from "../../theme";
import { images } from "../../utils/images";
import { Box } from "../wrappers/Box";
import { Flex } from "../wrappers/Flex";
import { useMediaQuery } from "../../hooks";
import { Button } from "../Global/Button";
import { icons } from "../../utils/icons";
import { UserContext } from "../../state/userContext";
import { useCookies } from "react-cookie";

interface DownsellProps {
  onClose?: () => void;
}

export const Downsell: FC<DownsellProps> = memo(({ onClose }) => {
  const { isMobile, isTablet } = useMediaQuery();
  const { user, setUser } = useContext(UserContext);
  const myRef = useRef<null | HTMLDivElement>(null);
  const price = user.selectedPlan?.final_price || 0;
  const newPrice = parseFloat(parseFloat(String(price * 0.85)).toFixed(2));
  const [getCookie] = useCookies(["currency", "currencySymbol"]);

  const handleDownsellSelection = useCallback(() => {
    setUser((prev) => ({ ...prev, hasDownsell: true }));

    if (onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPrice, onClose]);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <ModalWrapper>
        <Close src={icons.closeX} alt="Close" onClick={onClose} />
        <Background
          alignItems="center"
          justifyContent="center"
          flexDirection={isTablet ? "column-reverse" : "row"}
          ref={myRef}
        >
          <HeroImg src={images.manWithRocket} alt="Man With Rocket" />
          <ContentWrapper>
            <Title margin={isMobile ? "0 0 0.5rem 0" : "0 0 2.5rem 0"}>
              Wait! Claim your 15% discount on membership!
            </Title>
            <Subtitle margin={isMobile ? "0 0 1rem" : "0 0 2rem 0"}>
              Get your membership for:
            </Subtitle>
            <Flex
              alignItems="baseline"
              justifyContent="center"
              margin={isMobile ? "0 0 0.625rem 0" : "0 0 2rem 0"}
            >
              <Price margin="0 0.5rem 0 0">
                {newPrice}
                {getCookie.currencySymbol}
              </Price>
              <OldPrice>
                {user.selectedPlan?.final_price}
                {getCookie.currencySymbol}
              </OldPrice>
            </Flex>
            <Small margin="0 0 1.5rem 0">
              One-time, limited discount. Don't miss it!
            </Small>
            <Button onClick={handleDownsellSelection}>Get 15% Now!</Button>
            <Small
              margin="0 0 1.5rem 0"
              style={{ cursor: "pointer" }}
              onClick={onClose}
            >
              No, thank you
            </Small>
          </ContentWrapper>
        </Background>
      </ModalWrapper>
      <Overlay onClick={onClose} />
    </>
  );
});

Downsell.displayName = "Downsell";

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding: 0 5rem;
  max-height: 100vh;
  z-index: 9999;
  overflow: auto;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    padding: 0 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}px) {
    padding: 2rem 4%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const Background = styled(Flex)`
  padding: 2rem 4%;
  background: ${theme.colors.heroYellow};

  button.Button {
    width: 100%;
    max-width: none;
    margin-bottom: 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}px) {
    padding: 3rem 4% 1rem 4%;
  }
`;

const ContentWrapper = styled.div`
  max-width: 24rem;
  margin-left: 5rem;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    margin: 0;
  }
`;

const HeroImg = styled.img`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    width: 90%;
  }

  @media (max-width: ${theme.breakpoints.mobile}px) {
    width: 70%;
  }
`;

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: "p" })`
  font-size: 1.875rem;
  font-weight: 500;
  text-align: center;
`;

// @TODO: move to Typography component
const Subtitle = styled(Box).attrs({ as: "p" })`
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
`;

// @TODO: move to Typography component
const Price = styled(Box).attrs({ as: "p" })`
  font-size: 3.75rem;
  font-weight: 900;
`;

// @TODO: move to Typography component
const OldPrice = styled(Box).attrs({ as: "p" })`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.orange};
  text-decoration: line-through;
`;

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: "p" })`
  font-size: 0.875rem;
  text-align: center;
`;

const Close = styled.img`
  position: absolute;
  height: 1.5rem;
  top: 4rem;
  left: 10%;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    top: 2.5rem;
    left: 1.5rem;
  }
`;
