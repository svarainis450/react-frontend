import { FC, ReactNode } from "react";
import Logo from "src/Assets/images/logo.svg";
import { Container } from "src/Components/wrappers/Container";
import { Flex } from "src/Components/wrappers/Flex";
import { useMediaQuery } from "src/hooks";

export const HeaderWithImage: FC<{ children: ReactNode }> = ({ children }) => {
  const { isMobile } = useMediaQuery();
  return (
    <Container isPage>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={isMobile ? "0.75rem 0" : "1.5rem 0"}
      >
        <img src={Logo} alt="" />
        {children}
      </Flex>
    </Container>
  );
};
