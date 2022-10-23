import axios from 'axios';
import { MANGADEX_ENDPOINTS, MANGADEX_URLS, Chapter } from '../util/constants';
import { getChapterFilters } from './filters';

type ChapterResult = {
  data: Chapter[]
}

export const fetchChapters = async(mangaId: string) => {
  const endpoint =  MANGADEX_URLS.BASE_URL + MANGADEX_ENDPOINTS.MANGA +
                    '/' + mangaId + MANGADEX_ENDPOINTS.FEED;

  const params = getChapterFilters()

  return axios<ChapterResult>({
    method: 'GET',
    url: endpoint,
    params,
  }).then(({ data }) => {
    let datas = data.data;
    datas.sort((a,b) => parseInt(a.attributes.chapter) > parseInt(b.attributes.chapter) ? 1 : -1)
    
    console.log(datas);
    return datas;
  });
}