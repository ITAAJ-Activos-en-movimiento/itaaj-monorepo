import { SnackbarKey } from 'notistack';
import { forwardRef } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import styles from './Snackbar.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export interface SnackbarType {
  title?: string;
  message: string;
}

export interface SnackbarProps {
  keyId: string, 
  data: SnackbarType, 
  onClose: (keyId?: SnackbarKey | undefined) => void
}

export const SnackbarError = forwardRef<HTMLDivElement, SnackbarProps>(({ keyId, onClose, data, ...rest }, ref) => (
  <div {...rest} ref={ref} className={styles.SnackbarError}>
    <div className={styles.Snackbar}>
      <ErrorIcon className={styles.SnackbarIconError} />
      <div className={styles.SnackbarContent}>
        <b className={styles.SnackbarTitle}>{data.title ?? 'Error'}</b>
        <p className={styles.SnackbarMessage}>{data.message}</p>
      </div>
      <div className={styles.SnackbarDivClose} onClick={() => onClose(keyId)}>
        <CloseIcon className={styles.SnackbarIconClose} />
      </div>
    </div>
  </div>
));

export const SnackbarWarning = forwardRef<HTMLDivElement, SnackbarProps>(({ keyId, onClose, data, ...rest }, ref) => (
  <div {...rest} ref={ref} className={styles.SnackbarWarning}>
    <div className={styles.Snackbar}>
      <WarningIcon className={styles.SnackbarIconWarning} />
      <div className={styles.SnackbarContent}>
        <b className={styles.SnackbarTitle}>{data.title ?? 'Advertencia'}</b>
        <p className={styles.SnackbarMessage}>{data.message}</p>
      </div>
      <div className={styles.SnackbarDivClose} onClick={() => onClose(keyId)}>
        <CloseIcon className={styles.SnackbarIconClose} />
      </div>
    </div>
  </div>
));

export const SnackbarSuccess = forwardRef<HTMLDivElement, SnackbarProps>(({ keyId, onClose, data, ...rest }, ref) => (
  <div {...rest} ref={ref} className={styles.SnackbarSuccess}>
    <div className={styles.Snackbar}>
      <CheckCircleIcon className={styles.SnackbarIconSuccess} />
      <div className={styles.SnackbarContent}>
        <b className={styles.SnackbarTitle}>{data.title ?? 'En Hora Buena'}</b>
        <p className={styles.SnackbarMessage}>{data.message}</p>
      </div>
      <div className={styles.SnackbarDivClose} onClick={() => onClose(keyId)}>
        <CloseIcon className={styles.SnackbarIconClose} />
      </div>
    </div>
  </div>
));

export const SnackbarInfo = forwardRef<HTMLDivElement, SnackbarProps>(({ keyId, onClose, data, ...rest }, ref) => (
  <div {...rest} ref={ref} className={styles.SnackbarInfo}>
    <div className={styles.Snackbar}>
      <InfoIcon className={styles.SnackbarIconInfo} />
      <div className={styles.SnackbarContent}>
        <b className={styles.SnackbarTitle}>{data.title ?? 'Información'}</b>
        <p className={styles.SnackbarMessage}>{data.message}</p>
      </div>
      <div className={styles.SnackbarDivClose} onClick={() => onClose(keyId)}>
        <CloseIcon className={styles.SnackbarIconClose} />
      </div>
    </div>
  </div>
));