import React from 'react';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './card.css';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { filterDataObjectsByPeriod } from './ParsingHelper';
import { genChart } from './forYouChart';
import {
  getIntervalDomain,
  getChartDimensions,
} from './ChartElements/ChartCreateElements';

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
  projectId,
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
    .attr('id', `gradientPathLine${pathId}${projectId}`);
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

export const genCardChart = (
  projectId,
  chartData,
  interval,
  width,
  height,
  margin
) => {
  const domain = getIntervalDomain(chartData, interval);
  const svg = getCanvasSvg(projectId, width, height, margin);
  const xScale = d3.scaleTime().domain(domain).range([0, width]);
  console.log(chartData);
};

export const margin = {
  top: 20,
  bottom: 20,
  left: 0,
  right: 0,
};

export const CardChart = ({
  projectId,
  chartPrice,
  chartSentiment,
  chartTalkRate,
  chartVolume,
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [interval, setInterval] = useState('1M');
  const [activeToggleButtons, setActiveToggleButtons] = useState([1, 1]);
  const [chartDimensions, setChartDimensions] = useState(null);

  const chartData = filterDataObjectsByPeriod(
    chartPrice,
    chartSentiment,
    chartTalkRate,
    chartVolume
  );
  const buttonIntervals = ['3H', '1D', '1W', '1M', '3M'];
  let width = d3.select('.project-card').style('width');
  let height = width;
  width = parseInt(width) - margin.left - margin.right;
  height = width / 3.52;

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowSize(window.innerWidth);
      });
    };
  }, []);

  useEffect(() => {
    setChartDimensions(getChartDimensions());
  }, [windowSize]);

  useEffect(() => {
    if (chartDimensions)
      genCardChart(projectId, chartData, interval, width, height, margin);
  }, []);

  return (
    <>
      <div className="toggle-buttons-card">
        <div className="switch-toggle-wrap">
          <IOSSwitch
            defaultChecked
            mycolor="#2B59D1"
            onClick={(event) => {
              if (event.target.checked) {
                d3.select(`#gradientPathLineSentiment${projectId}`).style(
                  'opacity',
                  1
                );
                setActiveToggleButtons([1, 1]);
              } else {
                d3.select(`#gradientPathLineSentiment${projectId}`).style(
                  'opacity',
                  0
                );
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
                d3.select(`#gradientPathLineMentions${projectId}`).style(
                  'opacity',
                  1
                );
                setActiveToggleButtons([1, 1]);
              } else {
                d3.select(`#gradientPathLineMentions${projectId}`).style(
                  'opacity',
                  0
                );
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
