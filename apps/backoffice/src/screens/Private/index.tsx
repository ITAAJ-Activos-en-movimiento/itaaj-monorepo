import { Layout } from '@/containers'
import { Navigate, Route, Routes } from 'react-router-dom'
import Developments from './Developments'
import { PrivateRoutes } from '@/constant-definitions'
import CreateDevelopment from './Developments/Create'
import Properties from './Properties'
import CreateProperty from './Properties/Create'

const Private = () => {
  return (
    <Routes>
       <Route index element={<Navigate replace to="developments" />} />
      <Route element={<Layout />}>
        <Route path='developments' element={<Developments />} />
        <Route
        path={PrivateRoutes.CREATE_DEVELOPMENT}
        element={<CreateDevelopment />}
      />
       <Route path='properties' element={<Properties />} />
        <Route
        path='properties/create'
        element={<CreateProperty />}
      />
      </Route>
    </Routes>
  )
}

export default Private