import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Typography, TypographyVariant, TypographyWeight } from "../Typography";
import { HeroTitle } from '../HeroTitle';

import browserWindow from "../../../Assets/images/browserWindow.png";
import people from "../../../Assets/images/reasoning/people.svg";
import download from "../../../Assets/images/reasoning/download.svg";
import target from "../../../Assets/images/reasoning/target.svg";
import world from "../../../Assets/images/reasoning/world.svg";
import arrowDown from "../../../Assets/images/arrowDown.svg";

import "./Reasoning.scss";

export const Reasoning = () => {

  return (
    <div className="Reasoning">
      <HeroTitle 
        className='Reasoning__hero'
        title="Why Potato?"
      />

      <div className="Reasoning__wrapper">
        <div className="Reasoning__content">
          <div className="desktop">

            <div className="Reasoning__item">
              <div className="Reasoning__icon">
                <img src={people} alt="people" />
              </div>

              <HeroTitle 
                className='Reasoning__text-block'
                smallTitle
                title="Experienced team"
                subtitle="We're a team of the most experienced web data extraction professionals, entrepreneurs, and marketers"
              />
            </div>

            <div className="Reasoning__item">
              <div className="Reasoning__icon">
                <img src={download} alt="download" />
              </div>

              <HeroTitle 
                className='Reasoning__text-block'
                smallTitle
                title="Parsed, ready-to-use data"
                subtitle="Boost your data-driven insights with parsed, ready-to-use data delivered in the most comfortable formats in one place"
              />
            </div>

            <div className="Reasoning__item">
              <div className="Reasoning__icon">
                <img src={target} alt="target" />
              </div>

              <HeroTitle 
                className='Reasoning__text-block'
                smallTitle
                title="Simple and accurate records"
                subtitle="We provide fresh and accurate data from high-quality sources"
              />
            </div>

            <div className="Reasoning__item">
              <div className="Reasoning__icon">
                <img src={world} alt="world" />
              </div>

              <HeroTitle 
                className='Reasoning__text-block'
                smallTitle
                title="Crypto community approved"
                subtitle="We have more than 5,000 users who love our service"
              />
            </div>

          </div>


          <div className="mobile">
            <Accordion className='Reasoning__accordeon-item'>
              <AccordionSummary
                expandIcon={<img src={arrowDown} alt="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="Reasoning__accordeon-item__summary"
              >
                <div className="Reasoning__icon">
                  <img src={people} alt="people" />
                </div>

                <Typography weight={TypographyWeight.MEDIUM}>
                  Experienced team
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography className='Reasoning__accordeon-item__text' variant={TypographyVariant.SUBHEADING}>
                  We're a team of the most experienced web data extraction professionals, entrepreneurs, and marketers
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className='Reasoning__accordeon-item'>
              <AccordionSummary
                expandIcon={<img src={arrowDown} alt="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="Reasoning__accordeon-item__summary"
              >
                <div className="Reasoning__icon">
                  <img src={download} alt="people" />
                </div>

                <Typography weight={TypographyWeight.MEDIUM}>
                  Parsed, ready-to-use data
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography className='Reasoning__accordeon-item__text' variant={TypographyVariant.SUBHEADING}>
                  Boost your data-driven insights with parsed, ready-to-use data delivered in the most comfortable formats in one place
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className='Reasoning__accordeon-item'>
              <AccordionSummary
                expandIcon={<img src={arrowDown} alt="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="Reasoning__accordeon-item__summary"
              >
                <div className="Reasoning__icon">
                  <img src={target} alt="people" />
                </div>

                <Typography weight={TypographyWeight.MEDIUM}>
                  Simple and accurate records
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography className='Reasoning__accordeon-item__text' variant={TypographyVariant.SUBHEADING}>
                We provide fresh and accurate data from high-quality sources
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className='Reasoning__accordeon-item'>
              <AccordionSummary
                expandIcon={<img src={arrowDown} alt="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="Reasoning__accordeon-item__summary"
              >
                <div className="Reasoning__icon">
                  <img src={world} alt="people" />
                </div>

                <Typography weight={TypographyWeight.MEDIUM}>
                  Crypto community approved
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography className='Reasoning__accordeon-item__text' variant={TypographyVariant.SUBHEADING}>
                  We have more than 5,000 users who love our service
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

        </div>

        <div className="Reasoning__img">
          <img className="Reasoning__message" src={browserWindow} alt="heroMessage" />
        </div>
      </div>
    </div>
  );
};
