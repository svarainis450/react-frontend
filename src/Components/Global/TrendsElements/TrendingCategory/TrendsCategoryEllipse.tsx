import { theme } from 'src/theme';
import { CategoryTags } from '../types';

interface EllipseProps {
  categoryType?: CategoryTags;
}

const categoryCircleValues = {
  [CategoryTags.coins]: {
    cx: '15',
    cy: '63',
    fill: theme.colors.electric,
  },
  [CategoryTags.nft]: {
    cx: '61',
    cy: '17',
    fill: theme.colors.potatoGreen,
  },
  [CategoryTags.dao]: {
    cx: '125',
    cy: '11',
    fill: theme.colors.sand,
  },
  [CategoryTags.meta]: {
    cx: '168',
    cy: '32',
    fill: theme.colors.purple,
  },
  [CategoryTags.defi]: {
    cx: '193',
    cy: '75',
    fill: theme.colors.potatoBlue,
  },
};

export const TrendsCategoryEllipse: React.FC<EllipseProps> = ({
  categoryType = CategoryTags.coins,
}) => {
  const circle = categoryCircleValues[categoryType];

  return (
    <svg
      width="204"
      height="204"
      viewBox="0 0 204 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.1 104C2.28335 104 -0.0133014 101.715 0.127471 98.9021C0.710609 87.2489 3.28962 75.7691 7.76429 64.9663C12.8903 52.5911 20.4035 41.3467 29.8751 31.8751C39.3467 22.4035 50.5911 14.8903 62.9663 9.76428C75.3415 4.6383 88.6052 2 102 2C115.395 2 128.659 4.63831 141.034 9.76429C153.409 14.8903 164.653 22.4035 174.125 31.8751C183.596 41.3467 191.11 52.5911 196.236 64.9663C200.71 75.7691 203.289 87.249 203.873 98.9021C204.013 101.715 201.717 104 198.9 104C196.083 104 193.815 101.715 193.658 98.9025C193.085 88.5896 190.774 78.4348 186.812 68.8697C182.199 57.732 175.437 47.612 166.912 39.0876C158.388 30.5632 148.268 23.8013 137.13 19.1879C125.993 14.5745 114.055 12.2 102 12.2C89.9447 12.2 78.0074 14.5745 66.8697 19.1879C55.732 23.8012 45.612 30.5632 37.0876 39.0876C28.5632 47.612 21.8012 57.732 17.1879 68.8697C13.2259 78.4348 10.9152 88.5896 10.3416 98.9025C10.1852 101.715 7.91666 104 5.1 104Z"
        fill="#2B59D1"
      />
      <path
        d="M5.1 104C2.28335 104 -0.0133001 101.715 0.127442 98.9017C1.16027 78.2575 8.44608 58.3685 21.078 41.9063C34.7469 24.0926 53.9119 11.287 75.6005 5.47557C97.289 -0.335876 120.289 1.17163 141.034 9.76428C160.204 17.705 176.459 31.2865 187.675 48.6484C189.203 51.0143 188.357 54.1417 185.918 55.55C183.479 56.9583 180.371 56.1133 178.83 53.756C168.745 38.3348 154.226 26.2692 137.13 19.1879C118.46 11.4545 97.7601 10.0977 78.2404 15.328C58.7207 20.5583 41.4722 32.0834 29.1702 48.1157C17.9054 62.7963 11.3645 80.5048 10.3416 98.9022C10.1852 101.715 7.91666 104 5.1 104Z"
        fill="#D12BCA"
      />
      <path
        d="M5.1 104C2.28335 104 -0.0133037 101.715 0.127458 98.902C0.934728 82.7687 5.56438 67.0314 13.6654 53C22.6178 37.494 35.494 24.6178 51 15.6654C66.506 6.71304 84.0953 2 102 2C118.202 2 134.146 5.85927 148.521 13.2268C151.028 14.5115 151.858 17.6428 150.45 20.0821C149.042 22.5214 145.928 23.3434 143.415 22.0727C130.595 15.5926 116.411 12.2 102 12.2C85.8857 12.2 70.0554 16.4417 56.1 24.4989C42.1446 32.556 30.556 44.1446 22.4989 58.1C15.2932 70.5805 11.1392 84.5607 10.3416 98.9024C10.1852 101.715 7.91666 104 5.1 104Z"
        fill="#F0EBE6"
      />
      <path
        d="M5.1 104C2.28335 104 -0.0133123 101.715 0.127358 98.9019C1.38727 73.7061 11.9515 49.7987 29.8751 31.8751C47.7988 13.9515 71.7061 3.38727 96.9019 2.12736C99.7151 1.98669 102 4.28335 102 7.1C102 9.91666 99.7144 12.1852 96.9021 12.3415C74.4133 13.5914 53.098 23.0772 37.0876 39.0876C21.0772 55.098 11.5914 76.4133 10.3415 98.902C10.1852 101.714 7.91666 104 5.1 104Z"
        fill="#2BD130"
      />
      <path
        d="M5.1 104C2.28335 104 -0.013309 101.715 0.127376 98.9018C1.26948 76.0643 10.0569 54.2656 25.0727 37.0208C26.9224 34.8965 30.1617 34.8432 32.1909 36.7966C34.2201 38.75 34.2692 41.97 32.4314 44.1045C19.2319 59.4346 11.4643 78.7035 10.3415 98.902C10.1852 101.714 7.91666 104 5.1 104Z"
        fill="#2BC7D1"
      />
      <circle cx={circle.cx} cy={circle.cy} r="11" fill={circle.fill} />
      <circle cx={circle.cx} cy={circle.cy} r="6" fill="#FEFEFE" />
    </svg>
  );
};
