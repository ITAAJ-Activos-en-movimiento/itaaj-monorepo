"use client"
import { FC, PropsWithChildren, createContext, useContext, useMemo } from "react";
import { SnackbarProvider as NotistackProvider, enqueueSnackbar, closeSnackbar } from 'notistack';
import { SnackbarError, SnackbarInfo, SnackbarSuccess, SnackbarType, SnackbarWarning } from "./SnackbarAlert";
import { v4 as uuid } from "uuid";

export const SnackbarContext = createContext({
  error: (_params: SnackbarType) => {},
  success: (_params: SnackbarType) => {},
  warning: (_params: SnackbarType) => {},
  info: (_params: SnackbarType) => {},
})

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo(() => ({
    error: (params: SnackbarType) => {
      const key = uuid();
      enqueueSnackbar('', {
        key: key,
        content: <SnackbarError data={params} onClose={closeSnackbar} keyId={key} />,
      })
    },
    success: (params: SnackbarType) => {
      const key = uuid();
      enqueueSnackbar('', {
        key: key,
        content: <SnackbarSuccess data={params} onClose={closeSnackbar} keyId={key} />,
      })
    },
    warning: (params: SnackbarType) => {
      const key = uuid();
      enqueueSnackbar('', {
        key: key,
        content: <SnackbarWarning data={params} onClose={closeSnackbar} keyId={key} />,
      })
    },
    info: (params: SnackbarType) => {
      const key = uuid();
      enqueueSnackbar('', {
        key: key,
        content: <SnackbarInfo data={params} onClose={closeSnackbar} keyId={key} />,
      })
    }
  }), [enqueueSnackbar]);
  
  return (
    <SnackbarContext.Provider value={value}>
      <NotistackProvider>
        {children}
      </NotistackProvider>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  return useContext(SnackbarContext);
}