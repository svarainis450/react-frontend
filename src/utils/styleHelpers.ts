import { theme } from 'src/theme';

export const pathColorHandler = (rateVal: number) => {
  if (rateVal < 50) {
    return theme.colors.red;
  } else {
    return theme.colors.potatoGreen;
  }
};
