import { Route, Routes } from 'react-router-dom'
import MainCategCountry from './MainAtlas'
import Altas from './Game/Atlas'

const WrapperAtlas = () => {
  document.title = "MG - Atlas";

  return (
    <div>
      <Routes>
        <Route path="" element={<MainCategCountry />} />
        <Route path="/game" element={<Altas />} />
      </Routes>
    </div>
  )
}

export default WrapperAtlas