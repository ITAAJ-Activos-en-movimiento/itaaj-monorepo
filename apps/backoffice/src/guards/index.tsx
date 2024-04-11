import { PrivateRoutes, PublicRoutes } from '@/constant-definitions';
import { useUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate to={PrivateRoutes.PRIVATE} replace />
)

const GuardRoute = ({privateValidation}: Props) => {
  const { isLoading, user } = useUser();

  console.log({user})
  if(isLoading) return <p>Cargando...</p>
  

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
