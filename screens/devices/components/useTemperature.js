import { useContext } from 'react';
import { DeviceContext } from '../../../states/device/DeviceContext';

export const useTemperature = () => {
  const { selectedTemp, setSelectedTemp } = useContext(DeviceContext);

  return {
    selectedTemp,
    setSelectedTemp,
  };
};