import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from './icons';

export const calculateBigNumberValues = (foll: number) => {
  if (foll > 0 && foll < 1000) {
    return foll;
  } else if (foll >= 1000 && foll <= 1000000) {
    const result = (foll / 1000).toFixed();
    return String(result + 'k');
  } else if (foll > 1000000) {
    const result = (foll / 1000000).toFixed();
    return String(result + 'mln');
  }
};

//NOTE: axis width for positive, negative, bull
export const calculateRangeWidth = (rate: number, isHalfAxis?: boolean) => {
  if (isHalfAxis) {
    if (rate === 0 || !rate) {
      return 100;
    } else if (rate <= 10) {
      return 90;
    } else if (rate <= 20) {
      return 70;
    } else if (rate <= 30) {
      return 40;
    } else if (rate <= 40) {
      return 30;
    } else if (rate < 50) {
      return 25;
    } else if (rate === 50) {
      return 0;
    } else if (rate <= 60) {
      return 25;
    } else if (rate <= 70) {
      return 40;
    } else if (rate <= 80) {
      return 60;
    } else if (rate <= 90) {
      return 80;
    } else if (rate <= 100) {
      return 100;
    }
  } else {
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
  }
};

//Influencers picks tables calcs
export const generateProjectsText = (projectsList?: Partial<Project>[]) => {
  if (projectsList?.length === 1) {
    return projectsList[0].name;
  } else if (projectsList && projectsList.length > 1) {
    return 'Multiple';
  } else {
    return 'None';
  }
};

//Date format yyyy-mm-dd
export const formatDate = (date: string) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export function isImgUrl(url: string) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(icons.no_image);
    img.onload = () => resolve(url);
  });
}
