'use client'
import { useState } from 'react';
import { Profile, Properties } from '@/components/Dashboard';
import styles from './Dashboard.module.css';

const ProfileTypes = {
  PROFILE: 'PROFILE',
  PROPERTIES: 'PROPERTIES',
  NONE: 'NONE',
}

const Dashboard = () => {
  const [profileAction, setProfileAction] = useState<string>(ProfileTypes.PROFILE);

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

  return (
    <div className={styles.content}>
      <div className={styles.profile}>
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

      <div className={styles.contentDashboard}>
        <div className={styles.dashboardHead}>
          <span>MI PERFIL</span>
        </div>
        <div className={styles.dashboardBody}>
          {componentProfile[profileAction]}
        </div>
      </div>
    </div>
  )
}

export default Dashboard