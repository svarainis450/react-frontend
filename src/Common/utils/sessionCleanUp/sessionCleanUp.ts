import Cookies from "js-cookie";

import { ENUM_COOKIE_VALUES } from "src/Common/cookies";

export const sessionCleanUp = () => {
  Cookies.remove(ENUM_COOKIE_VALUES.token);
};
