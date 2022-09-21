import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import {
  getIntervalDomain,
  getCanvasSvg,
  addLineWithGradient,
  buttonKeyMap,
  chartTypeMap,
  addXAxisTicks,
  addYAxisTicks,
  getChartDimensions,
  margin,
} from './ChartElements/ChartCreateElements';
import { ChartColors } from './ChartElements/Colors';
import { DotExplain } from './ChartElements/ChartGraphicsElements';
import './linePlot.css';

const buttonIntervals = ['3H', '1D', '1W', '1M', '3M', 'All'];

export const getOffsetTop = (element) => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};

export const genChart = (
  chartData,
  interval,
  chartDimensions,
  chartTypeButtons,
  chartMargins
) => {
  const element = document.getElementById('line-chart');
  const realOffset = getOffsetTop(element);

  // delete old chart
  d3.select('.chart-svg').remove();
  d3.select('.tooltip-wrapper').remove();

  const domain = getIntervalDomain(chartData, interval);

  // initialize svg
  const svg = getCanvasSvg(
    chartDimensions.width,
    chartDimensions.height,
    chartMargins
  );

  const activeItems = chartTypeButtons.filter((item) => item.active === true);
  const intervalMap = buttonKeyMap.get(interval);
  const intervalMapFirstCapitalized =
    intervalMap.charAt(0).toUpperCase() + intervalMap.slice(1);
  const xScale = d3
    .scaleTime()
    .domain(domain)
    .range([0, chartDimensions.width]);

  // X AXIS
  addXAxisTicks(svg, xScale, chartDimensions);
  if (activeItems.length === 1) {
    const data =
      chartData[intervalMap][
        chartTypeMap.get(activeItems[0].title) + intervalMapFirstCapitalized
      ];
    if (data.length > 2) {
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([chartDimensions.height, 0]);

      addLineWithGradient(
        svg,
        chartDimensions,
        xScale,
        yScale,
        ChartColors[activeItems[0].title],
        {
          gradientId: 'gradient' + activeItems[0].title,
          pathId: activeItems[0].title,
        },
        data,
        true
      );
      // Y AXIS
      addYAxisTicks('left', yScale, chartMargins, chartDimensions);

      // EXPERIMENTAL ADD LISTENERS
      const formatDate = d3.timeFormat('%-d %B %Y');

      const listenerRect = d3
        .select('g')
        .append('rect')
        .attr('class', 'listening-rect')
        .attr('width', chartDimensions.width)
        .attr('height', chartDimensions.height)
        .on('mousemove', (event) => {
          const coords = d3.pointer(event);
          const hoveredDate = xScale.invert(coords[0]);
          const getDistanceFromHoveredDate = (d) => Math.abs(d - hoveredDate);
          const closestIndex = d3.scan(
            data,
            (a, b) =>
              getDistanceFromHoveredDate(a.datetime) -
              getDistanceFromHoveredDate(b.datetime)
          );
          const closestDataPoint = data[closestIndex];

          tooltip.select('#date').text(formatDate(closestDataPoint.datetime));
          tooltip
            .select('#value')
            .html(`${activeItems[0].title}: ${closestDataPoint.value}`);

          // console.log(event.pageX, window.innerWidth, chartDimensions.width);
          const svgCoords = document
            .querySelector('.listening-rect')
            .getBoundingClientRect();
          const tooltipWidth = document
            .querySelector('.tooltip')
            .getBoundingClientRect();
          if (
            svgCoords.x + svgCoords.width - event.pageX - tooltipWidth.width >
            0
          ) {
            tooltip.style('left', `${event.pageX + 20}px`);
          } else {
            tooltip.style('left', `${event.pageX - tooltipWidth.width - 20}px`);
          }

          tooltip.style(
            'top',
            `${realOffset + yScale(closestDataPoint.value)}px`
          );
          tooltip.style('opacity', 1);

          tooltipCircle
            .attr('cx', xScale(closestDataPoint.datetime))
            .attr('cy', yScale(closestDataPoint.value))
            .style('opacity', 1);
        })
        .on('mouseleave', () => {
          tooltip.style('opacity', 0);
          tooltipCircle.style('opacity', 0);
        });
      const tooltip = d3
        .select('body')
        .insert('div', ':first-child')
        .attr('class', 'tooltip-wrapper')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltip');

      tooltip
        .append('div')
        .attr('class', 'tooltip-date')
        .append('span')
        .attr('id', 'date');

      tooltip
        .append('div')
        .attr('class', 'tooltip-value')
        .append('span')
        .attr('id', 'value');

      // Add a circle under our tooltip, right over the “hovered” point
      // const tooltip = d3.select("#tooltip");
      const tooltipCircle = d3
        .select('g')
        .append('circle')
        .attr('class', 'tooltip-circle')
        .attr('r', 4)
        .attr('stroke', ChartColors[activeItems[0].title].strokeColorHex)
        .attr('fill', 'white')
        .attr('stroke-width', 2)
        .style('opacity', 0);
    }
  } else {
    activeItems.map((item, index) => {
      const data =
        chartData[intervalMap][
          chartTypeMap.get(item.title) + intervalMapFirstCapitalized
        ];
      if (data.length > 2) {
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.value)])
          .range([chartDimensions.height, 0]);

        addLineWithGradient(
          svg,
          chartDimensions,
          xScale,
          yScale,
          ChartColors[item.title],
          {
            gradientId: 'gradient' + item.title,
            pathId: item.title,
          },
          data,
          true
        );

        if (index === 0) {
          // left axis
          addYAxisTicks('left', yScale, chartMargins, chartDimensions);
        } else {
          // right axis
          addYAxisTicks('right', yScale, chartMargins, chartDimensions);
          return;
        }
      }
    });
  }
};

export const ForYouChart = ({ chartData, chartTypeButtons }) => {
  const [interval, setInterval] = useState('All');
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [chartDimensions, setChartDimensions] = useState(null);

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
      genChart(chartData, interval, chartDimensions, chartTypeButtons, margin);
  }, [interval, chartDimensions, chartTypeButtons, windowSize]);

  return (
    <>
      <div className="range-button-line-names-wrapper">
        <div className="range-button-group">
          {buttonIntervals.map((item, idx) => {
            if (item === interval) {
              return (
                <button
                  key={idx}
                  onClick={(event) => {
                    return setInterval(event.target.textContent);
                  }}
                  id="active"
                >
                  {item}
                </button>
              );
            } else {
              return (
                <button
                  key={idx}
                  onClick={(event) => {
                    return setInterval(event.target.textContent);
                  }}
                >
                  {item}
                </button>
              );
            }
          })}
        </div>
        <div className="line-names">
          {chartTypeButtons.map(({ active, title }, index) => {
            if (active) {
              return (
                <DotExplain
                  key={index}
                  dotColor={ChartColors[title].strokeColorHex}
                  dotName={title}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="line-display-markers"></div>
      <div className="chart-area" id="line-chart"></div>
    </>
  );
};
