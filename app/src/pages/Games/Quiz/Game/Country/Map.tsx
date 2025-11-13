import { useEffect, useRef } from 'react'
import { countryGuess } from '../../../../../@types/quiz'

const Map = ({countryListFound, countryListToGuess, isContent}: {countryListFound: countryGuess[], countryListToGuess: countryGuess[], isContent: boolean}) => {
  const refTotalMap: any = useRef(null);
  useEffect(() => {
    console.log(refTotalMap.current)
  }, [refTotalMap])
  return (
    <div>
      <svg key='svg' className='bg-blue-400' style={{width: 770, height: 530}}>
      {/* <svg key='svg' className='bg-blue-400' style={{width: refTotalMap && refTotalMap.current ? refTotalMap.current.width : 3000, height: refTotalMap && refTotalMap.current ? refTotalMap.current.height : 1000}}> */}
        <g ref={refTotalMap} style={{transform: "scale(.38) translate(0px, 240px)"}}>
          {countryListFound.map((item, index) => (
            <path key={`country_main_found_${index}`} name={item.name} d={item.svgPoints.maintLocation}  style={{fill: 'green', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
          ))}
          {!isContent ? countryListFound.filter(clf => clf.svgPoints.islands.length > 0).map((item, index) => (
              <path key={`country_island_found_${index}`} name={item.name} d={item.svgPoints.islands}  style={{fill: 'green', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
          )) : <></>}

          {countryListToGuess.map((item, index) => (
            <path key={`country_main_not_found_${index}`} name={item.name} d={item.svgPoints.maintLocation}  style={{fill: 'white', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
          ))}
          {!isContent ? countryListToGuess.filter(clf => clf.svgPoints.islands.length > 0).map((item, index) => (
            <path key={`country_island_not_found_${index}`} name={item.name} d={item.svgPoints.islands}  style={{fill: 'white', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
          )) : <></>}
        </g>
      </svg>
    </div>
  )
}

export default Map