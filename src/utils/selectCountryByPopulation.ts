// src/utils/selectCountryByPopulation.ts

import { countries } from "../data/countries";

export const selectCountryByPopulation = () => {
  const totalPopulation = countries.reduce(
    (sum, country) => sum + country.population,
    0
  );

  const rand = Math.random() * totalPopulation;
  let cumulative = 0;

  for (const country of countries) {
    cumulative += country.population;
    if (rand < cumulative) {
      return country;
    }
  }

  // fallback - shouldn't happen
  return countries[countries.length - 1];
};
