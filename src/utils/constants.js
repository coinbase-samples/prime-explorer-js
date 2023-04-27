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

  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const seconds = ('0' + date.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

export const getEndDate = (daysFwd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFwd);

  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const seconds = ('0' + date.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
