import { getAuthServer } from '@/lib/helpers/getAuthServer';

import { Sidebar } from './layouts/sidebar';

export const SidebarServer = async () => {
  const user = await getAuthServer();

  return <Sidebar user={user} />;
};
