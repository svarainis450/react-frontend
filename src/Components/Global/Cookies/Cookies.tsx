import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { ENUM_COOKIE_VALUES } from "src/Common/cookies";

import './Cookies.scss';

export const Cookies = () => {
  const [showCookeBar, setShowCookieBar] = useState(false);

  useEffect(() => {
    const cookieConsentMissing = Cookie.get(ENUM_COOKIE_VALUES.cookie_consent) === undefined
    console.log(cookieConsentMissing)

    if (cookieConsentMissing) {
      setShowCookieBar(true)
    }
  
    return () => {
      setShowCookieBar(false)
    }
  }, [])
  

  const handleClickAll = () => {
    Cookie.set(ENUM_COOKIE_VALUES.cookie_consent, 'true');
    setShowCookieBar(false)
  }

  const handleReject = () => {
    Cookie.set(ENUM_COOKIE_VALUES.cookie_consent, 'false');
    setShowCookieBar(false)
  }

  if (!showCookeBar) return <></>

  return(
    <div className="Cookies">
      <div className="Cookies__description">
        This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.
      </div>

      <div className="Cookies__action">
        <button className="Cookies__all" onClick={handleClickAll}>Accept All</button>
        <button className="Cookies__necessary" onClick={handleClickAll}>Accept Necessary</button>
        <button className="Cookies__reject" onClick={handleReject}>Reject</button>
      </div>
    </div>
  )
}