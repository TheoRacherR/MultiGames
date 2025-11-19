import { countryGuess } from '../../../../../../@types/quiz'

const CountryListBloc = ({title, countryList, end}: {title: string, countryList: countryGuess[], end: boolean}) => {

  return (
    <div className='w-full mb-28'>
      <div className='mx-auto w-full'>
        <h2 className='bg-white text-[#5533EA] rounded-t-2xl p-4 text-xl'>{title}</h2>
        <div className='border-2 flex flex-wrap w-full rounded-b-2xl'>
          {countryList.map((item, index) => (
            <>
              {index === 0 ? <></> : <span key={`slash_${title}_${index}`}>/</span>}
              <div key={`country_${title}_${index}`}>
                {item.found ? 
                  <div className='p-2 pt-0 text-green-300'>
                    {item.name}
                  </div>
                :
                  end ?
                    <div className='p-2 pt-0 text-red-400'>
                      {item.name}
                    </div>
                  :
                  <div className='p-2 pt-0'>
                    {item.name.split('').map((e) => e === '-' ? '-' : '_')}
                  </div>
                }
                
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CountryListBloc