import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FoldersSortableList } from '@/components/folders-sortable-list';
import { PageHeader } from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { LIBRARY_PAGES_META } from '@/configs/meta.configs';
import { getAuthServer } from '@/lib/getAuthServer';
import { cn } from '@/lib/utils';
import { FoldersService } from '@/services/folders.service';

export const metadata: Metadata = {
  title: LIBRARY_PAGES_META.folders.title,
  description: LIBRARY_PAGES_META.folders.desc,
};

const Page = async () => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  const folders = await FoldersService.getAllUserFolders();

  const isMoreThanZeroFolder = folders.length > 0;

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Your folders</PageHeader>
      {isMoreThanZeroFolder && (
        <p className='pl-2 text-sm font-medium text-muted-foreground md:text-base'>
          You can change the order of folders by dragging them and saving the change using the
          &#34;Save changes&#34; button at the bottom of the list
        </p>
      )}
      <Link
        href={HREFS.create.folder}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'flex justify-center gap-2 border border-dashed border-border p-6 '
        )}
      >
        <Icons.add /> Create your own folder
      </Link>
      {isMoreThanZeroFolder && <FoldersSortableList folders={folders} />}
    </div>
  );
};

export default Page;
