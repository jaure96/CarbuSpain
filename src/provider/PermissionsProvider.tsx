import React, { memo, useEffect, useState } from 'react';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { AppState, Platform } from 'react-native';
import {
  PermissionsContext,
  PermissionsState,
} from '../context/PermissionsContext ';

type Props = {
  children: React.ReactNode;
};

const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

const PermissionsProvider = memo(({ children }: Props) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    checkLocationPermissions();
    AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermissions();
    });
  }, []);

  const askLocationPermissions = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
    }
    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  const checkLocationPermissions = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermissions,
        checkLocationPermissions,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
});

export default PermissionsProvider;
