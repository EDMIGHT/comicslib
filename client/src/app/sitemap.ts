// access by http://localhost:3000/sitemap.xml

import { HREFS } from '@/configs/href.configs';
import { absoluteUrl } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';
import { ThemesService } from '@/services/themes.service';
import { UsersService } from '@/services/users.service';

export default async function sitemap() {
  const { comics } = await ComicsService.getAll({});

  const comicsRoutes = comics.map((comic) => ({
    url: absoluteUrl(`${HREFS.comics}/${comic.id}`),
    lastModified: new Date().toISOString(),
  }));

  const { users } = await UsersService.getAllUsers({});

  const usersRoutes = users.map((user) => ({
    url: absoluteUrl(`${HREFS.profile}/${user.login}`),
    lastModified: new Date().toISOString(),
  }));

  const genres = await GenresService.getAll();

  const genresRoutes = genres.map((genre) => ({
    url: absoluteUrl(`${HREFS.comicAttributes.genre}/${genre.title}`),
    lastModified: new Date().toISOString(),
  }));

  const themes = await ThemesService.getAll();

  const themesRoutes = themes.map((theme) => ({
    url: absoluteUrl(`${HREFS.comicAttributes.theme}/${theme.title}`),
    lastModified: new Date().toISOString(),
  }));

  const statuses = await StatusesService.getAll();

  const statusesRoutes = statuses.map((status) => ({
    url: absoluteUrl(`${HREFS.comicAttributes.status}/${status.name}`),
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    '',
    ...Object.values(HREFS.auth),
    ...Object.values(HREFS.community),
    ...Object.values(HREFS.infoPage),
    ...Object.values(HREFS.library),
    ...Object.values(HREFS.titles),
  ].map((route) => ({
    url: absoluteUrl(`${route}`),
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...comicsRoutes,
    ...usersRoutes,
    ...genresRoutes,
    ...themesRoutes,
    ...statusesRoutes,
  ];
}
