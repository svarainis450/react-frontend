import { Link } from "react-router-dom";
import classNames from "classnames";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { FAQprops } from "./types";
import { Typography, TypographyVariant, TypographyWeight } from "../Typography";
import { HeroTitle } from '../HeroTitle';
import { Button } from '../Button';

import arrowDown from "../../../Assets/images/arrowDown.svg";

import "./FAQ.scss";

export const FAQ = ({faqItems, noTitle, className, noCta} : FAQprops) => {

  return (
    <div className={classNames("FAQ", className)}>
      {!noTitle && <>
        <HeroTitle 
          className='FAQ__hero'
          title="Frequently asked questions"
        />
      </>}

      <div className="FAQ__wrapper">
          {faqItems.map(( item : any, index  ) => {
            return <Accordion className='FAQ__accordeon-item' key={index} elevation={0}>
              <AccordionSummary
                expandIcon={<img src={arrowDown} alt="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="FAQ__accordeon-item__summary"
              >
                <Typography weight={TypographyWeight.MEDIUM} className="FAQ__item-title">
                  {item.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails className="FAQ__accordeon-item__text-wrapper">
                <Typography className='FAQ__accordeon-item__text' variant={TypographyVariant.SUBHEADING}>
                  {item.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          })}

        {!noCta && <Link to="/faq">
          <Button 
            className='FAQ__button' 
            onClick={() => console.log('Read more FAQ')}
          > 
            Read more FAQ
          </Button>
        </Link>}

      </div>
    </div>
  );
};
