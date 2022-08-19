// import { useRouter } from 'next/router';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import area from '../../area.json';

type MeterContextType = {
  facultyIndex: number;
  buildingIndex: number;
  floorIndex: number;
  facultyMeterId: number;
  buildingMeterId: number;
  floorMeterId: number;
  setFacultyIndex: React.Dispatch<React.SetStateAction<number>>;
  setBuildingIndex: React.Dispatch<React.SetStateAction<number>>;
  setFloorIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const MeterContext = createContext<MeterContextType>(
  {} as MeterContextType
);

export function MeterProvider({ children }: React.PropsWithChildren<{}>) {
  const [facultyIndex, setFacultyIndex] = useState(-1);
  const [buildingIndex, setBuildingIndex] = useState(-1);
  const [floorIndex, setFloorIndex] = useState(-1);

  const facultyMeterId = useMemo(
    () => area.fakultas[facultyIndex]?.value ?? -1,
    [facultyIndex]
  );
  const buildingMeterId = useMemo(
    () => area.fakultas[facultyIndex]?.gedung[buildingIndex]?.value ?? -1,
    [facultyIndex, buildingIndex]
  );
  const floorMeterId = useMemo(
    () =>
      area.fakultas[facultyIndex]?.gedung[buildingIndex]?.lantai[floorIndex]
        ?.value ?? -1,
    [facultyIndex, buildingIndex, floorIndex]
  );

  // const router = useRouter();

  // Reset after navigation
  // useEffect(() => {
  //     setFacultyIndex(-1);
  //     setBuildingIndex(-1);
  //     setFloorIndex(-1);
  // }, [router.pathname]);

  return (
    <MeterContext.Provider
      value={{
        facultyIndex,
        buildingIndex,
        floorIndex,
        facultyMeterId,
        buildingMeterId,
        floorMeterId,
        setFacultyIndex,
        setBuildingIndex,
        setFloorIndex,
      }}
    >
      {children}
    </MeterContext.Provider>
  );
}
