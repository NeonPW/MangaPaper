import axios from 'axios';
import {MANGADEX_URLS, ChapterFeed } from '../util/constants';
import { buildImageUrl } from './helpers';

export const fetchPages = (chapterId: string) => {
  const endpoint = MANGADEX_URLS.IMAGE_CDN + chapterId;

  return axios<ChapterFeed>({
    method: 'GET',
    url: endpoint,
  }).then(({ data }) => {
    return data.chapter.dataSaver.map(chapterImage => {
      return buildImageUrl(data.baseUrl, data.chapter.hash, chapterImage);
    });
  });
}