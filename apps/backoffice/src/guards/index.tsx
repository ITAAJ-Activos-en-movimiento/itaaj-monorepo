import { Loader } from '@/components';
import { PrivateRoutes } from '@/constant-definitions';
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
  const { isLoading } = useUser();

  if(isLoading) return <Loader />

  return privateValidation ? (
        PrivateValidationFragment
    ): (
      PublicValidationFragment
    )

}

export default GuardRoute
