import { useState, useEffect } from 'react';
import { ForYouChart } from './forYouChart';
import './mainScreen.css';
import { EmptyChartStateComp } from '../ForYourElements/EmptyChartStateComp';

const toggleButtons = [
  {
    active: false,
    title: 'Sentiment',
  },
  {
    active: true,
    title: 'Mentions',
  },
  {
    active: false,
    title: 'Volume',
  },
  {
    active: false,
    title: 'Price',
  },
];

export const ForYouChartView = ({
  chartPrice,
  chartSentiment,
  chartTalkRate,
  chartVolume,
}) => {
  const [projectPlotData, setProjectPlotData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [price, setPrice] = useState(null);
  const [volume, setVolume] = useState(null);
  const [graphToggleButtons, setGraphToggleButtons] = useState(toggleButtons);

  console.log(chartPrice);

  const toggleGraphActivity = (event) => {
    let newState;
    const pressedTitle = event.currentTarget.textContent;
    switch (graphToggleButtons.filter((item) => item.active === true).length) {
      case 1:
        let previouslyActiveButton = graphToggleButtons.filter(
          (item) => item.active === true
        )[0].title;
        if (previouslyActiveButton !== pressedTitle) {
          newState = graphToggleButtons.map((obj) => {
            if (obj.title === pressedTitle) {
              if (event.currentTarget.id === 'active') {
                return { ...obj, active: false };
              } else {
                return { ...obj, active: true };
              }
            } else {
              return obj;
            }
          });
          setGraphToggleButtons(newState);
        }
        break;
      case 2:
        newState = graphToggleButtons.map((item) => {
          if (item.title === pressedTitle) {
            if (event.currentTarget.id === 'active') {
              return { ...item, active: false };
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
        setGraphToggleButtons(newState);
        break;
    }
  };

  return (
    <div className="main-screen">
      <div className="toggle-buttons">
        {graphToggleButtons.map(({ active, title }, idx) => {
          if (active) {
            return (
              <button
                key={idx}
                onClick={toggleGraphActivity}
                className="tgl-btn"
                id="active"
              >
                {title}
              </button>
            );
          } else {
            return (
              <button
                key={idx}
                onClick={toggleGraphActivity}
                className="tgl-btn"
              >
                {title}
              </button>
            );
          }
        })}
      </div>
      <div className="data-area">
        <div className="plot-area">
          <div className="graph">
            {projectPlotData ? (
              <ForYouChart
                talkRateData={projectPlotData}
                sentimentData={sentimentData}
                priceData={price}
                volumeData={volume}
                toggleButtons={graphToggleButtons}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      {/* TODO: NIKITA, empty chart state */}
      {/* <EmptyChartStateComp /> */}
    </div>
  );
};
