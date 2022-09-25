import * as d3 from 'd3';

export const buttonKeyMap = new Map(
  Object.entries({
    '3H': 'threeHours',
    '1D': 'oneDay',
    '1W': 'oneWeek',
    '1M': 'oneMonth',
    '3M': 'threeMonths',
    All: 'all',
  })
);

export const chartTypeMap = new Map(
  Object.entries({
    Mentions: 'talkRate',
    Sentiment: 'sentiment',
    Price: 'price',
    Volume: 'volume',
  })
);

// MARGINS
export const margin = {
  top: 10,
  bottom: 30,
  left: 40,
  right: 40,
};

export const getIntervalDomain = (chartData, interval) => {
  let domain;
  switch (interval) {
    case '3H':
      domain = chartData.threeHours.timeInterval;
      break;
    case '1D':
      domain = chartData.oneDay.timeInterval;
      break;
    case '1W':
      domain = chartData.oneWeek.timeInterval;
      break;
    case '1M':
      domain = chartData.oneMonth.timeInterval;
      break;
    case '3M':
      domain = chartData.threeMonths.timeInterval;
      break;
    case 'All':
      domain = chartData.all.timeInterval;
      break;
  }
  return domain;
};

// GRADIENT
export const createGradient = (selection, colorHex, id) => {
  const gradient = selection
    .select('defs')
    .append('linearGradient')
    .attr('id', id)
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '0%')
    .attr('y2', '0%');

  gradient
    .append('stop')
    .attr('offset', '10%')
    .attr('style', `stop-color:${colorHex};stop-opacity:0.00`);

  gradient
    .append('stop')
    .attr('offset', '50%')
    .attr('style', `stop-color:${colorHex};stop-opacity:0.1`);

  gradient
    .append('stop')
    .attr('offset', '100%')
    .attr('style', `stop-color:${colorHex};stop-opacity:.2`);
};

export const toggleChartActivity = (toggleButtons) => {
  // turn off init inactive charts
  toggleButtons.forEach((button) => {
    if (!button.active) {
      d3.select(`#gradientPath${button.title}`).style('opacity', 0); //0
      d3.select(`#gradientPathLine${button.title}`).style('opacity', 0); // 0
    } else {
      d3.select(`#gradientPath${button.title}`).style('opacity', 1); //0
      d3.select(`#gradientPathLine${button.title}`).style('opacity', 1); // 0
    }
  });
};

export const parseDataByInterval = (interval, parsedData) => {
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
      minDate = new Date('2022-05-01');
      break;
  }

  // filter required data objects only
  const filteredData = parsedData.filter(
    (item) => item.date >= minDate && maxDate >= item.date
  );
  return { filteredData, minDate };
};

export const getCanvasSvg = (width, height, margin) => {
  const svg = d3
    .select('#line-chart')
    .append('svg')
    .classed('chart-svg', true)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('viewBox', [0, 0, width, height]);
  svg.append('defs');
  return svg;
};

export const addLineWithGradient = (
  svg,
  dimensions,
  xScale,
  yScale,
  colors,
  ids,
  data,
  isSpline
) => {
  let line = d3
    .line()
    .x((d) => xScale(d.datetime))
    .y((d) => yScale(d.value));
  line = isSpline ? line.curve(d3.curveCatmullRom.alpha(0.1)) : line;

  svg.call(createGradient, colors.gradientColorHex, ids.gradientId);
  svg
    .selectAll('.line')
    .data([data])
    .enter()
    .append('path')
    .attr('d', (d) => {
      const lineValues = line(d).slice(1);
      const splitedValues = lineValues.split(',');
      return `M0,${dimensions.height},${lineValues},l0,${
        dimensions.height - splitedValues[splitedValues.length - 1]
      }`;
    })
    .style('fill', `url(#${ids.gradientId})`)
    .attr('id', `gradientPath${ids.pathId}`);
  svg
    .selectAll('.line')
    .data([data])
    .enter()
    .append('path')
    .attr('d', (d) => line(d))
    .attr('stroke-width', '2')
    .style('fill', 'none')
    .attr('stroke', colors.strokeColorHex)
    .attr('id', `gradientPathLine${ids.pathId}`);
};

