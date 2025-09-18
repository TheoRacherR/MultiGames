import { countriesSortedInterface, countryGuess, modeCountryList, modeQuiz } from '../../../../../../@types/guiz'
import CountryListBloc from './CountryListBloc';

const CountryList = ({countryListFound, countryListToGuess}: {countryListFound: countryGuess[], countryListToGuess: countryGuess[]}) => {
  
  const reassembleCountries = (countriesFound: countryGuess[], countriesGuess: countryGuess[], modeCountryList: modeQuiz[]) => {
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
  const countriesSorted: countriesSortedInterface[] = reassembleCountries(countryListFound, countryListToGuess, modeCountryList);

  return (
    <div className='flex mt-10'>
      {countriesSorted.map((item, index) => <CountryListBloc key={`countryBlox_${index}`} title={item.type} countryList={item.countries}/>)}
    </div>
  )
}

export default CountryList