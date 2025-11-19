import { useEffect, useRef } from 'react'
import { countryGuess, modeQuiz, styleTransformMap } from '../../../../../@types/quiz'
import { rescaleMapToModeCountry } from 'utils/Quiz/FunctionsForCountry';

const Map = ({mode, countryListFound, countryListToGuess, isContent}: {mode: modeQuiz, countryListFound: countryGuess[], countryListToGuess: countryGuess[], isContent: boolean}) => {
  const transformSVG = useRef<styleTransformMap>({scale: 0, translate: {x: 0, y: 0}})
  const refTotalMap: any = useRef(null);
  useEffect(() => {
    console.log(refTotalMap.current)
  }, [refTotalMap]);

  useEffect(() => {
    transformSVG.current = rescaleMapToModeCountry(mode);
    console.log(rescaleMapToModeCountry(mode))
  }, []);

  return (
    <svg key='svg' className='bg-blue-400' style={{width: 770, height: 530}}>
      <g ref={refTotalMap} style={{transform: `scale(${transformSVG.current.scale}) translate(${transformSVG.current.translate.x}px,${transformSVG.current.translate.y}px)`}}>
        {countryListFound.map((item, index) => (
          <path key={`country_main_found_${index}`} d={item.svgPoints.maintLocation}  style={{fill: 'green', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
        ))}
        {!isContent ? countryListFound.filter(clf => clf.svgPoints.islands.length > 0).map((item, index) => (
            <path key={`country_island_found_${index}`} d={item.svgPoints.islands}  style={{fill: 'green', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
        )) : <></>}

        {countryListToGuess.map((item, index) => (
          <path key={`country_main_not_found_${index}`} d={item.svgPoints.maintLocation}  style={{fill: 'white', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
        ))}
        {!isContent ? countryListToGuess.filter(clf => clf.svgPoints.islands.length > 0).map((item, index) => (
          <path key={`country_island_not_found_${index}`} d={item.svgPoints.islands}  style={{fill: 'white', stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2, cursor: 'pointer'}}></path>
        )) : <></>}
      </g>
    </svg>
  )
}

export default Map