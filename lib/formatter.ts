import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/vi';

/**
 * Defines the type for locales.
 */
export const LOCALES = {
  vi: {
    locales: 'vi-VN',
    currency: 'VND',
  },
  en: {
    locales: 'en-US',
    currency: 'USD',
  },
};

/**
 * Defines the type for locale.
 * @type {string}
 */
export type LOCALE = 'vi' | 'en';

/**
 * Formats a number as currency in Vietnamese Dong (VND) or USD.
 *
 * @param {number} value - The number to be formatted.
 * @returns {LOCALE} The formatted currency value.
 */
const formatter = (value: number, locale: LOCALE): string => {
  const { locales, currency } = LOCALES[locale];
  const result = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
  }).format(value);
  return result;
};

/**
 * Formats a date value.
 * @param {string|Date} value - The date.
 * @returns {string} The formatted date.
 */
export const dateFormat = (
  value: string | Date | undefined,
  locale: LOCALE = 'vi'
): string => {
  if (!value) return 'Unknown';
  const m = moment(value);
  return m.locale(locale).format('llll');
};

export default formatter;
