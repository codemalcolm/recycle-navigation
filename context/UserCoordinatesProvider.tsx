"use client";
import { createContext, ReactNode, useContext } from "react";
import { Coordinates } from "@/types/global";


type UserCoordinatesProviderProps = {
  children: ReactNode | ReactNode[];
};

export const defaultCoordinates = null;

export const UserCoordinatesContext = createContext<null | Coordinates>(
  defaultCoordinates
);

export const UserCoordinatesProvider = ({
  children,
}: UserCoordinatesProviderProps) => {
  return (
    <UserCoordinatesContext.Provider value={defaultCoordinates}>
      {children}
    </UserCoordinatesContext.Provider>
  );
};

export const useUserCoordinates = () => useContext(UserCoordinatesContext);
