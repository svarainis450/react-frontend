export const calculateFollowers = (foll: number) => {
  if (foll > 0 && foll < 1000) {
    return foll;
  } else if (foll >= 1000 && foll <= 1000000) {
    const result = (foll / 1000).toFixed();
    return String(result + ' k');
  } else if (foll > 1000000) {
    const result = (foll / 1000000).toFixed();
    return String(result + ' mln');
  }
};

//NOTE: axis width for positive, negative, bull
export const calculateRangeWidth = (rate: number) => {
  if (rate === 0) {
    return 100;
  } else if (rate <= 10) {
    return 70;
  } else if (rate <= 20) {
    return 40;
  } else if (rate <= 30) {
    return 30;
  } else if (rate <= 40) {
    return 10;
  } else if (rate < 50) {
    return 10;
  } else if (rate === 50) {
    return 0;
  } else if (rate <= 60) {
    return 10;
  } else if (rate <= 70) {
    return 30;
  } else if (rate <= 80) {
    return 40;
  } else if (rate <= 90) {
    return 65;
  } else if (rate <= 100) {
    return 100;
  }
};
