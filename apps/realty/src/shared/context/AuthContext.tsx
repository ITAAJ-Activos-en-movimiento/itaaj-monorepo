'use client'
import { Access, Login, Register, RemoveSession } from "@/services";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";

export interface AuthContextProps {
  state: {
    user: object
    isAuthenticated: boolean
  }
  action: {
    access: () => void
    logout: () => void
    login: (prop: any) => Promise<void>
    register: (prop: any) => Promise<void>
  }
}

export const AuthContext = createContext<AuthContextProps>({
  state: {
    user: {},
    isAuthenticated: false
  },
  action: {
    access: () => {},
    logout: () => {},
    login: async () => {},
    register: async () => {},
  }
});
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { push } = useRouter()

  const access = useCallback(async () => {
    const response = await Access();
    if (response.error) {
      push("/");      
      alert(response.message); 
      return;
    }
    
    if (Object.entries(response.data).length !== 0) {
      setUser(response.data);
      setIsAuthenticated(true);
    }
  }, [])

  const login = async (user: any) => {
    const response = await Login(user);
    if (response.error) {
      push("/");      
      alert(response.message); 
      return;
    }
    
    if (Object.entries(response.data).length !== 0) {
      setUser(response.data);
      setIsAuthenticated(true);
    }

    if (!response.error) {
      push("/dashboard");
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  const logout = async () => {
    RemoveSession();
    setIsAuthenticated(false);
    setUser({});
    push("/");
  }

  const register = async (user: any) => {
    const response = await Register(user);
    if (response.error) {
      push("/");      
      alert(response.message); 
      return;
    }

    if (Object.entries(response.data).length !== 0) {
      setUser(response.data);
      setIsAuthenticated(true);
    }

    if (!response.error) {
      push("/dashboard");
      alert(response.message);
    } else {
      alert(response.message);
    }
  }

  const value = useMemo(() => ({
    state: {
      user,
      isAuthenticated
    },
    action: {
      access,
      login,
      register,
      logout
    }
  }), [isAuthenticated]);
  
  useEffect(() => {
    access();
    return () => {};
  }, [])

  return (
    <AuthContext.Provider children={children} value={value} />
  )
}