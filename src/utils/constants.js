const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

export const getDate = (input, months) => {
  const date = new Date(input);
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(
    Math.min(
      input.getDate(),
      getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    )
  );

  return date;
};

export const getStartDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const startDate = date.toISOString();

  return startDate;
};

export const getEndDate = (daysFwd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFwd);
  const endDate = date.toISOString();

  console.log(endDate);
  return endDate;
};

export const assetsMenuList = [
  'BTC-USD',
  'ETH-USD',
  'MATIC-USD',
  'DOGE-USD',
  'USDT-USD',
  'DAI-USD',
  'WBTC-USD',
  'AAVE-USD',
  'UNI-USD',
  'LINK-USD',
  'SUSHI-USD',
  'YFI-USD',
  'MKR-USD',
  'SNX-USD',
  'COMP-USD',
  'CRV-USD',
  'BAL-USD',
  'REN-USD',
  'UMA-USD',
  'ENJ-USD',
  'GRT-USD',
  'KNC-USD',
  'OMG-USD',
];
