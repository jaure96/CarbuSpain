import { useContext, useEffect } from 'react';
import { PermissionsContext } from '../context/PermissionsContext ';

const PermissionsScreen = () => {
  const { askLocationPermissions } = useContext(PermissionsContext);

  useEffect(() => {
    askLocationPermissions();
  }, []);

  return null;
};

export default PermissionsScreen;
