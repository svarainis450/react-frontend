import { FC, memo } from 'react';
import styled from 'styled-components';

import { theme } from '../../theme';
import { images } from '../../utils/images';
import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';

export const OurPromise: FC = () => {
  return (
    <Background alignItems="center" padding="2rem 6rem">
      <div>
        <Title margin="0 0 1.5rem 0">
          Potato Pro is amazing, but don’t just take our word for it.
        </Title>
        <Description margin="0 0 1rem 0">
          “This tool helps me a lot to understand how NFT and Crypto market
          works. I follow interesting projects to get a sense of what makes them
          grow. Great tool for curious!”
        </Description>
        <Flex alignItems="center">
          <Avatar src={images.lena_testimonial} alt="Avatar" />
          <Box margin="0 0 0 0.75rem">
            <SmallText fontWeight={400}>Lina | DCL Wearables Daily</SmallText>
            <SmallText fontWeight={300}>@lenalisabona</SmallText>
          </Box>
        </Flex>
      </div>
    </Background>
  );
};

OurPromise.displayName = 'OurPromise';

const Background = styled(Flex)`
  background: ${theme.colors.heroYellow};
`;

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: 'h1' })`
  font-size: 1.875rem;
`;

// @TODO: move to Typography component
const SmallText = styled.p<{ fontWeight?: number }>`
  font-size: 0.875rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;

// @TODO: move to Typography component
const Description = styled(Box).attrs({ as: 'p' })`
  font-size: 0.875rem;
  line-height: 1.5rem;
`;

const Avatar = styled.img`
  height: 3.125rem;
  width: 3.125rem;
  border-radius: 50%;
`;
