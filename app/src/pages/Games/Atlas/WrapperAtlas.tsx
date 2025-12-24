import { Route, Routes } from 'react-router-dom'
import MainCategCountry from './MainAtlas'
import CategCountry from './Game/Atlas'

const WrapperAtlas = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<MainCategCountry />} />
        <Route path="/game" element={<CategCountry />} />
      </Routes>
    </div>
  )
}

export default WrapperAtlas