export const getChartDimensionsCards = () => {
  let width = d3.select('.graph-wrapper').style('width');
  let height = width;
  return {
    width,
    height,
  };
};

export const getChartDimensions = () => {
  let width = d3.select('.plot-area').style('width');
  let height = d3.select('.plot-area').style('height');
  width = parseInt(width) - margin.left - margin.right;
  height =
    parseInt(height) -
    parseInt(d3.select('.range-button-group').style('height')) -
    parseInt(d3.select('.range-button-group').style('margin-top')) -
    parseInt(d3.select('.range-button-group').style('margin-bottom')) -
    parseInt(d3.select('.line-names').style('height')) -
    parseInt(d3.select('.line-names').style('margin-top')) -
    parseInt(d3.select('.line-names').style('margin-bottom')) -
    20 -
    margin.top -
    margin.bottom;
  return {
    height,
    width,
  };
};

export const addXAxisTicks = (svg, xScale, chartDimensions) => {
  const xTick = svg
    .append('g')
    .attr('transform', `translate(0, ${chartDimensions.height})`)
    .call(d3.axisBottom(xScale).ticks(6));

  xTick
    .selectAll('line')
    .attr('stroke-dasharray', `2, 2`)
    .attr('stroke', '#ccc')
    .attr('y2', `-${chartDimensions.height}px`);
};

export const addYAxisTicks = (side, yScale, chartMargins, chartDimensions) => {
  if (side === 'left') {
    const yTick = d3
      .select('.chart-svg')
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6)
          .tickFormat((d) => {
            if (d / 1000 >= 1 && d / 1000000 < 1) {
              d = d / 1000 + 'K';
            } else if (d / 1000000 >= 1) {
              d = d / 1000000 + 'M';
            }
            return d;
          })
      )
      .attr('transform', `translate(${chartMargins.left}, ${chartMargins.top})`)
      .attr('id', 'leftAxis');

    yTick
      .selectAll('line')
      .attr('stroke-dasharray', `2, 2`)
      .attr('stroke', '#ccc')
      .attr('x2', `${chartDimensions.width}px`);
  } else {
    d3.select('.chart-svg')
      .append('g')
      .call(
        d3
          .axisRight(yScale)
          .ticks(6)
          .tickFormat((d) => {
            if (d / 1000 >= 1 && d / 1000000 < 1) {
              d = d / 1000 + 'K';
            } else if (d / 1000000 >= 1) {
              d = d / 1000000 + 'M';
            }
            return d;
          })
      )
      .attr(
        'transform',
        `translate(${chartMargins.left + chartDimensions.width}, ${
          chartMargins.top
        })`
      )
      .attr('id', 'rightAxis');
  }
};

//   useEffect(() => {
//     let width = d3.select('.plot-area').style('width');
//     let height = d3.select('.plot-area').style('height');
//     width = parseInt(width) - margin.left - margin.right;
//     height =
//       parseInt(height) -
//       parseInt(d3.select('.range-button-group').style('height')) -
//       parseInt(d3.select('.range-button-group').style('margin-top')) -
//       margin.top -
//       margin.bottom;

//     setDimensionsChart({ width, height });

//     // drop old svg
//     d3.select('.chart-svg').remove();

//     // create canvas
//     const svg = getCanvasSvg(width, height, margin);

//     if (talkRate) {
//       const xScale = d3
//         .scaleTime()
//         .domain([
//           d3.min(talkRate, (d) => d.date),
//           d3.max(talkRate, (d) => d.date),
//         ])
//         .range([0, width]);
//       const yScaleTalkRate = d3
//         .scaleLinear()
//         .domain([0, d3.max(talkRate, (d) => d.value)])
//         .range([height, 0]);
//       setTalkRateDomain([0, d3.max(talkRate, (d) => d.value)]);

