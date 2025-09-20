import { countriesSortedInterface, countryGuess, modeQuiz } from "../../@types/guiz";

// Country.tsx
export const resetCountriesFound = (countryListArg: countryGuess[]): countryGuess[] => {
  countryListArg.forEach(cf => cf.found = false);
  return countryListArg;
};

// CountryList.tsx
export const reassembleCountries = (countriesFound: countryGuess[], countriesGuess: countryGuess[], modeCountryList: modeQuiz[]) => {
    console.log("reassembleCountries " + countriesFound.length + " " + countriesGuess.length);
    let countriesSorted: countriesSortedInterface[] = [];
    for (let i = 0; i < modeCountryList.length; i++) {
      if(modeCountryList[i] === modeQuiz.ALL) continue;
      let typeTemp: countriesSortedInterface = {
        type: modeCountryList[i],
        countries: [],
      };
      for (let j = 0; j < countriesFound.length; j++) {
        if(countriesFound[j].location.contient === modeCountryList[i]) {
          typeTemp.countries.push(countriesFound[j]);
          console.log('coundry found ' + countriesFound[j].name);
        }
      }
      for (let k = 0; k < countriesGuess.length; k++) {
        if(countriesGuess[k].location.contient === modeCountryList[i]) {
          typeTemp.countries.push(countriesGuess[k]);
        }
      }
      typeTemp.countries.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      countriesSorted.push(typeTemp);
    }
    return countriesSorted.filter(cs => cs.countries.length > 0);
  }