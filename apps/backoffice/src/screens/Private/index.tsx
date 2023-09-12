import { Layout } from '@/containers'
import { Route, Routes } from 'react-router-dom'
import Developments from './Developments'

const Private = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='developments' element={<Developments />} />
      </Route>
    </Routes>
  )
}

export default Private