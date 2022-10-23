import axios from 'axios';
import { getRandomItem } from './helpers';
import {
  MANGADEX_ENDPOINTS,
  MANGADEX_URLS,
  Manga
} from './constants';
import { getMangaFilters } from './filters';
import { fetchChapters } from './chapters';
import { fetchPages } from './pages';

export type MangaOptions = {
  limit: number;
  random: boolean;
  total: number;
};

type MangaResult = {
  data: Manga[];
  total: number;
}

export const fetchMangas = async (options: MangaOptions) => {
  const endpoint = MANGADEX_URLS.BASE_URL + MANGADEX_ENDPOINTS.MANGA;
  const { limit, random, total } = options;
  const params = getMangaFilters();

  const [manga] = await axios<MangaResult>({
    method: 'GET',
    url: endpoint,
    params:{
      ...params,
      limit: limit,
      offset: random ? Math.floor(Math.random() * Math.min(total, 9999)) : 0,
    }
  }).then(({ data }) => {
    options.total = data.total;
    return data.data;
  })

  const chapters = await fetchChapters(manga.id);
  const randomChapter = getRandomItem(chapters);
  const chapterPages = await fetchPages(randomChapter.item?.id);
  const randomPage = getRandomItem(chapterPages);

  return {
    ...manga,
    chapters,
    totalResults: options.total,
    startPage: randomPage.index,
    startChapter: randomChapter.index,
    pageCount: chapterPages?.length ?? 0,
    pages: chapterPages,
  }
}

