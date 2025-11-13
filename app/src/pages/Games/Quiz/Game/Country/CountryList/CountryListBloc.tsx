import { useEffect } from 'react';
import { countryGuess } from '../../../../../../@types/quiz'

const CountryListBloc = ({title, countryList}: {title: string, countryList: countryGuess[]}) => {
  useEffect(() => {
    console.log(countryList.filter(c => c.found));
  }, [countryList]);

  return (
    <div className='w-full mb-28'>
      <table className='mx-auto'>
        <thead className='bg-[#7f3f0e] text-white border-2'><tr><th scope="col" className='p-2'>{title}</th></tr></thead>
        <tbody className='border-2'>
          {countryList.map((item, index) => (
            <tr key={`country_${title}_${index}`}><th className='p-2 pt-0'>{item.found ? item.name : item.name.split('').map((e) => e === '-' ? '-' : '_')}</th></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountryListBloc