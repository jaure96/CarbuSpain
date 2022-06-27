import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import Location from '../types/Location';

const useLocation = () => {
  const watchId = useRef<number>();
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        if (!isMounted.current) {
          return;
        }
        setInitialPosition(location);
        setUserLocation(location);
        setRouteLines((routes) => [...routes, location]);
        setHasLocation(true);
      })
      .catch(() => {
        setHasLocation(false);
      });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => reject({ err }),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) {
          return;
        }
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines((routes) => [...routes, location]);
      },
      (err) => console.log({ err }),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    initialPosition,
    userLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};

export default useLocation;