//       // init add left y axis
//       d3.select('.chart-svg')
//         .append('g')
//         .call(d3.axisLeft(yScaleTalkRate).ticks(6))
//         .attr('transform', `translate(${margin.left}, ${margin.top})`)
//         .attr('id', 'leftAxis');

//       // TALK RATE
//       addLineWithGradient(
//         svg,
//         { height, width },
//         xScale,
//         yScaleTalkRate,
//         {
//           gradientColorHex: '#FA5000',
//           strokeColorHex: '#FA5000',
//         },
//         {
//           gradientId: 'gradientTalkRate',
//           pathId: 'Mentions',
//         },
//         talkRate,
//         true
//       );

//       // SENTIMENT
//       if (sentiment && sentiment.length > 2) {
//         const yScaleSentiment = d3
//           .scaleLinear()
//           .domain([0, d3.max(sentiment, (d) => d.value)])
//           .range([height, 0]);
//         setSentimentDomain([0, d3.max(sentiment, (d) => d.value)]);

//         addLineWithGradient(
//           svg,
//           { height, width },
//           xScale,
//           yScaleSentiment,
//           {
//             gradientColorHex: '#2B59D1',
//             strokeColorHex: '#2B59D1',
//           },
//           {
//             gradientId: 'sentimentGradient',
//             pathId: 'Sentiment',
//           },
//           sentiment,
//           false
//         );
//       }

//       // PRICE
//       if (price && price.length > 2) {
//         const yScalePrice = d3
//           .scaleLinear()
//           .domain([0, d3.max(price, (d) => d.value)])
//           .range([height, 0]);
//         setPriceDomain([0, d3.max(price, (d) => d.value)]);

//         addLineWithGradient(
//           svg,
//           { height, width },
//           xScale,
//           yScalePrice,
//           {
//             gradientColorHex: '#2BD130',
//             strokeColorHex: '#2BD130',
//           },
//           {
//             gradientId: 'priceGradient',
//             pathId: 'Price',
//           },
//           price,
//           false
//         );
//       }

//       // VOLUME
//       if (volume && volume.length > 2) {
//         const yScaleVolume = d3
//           .scaleLinear()
//           .domain([0, d3.max(volume, (d) => d.value)])
//           .range([height, 0]);
//         setVolumeDomain([0, d3.max(volume, (d) => d.value)]);

//         addLineWithGradient(
//           svg,
//           { height, width },
//           xScale,
//           yScaleVolume,
//           {
//             gradientColorHex: '#000000',
//             strokeColorHex: '#000000',
//           },
//           {
//             gradientId: 'volumeGradient',
//             pathId: 'Volume',
//           },
//           volume,
//           false
//         );
//       }

//       // X AXIS
//       const xTick = svg
//         .append('g')
//         .attr('transform', `translate(0, ${height})`)
//         .call(d3.axisBottom(xScale).ticks(6));

//       toggleChartActivity(toggleButtons); // further toggle in outer layer

//       xTick
//         .selectAll('line')
//         .attr('stroke-dasharray', `2, 2`)
//         .attr('stroke', '#ccc')
//         .attr('y2', `-${height}px`);
//     }
//   }, [talkRate, windowSize]);

//   useEffect(() => {
//     // max 2 graphs at once
//     toggleChartActivity(toggleButtons); // update shown charts

//     let yScaleLeft;
//     let yScaleRight;
//     let domainLeft;
//     let domainRight;

//     switch (chartToggleButtons.filter((item) => item.active === true).length) {
//       case 1:
//         d3.select('#leftAxis').remove();
//         d3.select('#rightAxis').remove();
//         const leftTitle = chartToggleButtons.filter(
//           (item) => item.active === true
//         )[0].title;
//         let rightTitle = toggleButtons.filter(
//           (item) => item.active === true && item.title !== leftTitle
//         );

