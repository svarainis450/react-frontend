export const parseFilterDataObject = (dataObjectArr, startDatetime) => {
  if (!dataObjectArr || dataObjectArr.length === 0) return [];
  const scoreKeyName = Object.keys(dataObjectArr[0]).filter(
    (name) => !name.includes('date')
  )[0];
  const parsedFilteredObject = dataObjectArr
    .map((item) => {
      return {
        datetime: new Date(item.datetime || item.date),
        value: item[scoreKeyName],
      };
    })
    .filter((item) => item.datetime >= startDatetime)
    .sort((a, b) => a.datetime - b.datetime);
  return parsedFilteredObject;
};

export const filterDataObjectsByPeriod = (
  chartPrice,
  chartSentiment,
  chartTalkRate,
  chartVolume
) => {
  // end datetimes
  let endTime = new Date();
  endTime.setUTCHours(endTime.getHours(), 0, 0, 0);
  let endTimeDay = new Date();
  endTimeDay.setUTCHours(0, 0, 0, 0);

  // start datetimes
  let threeHourStartTime = new Date();
  threeHourStartTime.setUTCHours(threeHourStartTime.getHours() - 3, 0, 0, 0);

  let oneDayStartTime = new Date();
  oneDayStartTime.setUTCHours(oneDayStartTime.getHours() - 24, 0, 0, 0);

  let oneWeekStartTime = new Date();
  oneWeekStartTime.setDate(oneWeekStartTime.getDate() - 7);
  oneWeekStartTime.setUTCHours(0, 0, 0, 0);

  let oneMonthStartTime = new Date();
  oneMonthStartTime.setDate(oneMonthStartTime.getDate() - 30);
  oneMonthStartTime.setUTCHours(0, 0, 0, 0);

  let threeMonthsStartTime = new Date();
  threeMonthsStartTime.setDate(threeMonthsStartTime.getDate() - 90);
  threeMonthsStartTime.setUTCHours(0, 0, 0, 0);

  let allStartTime = new Date('2022-05-01');
  allStartTime.setUTCHours(0, 0, 0, 0);

  // talkRate
  const talkRateThreeHours = parseFilterDataObject(
    chartTalkRate.three_hours_talk_rate,
    threeHourStartTime
  );
  const talkRateOneDay = parseFilterDataObject(
    chartTalkRate.one_day_talk_rate,
    oneDayStartTime
  );
  const talkRateOneWeek = parseFilterDataObject(
    chartTalkRate.one_week_talk_rate,
    oneWeekStartTime
  );
  const talkRateOneMonth = parseFilterDataObject(
    chartTalkRate.one_month_talk_rate,
    oneMonthStartTime
  );
  const talkRateThreeMonths = parseFilterDataObject(
    chartTalkRate.three_months_talk_rate,
    threeMonthsStartTime
  );
  const talkRateAll = parseFilterDataObject(
    chartTalkRate.all_talk_rate,
    allStartTime
  );
  // sentiment
  const sentimentThreeHours = parseFilterDataObject(
    chartSentiment.three_hours_sentiment,
    threeHourStartTime
  );
  const sentimentOneDay = parseFilterDataObject(
    chartSentiment.one_day_sentiment,
    oneDayStartTime
  );
  const sentimentOneWeek = parseFilterDataObject(
    chartSentiment.one_week_sentiment,
    oneWeekStartTime
  );
  const sentimentOneMonth = parseFilterDataObject(
    chartSentiment.one_month_sentiment,
    oneMonthStartTime
  );
  const sentimentThreeMonths = parseFilterDataObject(
    chartSentiment.three_months_sentiment,
    threeMonthsStartTime
  );
  const sentimentAll = parseFilterDataObject(
    chartSentiment.all_sentiment,
    allStartTime
  );
  // price
  const priceThreeHours = parseFilterDataObject(
    chartPrice.three_hours_price,
    threeHourStartTime
  );
  const priceOneDay = parseFilterDataObject(
    chartPrice.one_day_price,
    oneDayStartTime
  );
  const priceOneWeek = parseFilterDataObject(
    chartPrice.one_week_price,
    oneWeekStartTime
  );
  const priceOneMonth = parseFilterDataObject(
    chartPrice.one_month_price,
    oneMonthStartTime
  );
  const priceThreeMonths = parseFilterDataObject(
    chartPrice.three_months_price,
    threeMonthsStartTime
  );
  const priceAll = parseFilterDataObject(chartPrice.all_price, allStartTime);
  // volume
  const volumeThreeHours = parseFilterDataObject(
    chartVolume.three_hours_volume,
    threeHourStartTime
  );
  const volumeOneDay = parseFilterDataObject(
    chartVolume.one_day_volume,
    oneDayStartTime
  );
  const volumeOneWeek = parseFilterDataObject(
    chartVolume.one_week_volume,
    oneWeekStartTime
  );
  const volumeOneMonth = parseFilterDataObject(
    chartVolume.one_month_volume,
    oneMonthStartTime
  );
  const volumeThreeMonths = parseFilterDataObject(
    chartVolume.three_months_volume,
    threeMonthsStartTime
  );
  const volumeAll = parseFilterDataObject(chartVolume.all_volume, allStartTime);

  const output = {
    threeHours: {
      talkRateThreeHours,
      sentimentThreeHours,
      priceThreeHours,
      volumeThreeHours,
      timeInterval: [threeHourStartTime, endTime],
    },
    oneDay: {
      talkRateOneDay,
      sentimentOneDay,
      priceOneDay,
      volumeOneDay,
      timeInterval: [oneDayStartTime, endTime],
    },
    oneWeek: {
      talkRateOneWeek,
      sentimentOneWeek,
      priceOneWeek,
      volumeOneWeek,
      timeInterval: [oneWeekStartTime, endTimeDay],
    },
    oneMonth: {
      talkRateOneMonth,
      sentimentOneMonth,
      priceOneMonth,
      volumeOneMonth,
      timeInterval: [oneMonthStartTime, endTimeDay],
    },
    threeMonths: {
      talkRateThreeMonths,
      sentimentThreeMonths,
      priceThreeMonths,
      volumeThreeMonths,
      timeInterval: [threeMonthsStartTime, endTimeDay],
    },
    all: {
      talkRateAll,
      sentimentAll,
      priceAll,
      volumeAll,
      timeInterval: [allStartTime, endTimeDay],
    },
  };
  return output;
};
