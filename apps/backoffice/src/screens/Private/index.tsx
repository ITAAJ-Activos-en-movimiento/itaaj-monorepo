import { Layout } from '@/containers'
import { Navigate, Route, Routes } from 'react-router-dom'
import Developments from './Developments'
import { PrivateRoutes } from '@/constant-definitions'
import CreateDevelopment from './Developments/Create'
import Properties from './Properties'
import CreateProperty from './Properties/Create'
import Proposals from './Proposals'
import EditDevelopment from './Developments/Edit'
import EditPropety from './Properties/Edit'

const Private = () => {
  return (
    <Routes>
       <Route index element={<Navigate replace to="developments" />} />
      <Route element={<Layout />}>
        <Route path='developments' element={<Developments />} />
        <Route path='development/edit/:slug' element={<EditDevelopment />} />

        <Route
        path={PrivateRoutes.CREATE_DEVELOPMENT}
        element={<CreateDevelopment />}
      />
       <Route path='properties' element={<Properties />} />
       <Route path='proposals' element={<Proposals />} />

        <Route
        path='properties/create'
        element={<CreateProperty />}
      />
        <Route path='properties/:slug' element={<EditPropety />} />

      </Route>
    </Routes>
  )
}

export default Private