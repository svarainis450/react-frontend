import { Link } from "react-router-dom";
import { Typography, TypographyWeight, TypographyVariant } from "../Typography";
import { pageListLarge, pageListMobile, socialList } from "./constants";

import logo from "../../../Assets/images/logoTM.svg";

import "./Footer.scss";

export const Footer = () => {
  const generatePaymentBlocks = () => {
    return (
      <ul className="Footer__payments">
        {/* {paymentList.map((item, index) => {
        return <li className="Footer__payments-item" key={index}>
          <Link to={item.url}>
            <img src={item.img} alt={item.type} />
          </Link>
        </li>
      })} */}
      </ul>
    );
  };

  return (
    <div className="Footer">
      <div className="Footer__left">
        <img className="Footer__logo" src={logo} alt={logo} />

        <Typography
          className="Footer__description"
          variant={TypographyVariant.TEXT_SMALL}
        >
          Potato is intended for informational and educational purposes only. We
          do not provide financial or investment advice or recommend purchasing
          any assets displayed on Potato.
        </Typography>

        <Typography
          className="Footer__copyright desktop"
          variant={TypographyVariant.TEXT_SMALL}
        >
          © 2022 Potato.to – crypto, NFT & web3 insight aggregator | All Rights
          Reserved
        </Typography>
      </div>

      <div className="Footer__right">
        <div className="mobile">
          <ul className="Footer__social">
            {socialList.map((item, index) => {
              return (
                <li className="Footer__social-item" key={index}>
                  <a href={item.url} target="_blank">
                    <img src={item.img} alt={item.title} />
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="Footer__menu">
            {pageListMobile.map((item, index) => {
              return (
                <li className="Footer__menu-item" key={index}>
                  <Link to={item.url}>
                    <Typography variant={TypographyVariant.TEXT_SMALL}>
                      {item.title}
                    </Typography>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Typography
            className="Footer__copyright mobile"
            variant={TypographyVariant.TEXT_SMALL}
          >
            © 2022 Potato.to – crypto, NFT & web3 insight aggregator | All
            Rights Reserved
          </Typography>

          {generatePaymentBlocks()}
        </div>

        <div className="desktop">
          <ul className="Footer__menu-wrapper">
            {pageListLarge.map((item, index) => {
              return (
                <ul className="Footer__menu" key={index}>
                  <li className="Footer__menu-item--main">
                    <Typography weight={TypographyWeight.MEDIUM}>
                      {item.title}
                    </Typography>
                  </li>

                  {item.links.map((item, index) => {
                    return (
                      <li className="Footer__menu-item" key={index}>
                        <Link to={item.url}>{item.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}

            <ul className="Footer__social">
              {socialList.map((item, index) => {
                return (
                  <li className="Footer__social-item" key={index}>
                    <a href={item.url} target="_blank">
                      <img src={item.img} alt={item.title} />
                      <Typography>{item.title}</Typography>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ul>

          {generatePaymentBlocks()}
        </div>
      </div>
    </div>
  );
};
