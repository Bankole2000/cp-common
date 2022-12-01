import * as countriesJson from '../data/countries.json';
import * as statesJson from '../data/states.json';
import * as currencyJson from '../data/currencyObject.json';
import * as currencies from '../data/currencies.json';

export const countries = countriesJson;
export const states = statesJson;
export const currencyObject = currencyJson;
export const currencyArray = currencies;

export const getCountryStates = (countryCode: string) => states.filter((state) => state.country_code === countryCode);
