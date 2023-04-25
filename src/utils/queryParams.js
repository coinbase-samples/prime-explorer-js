export const generateQueryparams = (queryParams) => {
  const params = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined && value !== '') // drop params with empty or undefined values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  console.log(params);
  return params;
};
