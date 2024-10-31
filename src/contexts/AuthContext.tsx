import { Alert } from "react-native";
import { createContext, ReactNode, useEffect, useState } from "react";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type SaveUserAndTokenProps = {
  user: UserDTO;
  token: string;
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
        await storageUserSave(data.user);
        await storageAuthTokenSave(data.token);
        await updateUserAndToken(data.user);
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
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    }
  }

  async function updateUserAndToken({ user, token }: SaveUserAndTokenProps) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  }

  async function loadUserData() {
    const user = await storageUserGet();
    const token = await storageAuthTokenGet();

    if (token && user) {
      updateUserAndToken({ user, token });
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