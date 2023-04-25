export const generateQueryparams = (queryParams) => {
  const params = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  console.log(params);
  return params;
};
