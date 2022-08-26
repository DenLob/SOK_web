import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const fetchPhotos = async () => {
    const {data} = await $authHost.get('api/photo/list_photos/')
    return data
}

export const fetchOnePhoto = async (id) => {
    const {data} = await $authHost.get('api/photo/' + id)
    return data
}

export const sendPhoto = async (photo) => {
    const  {data} = await $authHost.post('api/photo/upload/', photo)
}