import {
  parse as parseDate,
  format as formatDate,
  parseISO,
  isValid,
  getHours,
  setHours,
  isSameHour,
  getMinutes,
  setMinutes,
  isSameMinute,
  getSeconds,
  setSeconds,
  isSameSecond,
} from 'date-fns/esm';

/**
 * Returns x raised to the n-th power.
 *
 * @param {string} value a string representing time
 * @param {format} string date-fns format string
 * @param {Date} Date assign a date to this value
 * @return {Date} returns a date based on the value string
 */

export const parseTime = (value, format = null, referenceDate = new Date()) => {
  if (value === null) {
    return value;
  }
  if (value instanceof Date) {
    return value;
  }
  if (format === null) {
    return parseISO(value);
  }

  const parsed = parseDate(value, format, referenceDate);

  if (!isValid(parsed) || (format && !value.startsWith(formatDate(parsed, format)))) {
    return new Date('');
  }

  return parsed;
};

export const formatTime = (value, format, referenceDate) =>
  formatDate(parseTime(value, format, referenceDate), format);

export const isValidTime = value => isValid(value);

export {
  getHours,
  setHours,
  isSameHour,
  getMinutes,
  setMinutes,
  isSameMinute,
  getSeconds,
  setSeconds,
  isSameSecond,
};
