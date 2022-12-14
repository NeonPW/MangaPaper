import axios from 'axios';
import { ref } from 'vue';
import { Tag } from '../util/constants';
import { MANGADEX_ENDPOINTS, MANGADEX_URLS } from '../util/constants';

type TagResult = {
  data: Tag[];
}

export const useTags = () => {
  const endpoint = MANGADEX_URLS.BASE_URL + MANGADEX_ENDPOINTS.TAG;
  const tags = ref([] as Tag[]);

  axios.get<TagResult>(endpoint).then(({data}) => {
    let datas = data.data;
    datas.sort((a,b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
    tags.value = datas;
  }).catch((err) => {
    console.log(err);
  })

  return {
    tags,
  }

}