import { FC, memo } from 'react';
import styled from 'styled-components';

import { theme } from '../../theme';
import { images } from '../../utils/images';
import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';

export const OurPromise: FC = memo(() => {
  return (
    <Background alignItems="center" padding="2rem 6rem">
      <div>
        <Title margin="0 0 1.5rem 0">
          Potato Pro is amazing, but don’t just take our word for it.
        </Title>
        <Description margin="0 0 1rem 0">
          “I recently started investing in NFTs, and I’ve had a steady
          understanding of the industry, all thanks to Potato. Best investment
          I’ve made was becoming Pro.”
        </Description>
        <Flex alignItems="center">
          <Avatar src={images.avatar} alt="Avatar" />
          <Box margin="0 0 0 0.75rem">
            <SmallText fontWeight={400}>Calvin Harley</SmallText>
            <SmallText fontWeight={300}>NFT enthusiast</SmallText>
          </Box>
        </Flex>
      </div>
    </Background>
  );
});

OurPromise.displayName = 'OurPromise';

const Background = styled(Flex)`
  background: ${theme.colors.green};
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
