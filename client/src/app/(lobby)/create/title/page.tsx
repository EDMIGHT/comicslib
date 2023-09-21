import { Metadata } from 'next';

import { CreateComicForm } from '@/components/forms/create-comic-form';
import { PageHeader } from '@/components/page-header';
import { createTitle } from '@/lib/utils';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';
import { ThemesService } from '@/services/themes.service';

export const metadata: Metadata = {
  title: createTitle('Create Title'),
  description:
    'Welcome to the Create Title Page! Here you can contribute by uploading a new comic to the site. Share your creativity with the world!',
};

const Page = async ({}) => {
  const genres = await GenresService.getAll();
  const statuses = await StatusesService.getAll();
  const themes = await ThemesService.getAll();

  return (
    <div className='space-y-3'>
      <PageHeader>Create Title</PageHeader>
      <CreateComicForm statuses={statuses} genres={genres} themes={themes} />
    </div>
  );
};

export default Page;
