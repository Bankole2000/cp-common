import countriesJson from '../data/countries.json';
import statesJson from '../data/states.json';
import currencyJson from '../data/currencyObject.json';
import currencies from '../data/currencies.json';

export { getAdjectives } from '../data/adjectives';
export const countries = countriesJson;
export const states = statesJson;
export const currencyObject = currencyJson;
export const currencyArray = currencies;

export const getCountryStates = (countryCode: string) => states.filter((state) => state.country_code === countryCode);
