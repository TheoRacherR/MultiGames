import { country } from "../../@types/user";

export const countryObject = {
  [country.FRANCE]: {
    name: 'France',
    flag: '🇫🇷',
  },
  [country.UK]: {
    name: 'United Kingdom',
    flag: '🇬🇧',
  },
  [country.USA]: {
    name: 'United States of America',
    flag: '🇺🇸',
  },
}

export const countryList = [
  country.FRANCE,
  country.USA,
  country.UK
];
