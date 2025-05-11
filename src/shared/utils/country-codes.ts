import * as countryCodes from 'country-codes-list';

export const countryCodesObject = countryCodes.customList('countryNameEn', '{countryCode}');
export const countryNamesList = Object.keys(countryCodesObject);
