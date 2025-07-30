"use client";
import {createContext, useContext} from 'react';
import {useQuery} from '@tanstack/react-query';
import authService from '@/services/auth';
const UserContext = createContext({
    currentUser: null,
    isPending: true,
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const {data: currentUser, isPending} =  useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
  return (
    <UserContext.Provider value={{ currentUser, isPending }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}