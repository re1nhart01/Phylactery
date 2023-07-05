import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { CargoStructure, ReturnableCargoStructure } from '#type/cargo';

type INativeState = {
  errorCode: string;
};
export const useNative = () => {
  const [state, setState] = useState<INativeState>({
    errorCode: '',
  });
  const call = async <T extends keyof CargoStructure>(
    name: T,
    args: CargoStructure[T],
  ) => {
    try {
      await invoke(name, args);
    } catch (e) {
      console.warn('useNative call error:', e);
      setState((prev) => ({ ...prev, errorCode: e?.toString() || '' }));
    }
  };

  const retrieve = async <T extends keyof CargoStructure>(
    name: T,
    args: CargoStructure[T],
  ): Promise<ReturnableCargoStructure[T] | null> => {
    try {
      return await invoke(name, args);
    } catch (e) {
      console.warn('useNative call error:', e);
      setState((prev) => ({ ...prev, errorCode: e?.toString() || '' }));
      return null;
    }
  };

  return {
    call,
    retrieve,
    errorCode: state.errorCode,
  };
};
