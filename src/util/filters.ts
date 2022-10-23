import { STORAGE } from "./constants";
import { getStorageArray } from "./helpers";

export const getMangaFilters = () => {
  return {
    includedTags: getStorageArray(STORAGE.INCLUDED_TAGS),
    excludedTags: getStorageArray(STORAGE.EXCLUDED_TAGS),
    includedTagsMode: 'OR',
    contentRating: getStorageArray(STORAGE.CONTENT_RATING),
    availableTranslatedLanguage:['en'],
    hasAvailableChapters: '1',
    includes:['artist'],
  }
}

export const getChapterFilters = () => {
  return {
    translatedLanguage: ['en'],
  }
}