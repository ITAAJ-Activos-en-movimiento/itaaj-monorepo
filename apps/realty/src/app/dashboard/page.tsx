'use client'
import { useEffect, useState } from 'react';
import { Profile, Properties } from '@/components/Dashboard';
import styles from './Dashboard.module.css';
import useAuthContext from '@/shared/hooks/useAuthContext';
import { fetchMyProfile } from '@/services';
import { useSDK } from '@metamask/sdk-react';

interface ProfileProps {
  name: string
  email: string
}

const ProfileTypes = {
  PROFILE: 'PROFILE',
  PROPERTIES: 'PROPERTIES',
  NONE: 'NONE',
}

const Dashboard = () => {
  const [profileAction, setProfileAction] = useState<string>(ProfileTypes.PROFILE);
  const [profile, setProfile] = useState<ProfileProps>()
  const { sdk, connected, chainId, account } = useSDK();
  const [isRequestingAccounts, setIsRequestingAccounts] = useState(false);

  const { action, state } = useAuthContext();

  const styleProfileAction = {
    [ProfileTypes.PROFILE]: styles.itemProfileActive,
    [ProfileTypes.PROPERTIES]: styles.itemProfileActive,
    [ProfileTypes.NONE]: styles.itemProfile
  }

  const componentProfile = {
    [ProfileTypes.PROFILE]:<Profile />,
    [ProfileTypes.PROPERTIES]: <Properties />,
    [ProfileTypes.NONE]: <></>
  }

  const handleChangeProfile = (action: string) => {
    setProfileAction(action)
  }

  const getProfile = async () => {
    const userData = state.user as any;
    const response = await fetchMyProfile(userData.uuid)
    setProfile(response);
  }

  const connect = async () => {
    try {
      if (!isRequestingAccounts && sdk) {
        setIsRequestingAccounts(true);
        await sdk.connect();
      }
    } catch (err) {
      console.warn(`No accounts found`, err);
    } finally {
      setIsRequestingAccounts(false);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };
  
  const handleLogout = () => {
    action.logout();
    disconnect();
  }

  useEffect(() => {
    if (Object.entries(state.user).length) getProfile();
    return () => {};
  }, [state.user])

  return (
    <div className={styles.content}>
      <div className={styles.profile}>
        <div className={styles.profileMenu}>
          <div 
            className={styleProfileAction[profileAction === ProfileTypes.PROFILE ? ProfileTypes.PROFILE : ProfileTypes.NONE]}
            onClick={() => handleChangeProfile(ProfileTypes.PROFILE)}
          >
            MI PERFIL
          </div>
          <div 
            className={styleProfileAction[profileAction === ProfileTypes.PROPERTIES ? ProfileTypes.PROPERTIES : ProfileTypes.NONE]}
            onClick={() => handleChangeProfile(ProfileTypes.PROPERTIES)}
          >
            MIS INMUEBLES 
            {/* - Broker / Mis proyectos - Inversionistas */}
          </div>
        </div>
        <div className={styles.profileUser}>
          <ul>
            <li>
              <b>Agente Itaaj: </b>
              <span>{profile?.name}</span>
            </li>
            <li>
              <b>Llave pública: </b>
              <span>{account}</span>
            </li>
            <li>
              <b>Correo electrónico: </b>
              <span>{profile?.email}</span>
            </li>
          </ul>
          {
            connected
            ? <button className={styles.buttonDisconnect} onClick={disconnect}>Desconectar Wallet</button>
            : <button className={styles.buttonConnect} onClick={connect}>Conectar Wallet</button>
          }
        </div>
      </div>

      <div className={styles.contentDashboard}>
        <div className={styles.dashboardHead}>
          <span>{profileAction}</span>
          <button type='button' onClick={handleLogout}>Cerrar Sesión</button>
        </div>
        <div className={styles.dashboardBody}>
          {componentProfile[profileAction]}
        </div>
      </div>
    </div>
  )
}

export default Dashboard