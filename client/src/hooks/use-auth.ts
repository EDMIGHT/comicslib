import { useAppSelector } from '@/hooks/redux-hooks';

export const useAuth = () => useAppSelector((state) => state.auth);
