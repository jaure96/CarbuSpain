import React, { memo, useCallback, useEffect, useState } from 'react';
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
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

type Props = {
  children: React.ReactNode;
};

const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

const PermissionsProvider = memo(({ children }: Props) => {
  const [permissions, setPermissions] = useState(permissionInitState);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    checkLocationPermissions();
    askLocationEnabler();
    AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermissions();
      askLocationEnabler();
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

  const askLocationEnabler = useCallback(() => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(() => {
          setLocationEnabled(true);
        })
        .catch(() => {
          setLocationEnabled(false);
        });
    }
  }, [locationEnabled]);

  const checkLocationPermissions = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    console.log(permissionStatus);
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  useEffect(() => {
    if (!locationEnabled) {
      askLocationEnabler();
    }
    if (permissions.locationStatus !== 'granted') {
      askLocationPermissions();
    }
  }, [permissions, locationEnabled]);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        locationEnabled,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
});

export default PermissionsProvider;
