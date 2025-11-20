"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Coordinates } from "@/types/global";

type UserCoordinatesProviderProps = {
  children: ReactNode | ReactNode[];
};

type CoordinatesContextType = [
  null | Coordinates,
  (coordinates: null | Coordinates) => void // setter function type (setCoordinates)
];

export const UserCoordinatesContext = createContext<CoordinatesContextType>([
  null, //  coordinates value
  () => {}, //  setter function
]);

export const UserCoordinatesProvider = ({
  children,
}: UserCoordinatesProviderProps) => {
  const [contextCoordinates, setContextCoordinates] = useState<null | Coordinates>(null);
  const contextValue: CoordinatesContextType = [contextCoordinates, setContextCoordinates];
  return (
    <UserCoordinatesContext.Provider value={contextValue}>
      {children}
    </UserCoordinatesContext.Provider>
  );
};

export const useUserCoordinates = () => useContext(UserCoordinatesContext);
