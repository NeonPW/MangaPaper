import { ref } from 'vue';
import { fetchMangas } from '../util/mangas';

export const useMangas = () => {
  const totalManga = ref(0);

  const getMangaRandom = async () => {
    const options = {
      limit: 1,
      random: true,
      total: totalManga.value ?? 0,
    }

    try {
      const manga = await fetchMangas(options);
      console.log('ASDFASDFASDF');
      console.log(manga);
      totalManga.value = manga.totalResults;
      return manga;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    totalManga,
    getMangaRandom,
  }
}