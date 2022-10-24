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

  const randomOffset = random ? Math.floor(Math.random() * Math.min(total, 9999)) : 0;

  let probablyBadRequest = false;

  const [manga] = await axios<MangaResult>({
    method: 'GET',
    url: endpoint,
    params:{
      ...params,
      limit: limit,
      offset: randomOffset,
    }
  }).then(({ data }) => {
    if (randomOffset > data.total){
      probablyBadRequest = true;
    }
    options.total = data.total;
    return data.data;
  })

  let chapters = undefined;
  let randomChapter = null;
  let chapterPages = null;
  let randomPage = null;

  if (!probablyBadRequest){
    chapters = await fetchChapters(manga.id);
    randomChapter = getRandomItem(chapters);
    chapterPages = await fetchPages(randomChapter.item?.id);
    randomPage = getRandomItem(chapterPages);
  }

  return {
    ...manga,
    chapters,
    totalResults: options.total,
    startPage: randomPage?.index ?? 0,
    startChapter: randomChapter?.index ?? 0,
    pageCount: chapterPages?.length ?? 0,
    pages: chapterPages ?? [],
  }
}

