import { useEffect, useState } from 'react';
import { countriesSortedInterface, countryGuess, modeCountryList } from '../../../../../../@types/quiz'
import CountryListBloc from './CountryListBloc';
import { reassembleCountries } from '../../../../../../utils/Quiz/FunctionsForCountry';

const CountryList = ({countryListFound, countryListToGuess}: {countryListFound: countryGuess[], countryListToGuess: countryGuess[]}) => {

  useEffect(() => {
    setCountriesSorted(reassembleCountries(countryListFound, countryListToGuess, modeCountryList));
  }, [countryListFound, countryListToGuess])

  // const countriesSorted: countriesSortedInterface[] = reassembleCountries(countryListFound, countryListToGuess, modeCountryList);
  const [countriesSorted, setCountriesSorted] = useState<countriesSortedInterface[]>(reassembleCountries(countryListFound, countryListToGuess, modeCountryList));

  return (
    <div className='flex mt-10'>
      {countriesSorted.map((item, index) => <CountryListBloc key={`countryBlox_${index}`} title={item.type} countryList={item.countries}/>)}
    </div>
  )
}

export default CountryList