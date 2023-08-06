import { SITE_CONFIG } from '@/configs/site.configs';

export const isServer = typeof window === 'undefined';

export const createTitle = (title: string) => `${title} • ${SITE_CONFIG.name}`;