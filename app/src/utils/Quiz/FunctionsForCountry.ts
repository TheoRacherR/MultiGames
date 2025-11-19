import { countriesSortedInterface, countryGuess, modeQuiz, styleTransformMap } from "../../@types/quiz";
import { timerTotalQuizCountry, timerTotalQuizCountryAFRICA, timerTotalQuizCountryASIA, timerTotalQuizCountryEUROPE, timerTotalQuizCountryNORTH_AMERICA, timerTotalQuizCountrySOUTH_AMERICA,  } from "./Rules";

export const resetCountriesFound = (countryListArg: countryGuess[]): countryGuess[] => {
  countryListArg.forEach(cf => cf.found = false);
  return countryListArg;
};

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

export const rescaleMapToModeCountry = (mode: modeQuiz): styleTransformMap => {
  switch (mode){
    case modeQuiz.ALL: 
      return {scale: .38, translate: { x: 0,y: 240}}
    case modeQuiz.ASIA: 
      return {scale: .9, translate: { x: -1000,y: -0}}
    case modeQuiz.EUROPE: 
      return {scale: 2, translate: { x: -870,y: -40}}
    case modeQuiz.AFRICA: 
      return {scale: 1, translate: { x: -700,y: -240}}
    case modeQuiz.OCEANIA: 
      return {scale: 1.2, translate: { x: -1550,y: -400}}
    case modeQuiz.NORTH_AMERICA: 
      return {scale: 1, translate: { x: -60,y: 20}}
    case modeQuiz.SOUTH_AMERICA: 
      return {scale: 1, translate: { x: -220,y: -370}}
    default:
      return {scale: .38, translate: { x: 0,y: 240}}
  }
}

export const getTotalSecondByModeCountry = (mode: modeQuiz): number => {
  switch (mode) {
    case modeQuiz.ALL: 
      return timerTotalQuizCountry;
    case modeQuiz.ASIA: 
      return timerTotalQuizCountryASIA
    case modeQuiz.EUROPE: 
      return timerTotalQuizCountryEUROPE;
    case modeQuiz.AFRICA: 
      return timerTotalQuizCountryAFRICA
    case modeQuiz.OCEANIA: 
      return timerTotalQuizCountryAFRICA
    case modeQuiz.NORTH_AMERICA: 
      return timerTotalQuizCountryNORTH_AMERICA
    case modeQuiz.SOUTH_AMERICA: 
      return timerTotalQuizCountrySOUTH_AMERICA
    default:
      return timerTotalQuizCountry
  }
}