import { useState } from 'react';
import { ForYouChart } from './forYouChart';
import { filterDataObjectsByPeriod } from './ParsingHelper';
import './mainScreen.css';
import { EmptyChartStateComp } from '../ForYourElements/EmptyChartStateComp';
import { icons } from 'src/utils/icons';
import { InfoBlocks } from './InfoBlocks';

export const toggleButtons = [
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
  projectType,
  chartPrice,
  chartSentiment,
  chartTalkRate,
  chartVolume,
}) => {
  const [graphToggleButtons, setGraphToggleButtons] = useState(toggleButtons);
  const [showInfoBlock, setShowInfoBlock] = useState({
    sentiment: false,
    volume: false,
    price: false,
    mentions: false,
  });

  if (!chartPrice || !chartSentiment || !chartTalkRate || !chartVolume) {
    return <EmptyChartStateComp />;
  }

  const chartData = filterDataObjectsByPeriod(
    chartPrice,
    chartSentiment,
    chartTalkRate,
    chartVolume
  );

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
          console.log(newState);
          setGraphToggleButtons(newState);
        }
        break;
      case 2:
        newState = graphToggleButtons.map((item) => {
          if (item.title === pressedTitle) {
            if (event.currentTarget.id === 'active') {
              return { ...item, active: false };
            } else {
              return { ...item, active: true };
              // return item;
            }
          } else {
            return item;
          }
        });

        const activeButtons = newState.filter((d) => d.active === true);
        let dropButton;
        if (activeButtons.length > 2) {
          dropButton = activeButtons
            .filter((d) => d.title !== pressedTitle)
            .at(-1);
          newState = newState.map((item) => {
            if (item.title === dropButton.title) {
              return { ...item, active: false };
            } else {
              return item;
            }
          });
        }

        setGraphToggleButtons(newState);
        break;
    }
  };
  return (
    <div className="main-screen">
      <div className="toggle-buttons">
        {graphToggleButtons.map(({ active, title }, idx) => {
          const titleLowerCased = title.toLocaleLowerCase();
          if (active) {
            return (
              <button
                key={idx}
                onClick={toggleGraphActivity}
                className="tgl-btn"
                id="active"
              >
                <span>{title}</span>
                <img
                  onMouseLeave={() =>
                    setShowInfoBlock({
                      ...showInfoBlock,
                      [titleLowerCased]: false,
                    })
                  }
                  onMouseOver={() =>
                    setShowInfoBlock({
                      ...showInfoBlock,
                      [titleLowerCased]: true,
                    })
                  }
                  src={icons.question_mark_white}
                  alt="question mark"
                />
                {showInfoBlock[titleLowerCased] && (
                  <InfoBlocks infoType={titleLowerCased} />
                )}
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
                <img
                  onMouseOver={() =>
                    setShowInfoBlock({
                      ...showInfoBlock,
                      [titleLowerCased]: true,
                    })
                  }
                  onMouseLeave={() =>
                    setShowInfoBlock({
                      ...showInfoBlock,
                      [titleLowerCased]: false,
                    })
                  }
                  src={icons.question_mark_grey}
                  alt="question mark"
                />
                {showInfoBlock[titleLowerCased] && (
                  <InfoBlocks infoType={titleLowerCased} />
                )}
              </button>
            );
          }
        })}
      </div>
      <div className="data-area">
        <div className="plot-area">
          <div className="graph">
            <ForYouChart
              projectType={projectType}
              chartData={chartData}
              chartTypeButtons={graphToggleButtons}
            />
          </div>
        </div>
      </div>
      {/* TODO: NIKITA, empty chart state */}
      {/* <EmptyChartStateComp /> */}
    </div>
  );
};
