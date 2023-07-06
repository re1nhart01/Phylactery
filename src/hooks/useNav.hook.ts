import { AppropriateNavigationRoutes } from '#type/nav';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

export const useNav = <Prop extends { [key: string]: string }>(
  onLocation: null | Function = null,
) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useLoaderData();
  const location = useLocation();
  const currentLocation = useMemo(() => navigation.location, [navigation]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const tNavigate = <T extends keyof AppropriateNavigationRoutes>(
    route: T,
    args: AppropriateNavigationRoutes[T],
    replace: boolean = false,
  ) => {
    navigate(route, {
      state: args,
      replace,
    });
  };

  useEffect(() => {
    if (onLocation) {
      onLocation?.();
    }
  }, [location, onLocation]);

  return {
    goBack,
    tNavigate,
    currentLocation,
    __location: location,
    data: data as Prop,
  };
};
