import { scroller } from 'react-scroll';

export const scrollToElement = (elementName: string) => {
  scroller.scrollTo(elementName, {
    spy: true,
    smooth: true,
    duration: 800,
    offset: -60,
  });
};
