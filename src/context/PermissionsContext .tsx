import { createContext } from 'react';
import { PermissionStatus } from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

type PermissionsContextProps = {
  permissions: PermissionsState;
  locationEnabled: boolean;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);
