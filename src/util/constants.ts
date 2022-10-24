export const MANGADEX_URLS = {
  BASE_URL: 'https://api.mangadex.org',
  IMAGE_CDN: 'https://api.mangadex.org/at-home/server/',
}

export const MANGADEX_ENDPOINTS = {
  MANGA: '/manga',
  TAG: '/manga/tag',
  FEED: '/feed',
}

export const STORAGE = {
  ALL_TAGS: 'allTags',
  INCLUDED_TAGS: 'includedTags',
  EXCLUDED_TAGS: 'excludedTags',
  FIRST_RUN: 'first-runasdfasdf',
  CONTENT_RATING: 'contentRating',
  LANGUAGES: 'languages',
}


//TODO: Add more, or figure out a good way to filter these without having zero results
export const LANGUAGES = [
  'en',
  'ja',
  'ko',
  'zh',
  'es',
  'de',
];

export const LANGUAGE_NAMES = {
  ['en']: 'English',
  ['ja']: 'Japanese',
  ['ko']: 'Korean',
  ['zh']: 'Chinese',
  ['es']: 'Spanish',
  ['de']: 'German',
}

export enum CONTENT_RATINGS {
  "safe",
  "suggestive",
  "erotica",
}


export type Manga = {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: MangaRelationship[];
  totalResults: number;
  chapters?: Chapter[];
  startPage?: number;
  startChapter?: number;
  pageCount?: number;
  pages?: string[];
}

export type MangaAttributes = {
  altTitles: Array<{[key:string]: string}>;
  availableTranslatedLanguages: Array<string>;
  chapterNumbersResetOnNewVolume: boolean;
  contentRating: CONTENT_RATINGS;
  description: MangaDescription;
  isLocked: boolean;
  lastChapter: string;
  lastVolume: string;
  latestUploadedChapter: string;
  links: Object;
  originalLanguage: string;
  publicationDemographic: string;
  state: string;
  status: string;
  tags: Tag[];
  title: MangaTitle;
  updatedAt: string;
  version: number;
  year: number;
}

export type Chapter = {
  id: string;
  type: string;
  attributes: ChapterAttributes;
  relationships: ChapterRelationship[];
}

export type ChapterAttributes = {
  chapter: string;
  createdAt: string;
  externalUrl: string | null;
  pages: number;
  title: string | null;
  translatedLanguage: string;
  version: number;
  volume: number | null;
  updatedAt: string;
  publishAt: string;
  readableAt: string;
}

export type ChapterRelationship = {
  id: string;
  type: string;
}

export type ChapterFeed = {
  baseUrl: string;
  chapter: ChapterFeedPages;
}

export type ChapterFeedPages = {
  hash: string;
  data: string[];
  dataSaver: string[];
}

export type MangaDescription = {
  en?: string;
}

export type MangaTitle = {
  [key: string]: string;
}

export type MangaRelationship = {
  id: string;
  type: string;
}

export type TagAttributes = {
  name: {
    en: string;
  }
  description: string[];
  group: string;
  version: Number;
}

export type Tag = {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: Array<string>;
}

export type MangaView = {
  manga: Manga;
  currentChapter: Chapter;
  currentPage: number;
  chapters: Chapter[];
}

