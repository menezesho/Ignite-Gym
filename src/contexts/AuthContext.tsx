import { createContext, ReactNode, useEffect, useState } from "react";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { useToast } from "native-base";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        setUser(data.user);
        await storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: confirmSignOut,
      },
    ]);
  }

  async function confirmSignOut() {
    try {
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    const loggedUser = await storageUserGet();

    if (loggedUser) {
      setUser(loggedUser);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user, signIn, signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}