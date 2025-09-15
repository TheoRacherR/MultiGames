import { continentEnum, continentList, countriesSortedInterface, countryGuess } from '../../../../../../@types/guiz'
import CountryListBloc from './CountryListBloc';

const CountryList = ({countryListFound, countryListToGuess}: {countryListFound: countryGuess[], countryListToGuess: countryGuess[]}) => {
  
  const reassembleCountries = (countriesFound: countryGuess[], countriesGuess: countryGuess[], continentList: continentEnum[]) => {
    let countriesSorted: countriesSortedInterface[] = [];
    for (let i = 0; i < continentList.length; i++) {
      let typeTemp: countriesSortedInterface = {
        type: continentList[i],
        countries: [],
      };
      for (let j = 0; j < countriesFound.length; j++) {
        if(countriesFound[j].location.contient === continentList[i]) {
          typeTemp.countries.push(countriesFound[j]);
        }
      }
      for (let k = 0; k < countriesGuess.length; k++) {
        if(countriesGuess[k].location.contient === continentList[i]) {
          typeTemp.countries.push(countriesGuess[k]);
        }
      }
      typeTemp.countries.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      countriesSorted.push(typeTemp);
    }
    // console.log(countriesSorted)
    return countriesSorted;
  }
  const countriesSorted: countriesSortedInterface[] = reassembleCountries(countryListFound, countryListToGuess, continentList);

  return (
    <div className='flex mt-10'>
      {countriesSorted.map((item, index) => <CountryListBloc key={`countryBlox_${index}`} title={item.type} countryList={item.countries}/>)}
    </div>
  )
}

export default CountryList