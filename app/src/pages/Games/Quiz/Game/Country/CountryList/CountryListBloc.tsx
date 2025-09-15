import React from 'react'
import { countryGuess } from '../../../../../../@types/guiz'

const CountryListBloc = ({title, countryList}: {title: string, countryList: countryGuess[]}) => {
  return (
    <div className='w-full'>
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