//         if (rightTitle.length > 0) {
//           rightTitle = rightTitle[0].title;
//           // right y axis
//           domainRight = getDomainByTitle(rightTitle);
//           if (domainRight) {
//             yScaleRight = d3
//               .scaleLinear()
//               .domain(domainRight)
//               .range([dimensionsChart.height, 0]);
//             d3.select('.chart-svg')
//               .append('g')
//               .call(d3.axisRight(yScaleRight).ticks(6))
//               .attr(
//                 'transform',
//                 `translate(${margin.left + dimensionsChart.width}, ${
//                   margin.top
//                 })`
//               )
//               .attr('id', 'rightAxis');
//           }
//         }

//         // left y axis
//         domainLeft = getDomainByTitle(leftTitle);
//         if (!domainLeft && talkRate)
//           domainLeft = [0, d3.max(talkRate, (d) => d.value)];

//         if (domainLeft) {
//           yScaleLeft = d3
//             .scaleLinear()
//             .domain(domainLeft)
//             .range([dimensionsChart.height, 0]);

//           const yTick = d3
//             .select('.chart-svg')
//             .append('g')
//             .call(d3.axisLeft(yScaleLeft).ticks(6))
//             .attr('transform', `translate(${margin.left}, ${margin.top})`)
//             .attr('id', 'leftAxis');

//           yTick
//             .selectAll('line')
//             .attr('stroke-dasharray', `2, 2`)
//             .attr('stroke', '#ccc')
//             .attr('x2', `${dimensionsChart.width}px`);
//         }
//         break;

//       case 2:
//         d3.select('#leftAxis').remove();
//         d3.select('#rightAxis').remove();
//         const activeItems = toggleButtons.filter(
//           (item) => item.active === true
//         );
//         if (activeItems.length === 1) {
//           let leftTitle = toggleButtons.find(
//             (item) => item.active === true
//           ).title;
//           domainLeft = getDomainByTitle(leftTitle);
//           if (domainLeft) {
//             yScaleLeft = d3
//               .scaleLinear()
//               .domain(domainLeft)
//               .range([dimensionsChart.height, 0]);
//             const yTick = d3
//               .select('.chart-svg')
//               .append('g')
//               .call(d3.axisLeft(yScaleLeft).ticks(6))
//               .attr('transform', `translate(${margin.left}, ${margin.top})`)
//               .attr('id', 'leftAxis');

//             yTick
//               .selectAll('line')
//               .attr('stroke-dasharray', `2, 2`)
//               .attr('stroke', '#ccc')
//               .attr('x2', `${dimensionsChart.width}px`);
//           }
//         }

//         if (activeItems.length === 2) {
//           let leftTitle = activeItems[0].title;
//           let rightTitle = activeItems[1].title;
//           domainLeft = getDomainByTitle(leftTitle);
//           domainRight = getDomainByTitle(rightTitle);

//           if (domainLeft) {
//             yScaleLeft = d3
//               .scaleLinear()
//               .domain(domainLeft)
//               .range([dimensionsChart.height, 0]);
//             const yTick = d3
//               .select('.chart-svg')
//               .append('g')
//               .call(d3.axisLeft(yScaleLeft).ticks(6))
//               .attr('transform', `translate(${margin.left}, ${margin.top})`)
//               .attr('id', 'leftAxis');

//             yTick
//               .selectAll('line')
//               .attr('stroke-dasharray', `2, 2`)
//               .attr('stroke', '#ccc')
//               .attr('x2', `${dimensionsChart.width}px`);
//           }

//           if (domainRight) {
//             yScaleRight = d3
//               .scaleLinear()
//               .domain(domainRight)
//               .range([dimensionsChart.height, 0]);
//             d3.select('.chart-svg')
//               .append('g')
//               .call(d3.axisRight(yScaleRight).ticks(6))
//               .attr(
//                 'transform',
//                 `translate(${margin.left + dimensionsChart.width}, ${
//                   margin.top
//                 })`
//               )
//               .attr('id', 'rightAxis');
//           }
//         }
//         break;
//       default:
//         break;
//     }

//     setChartToggleButtons(toggleButtons);
//   }, [toggleButtons, talkRate, price, sentiment, volume, windowSize]);

//   useEffect(() => {
//     window.addEventListener('resize', () => {
//       setWindowSize(window.innerWidth);
//     });
//   }, [windowSize]);
