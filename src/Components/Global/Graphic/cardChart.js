import React from 'react';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './card.css';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const parseDataByInterval = (interval, parsedData) => {
  const maxDate = d3.max(parsedData, (d) => d.date);
  let minDate;

  switch (interval) {
    case '3H':
      minDate = new Date(maxDate);
      minDate.setHours(minDate.getHours() - 3);
      break;
    case '1D':
      minDate = new Date(maxDate);
      minDate.setDate(minDate.getDate() - 1);
      break;
    case '1W':
      minDate = new Date(maxDate);
      minDate.setDate(minDate.getDate() - 7);
      break;
    case '1M':
      minDate = new Date(maxDate);
      minDate.setDate(minDate.getDate() - 30);
      break;
    case '3M':
      minDate = new Date(maxDate);
      minDate.setDate(minDate.getDate() - 30 * 3);
      break;
    case 'All':
      minDate = new Date('2022-05-01');
      break;
    default:
      minDate = new Date('2022-07-01');
      break;
  }

  // filter required data objects only
  const filteredData = parsedData.filter(
    (item) => item.date >= minDate && maxDate >= item.date
  );
  return { filteredData, minDate, maxDate };
};

const getCanvasSvg = (projectId, width, height, margin) => {
  const svg = d3
    .select(`.chart-area-${projectId}`)
    .append('svg')
    .classed(`chart-svg-${projectId}`, true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('viewBox', [0, 0, width, height]);
  svg.append('defs');
  return svg;
};

const addLineNoGradient = (
  svg,
  xScale,
  yScale,
  strokeColorHex,
  pathId,
  data,
  isSpline
) => {
  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));
  line = isSpline ? line.curve(d3.curveCatmullRom.alpha(0.1)) : line;

  svg
    .selectAll('.line')
    .data([data])
    .enter()
    .append('path')
    .attr('d', (d) => line(d))
    .attr('stroke-width', '1.5')
    .style('fill', 'none')
    .attr('stroke', strokeColorHex)
    .attr('id', `gradientPathLine${pathId}`);
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, mycolor }) => ({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : mycolor,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return innerWidth;
}

const CardChart = ({ projectId }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [talkRate, setTalkRate] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [interval, setInterval] = useState('1M');
  const [activeToggleButtons, setActiveToggleButtons] = useState([1, 1]);

  const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
  const margin = {
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  };
  const buttonIntervals = ['3H', '1D', '1W', '1M', '3M'];

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(getWindowSize());
    });
  }, [windowSize]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://138.68.87.87/api/project/${projectId}/data`)
        .then((data) => data.json())
        .then((jsonData) => {
          let talkRate = jsonData.map((item) => {
            return {
              date: parseTime(item.timestamp),
              value: item.rolling_avg,
            };
          });
          setTalkRate(talkRate); // use as base
        })
        .catch((err) => console.log(err));

      fetch(`http://138.68.87.87/api/project/${projectId}/sentiment`)
        .then((data) => data.json())
        .then((jsonData) => {
          let sentiment = jsonData.map((item) => {
            return {
              date: parseTime(item.date),
              value: item.score,
            };
          });
          setSentiment(sentiment); // use as base
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!talkRate) return;
    const { filteredData, minDate, maxDate } = parseDataByInterval(
      interval,
      talkRate
    );

    let width = d3.select('.project-card').style('width');
    // let height = d3.select('.project-card').style('height');
    let height = width;
    width = parseInt(width) - margin.left - margin.right;
    height = width / 3.52;
    // height =
    //   parseInt(height) -
    //   parseInt(d3.select('.toggle-buttons').style('height')) -
    //   parseInt(d3.select('.interval-buttons').style('height')) -
    //   margin.top -
    //   margin.bottom;
    // drop old svg
    d3.select(`.chart-svg-${projectId}`).remove();

    // canvas
    const svg = getCanvasSvg(projectId, width, height, margin);

    if (filteredData) {
      const xScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, width]);

      const yScaleTalkRate = d3
        .scaleLinear()
        .domain([
          d3.min(filteredData, (d) => d.value),
          d3.max(filteredData, (d) => d.value),
        ])
        .range([height, 0]);

      if (sentiment) {
        const filteredSentiment = sentiment.filter(
          (d) => d.date.getTime() >= minDate.getTime()
        );
        const yScaleSentiment = d3
          .scaleLinear()
          .domain([
            d3.min(filteredSentiment, (d) => d.value),
            d3.max(filteredSentiment, (d) => d.value),
          ])
          .range([height, 0]);

        addLineNoGradient(
          svg,
          xScale,
          yScaleSentiment,
          '#2B59D1',
          'Sentiment',
          filteredSentiment,
          true
        );
      }

      addLineNoGradient(
        svg,
        xScale,
        yScaleTalkRate,
        '#2BD130',
        'Mentions',
        filteredData,
        true
      );

      svg
        .append('svg:line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', height / 2)
        .attr('y2', height / 2)
        .attr('stroke-dasharray', `2, 2`)
        .style('stroke', 'rgb(189, 189, 189)');

      if (activeToggleButtons[0] === 0) {
        d3.select('#gradientPathLineSentiment').style('opacity', 0);
      }
      if (activeToggleButtons[1] === 0) {
        d3.select('#gradientPathLineMentions').style('opacity', 0);
      }
    }
  }, [talkRate, interval, windowSize]);

  return (
    <>
      <div className="toggle-buttons">
        <div className="switch-toggle-wrap">
          <IOSSwitch
            defaultChecked
            mycolor="#2B59D1"
            onClick={(event) => {
              if (event.target.checked) {
                d3.select('#gradientPathLineSentiment').style('opacity', 1);
                setActiveToggleButtons([1, 1]);
              } else {
                d3.select('#gradientPathLineSentiment').style('opacity', 0);
                setActiveToggleButtons([0, 1]);
              }
            }}
          />
          <span id="switch-text-span">Sentiment</span>
        </div>
        <div className="switch-toggle-wrap">
          <IOSSwitch
            mycolor="#2BD130"
            defaultChecked
            onClick={(event) => {
              if (event.target.checked) {
                d3.select('#gradientPathLineMentions').style('opacity', 1);
                setActiveToggleButtons([1, 1]);
              } else {
                d3.select('#gradientPathLineMentions').style('opacity', 0);
                setActiveToggleButtons([1, 0]);
              }
            }}
          />
          <span id="switch-text-span">Talk Rate</span>
        </div>
      </div>
      <div className={`chart-area-${projectId}`}></div>
      <div className="interval-buttons">
        {buttonIntervals.map((item, idx) =>
          interval === item ? (
            <button
              key={idx}
              onClick={(event) => {
                if (event.target.textContent !== interval) {
                  d3.select(`.chart-svg-${projectId}`).remove();
                }
                setInterval(event.target.textContent);
              }}
              id="active"
            >
              {item}
            </button>
          ) : (
            <button
              key={idx}
              onClick={(event) => {
                if (event.target.textContent !== interval) {
                  d3.select(`.chart-svg-${projectId}`).remove();
                }
                setInterval(event.target.textContent);
              }}
            >
              {item}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default CardChart;
