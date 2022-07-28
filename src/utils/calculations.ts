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
