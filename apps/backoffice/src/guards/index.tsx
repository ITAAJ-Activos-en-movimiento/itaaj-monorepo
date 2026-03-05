import { PrivateRoutes, PublicRoutes } from '@/constant-definitions';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate to={PrivateRoutes.PRIVATE} replace />
)

const GuardRoute = ({privateValidation}: Props) => {
  const user = localStorage.getItem('user');

  console.log(user)
   return user ? (
    privateValidation ? (
        PrivateValidationFragment
    ): (
        PublicValidationFragment
    )
) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
) 
}

export default GuardRoute
