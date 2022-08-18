import React from 'react';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import LinePlot from './linePlot';
import './mainScreen.css';

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

const MainScreen = () => {
  const [projectId, setProjectId] = useState(295); // set another project to switch
  const [projectPlotData, setProjectPlotData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [price, setPrice] = useState(null);
  const [volume, setVolume] = useState(null);
  const [graphToggleButtons, setGraphToggleButtons] = useState(toggleButtons);

  useEffect(() => {
    fetch(`http://138.68.87.87/api/project/${projectId}/data`)
      .then((data) => data.json())
      .then((jsonData) => setProjectPlotData(jsonData));

    fetch(`http://138.68.87.87/api/project/${projectId}/sentiment`)
      .then((data) => data.json())
      .then((jsonData) => {
        setSentimentData(jsonData);
      });

    fetch(`http://138.68.87.87/api/project/${projectId}/price`)
      .then((data) => data.json())
      .then((jsonData) => {
        const priceVector = jsonData.map((item) => {
          return { date: item.date, value: parseFloat(item.avg_price_token) };
        });
        const volumeVector = jsonData.map((item) => {
          return { date: item.date, value: parseFloat(item.volume_token) };
        });
        setPrice(priceVector);
        setVolume(volumeVector);
      });
  }, [projectId]);

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
              <LinePlot
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
    </div>
  );
};

export default MainScreen;
