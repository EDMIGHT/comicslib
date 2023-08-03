import { useAppSelector } from './reduxHooks';

export const useAuth = () => useAppSelector((state) => state.auth);
