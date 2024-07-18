import { KEY_FLICKR } from "../constants/config";
import api from "../provider/axios";

export async function getAllPhotos() {
  return await api
    .get(`/services/feeds/photos_public.gne?format=json`)
    .then((res) => res.data)
    .catch((error: any) => error);
}

export async function searchAllPhotos(text: string) {
  return await api
    .get(
      `/services/rest/?method=flickr.photos.search&api_key=${KEY_FLICKR}&text=${text}&format=json&nojsoncallback=true`
    )
    .then((res) => res.data)
    .catch((error: any) => error);
}
