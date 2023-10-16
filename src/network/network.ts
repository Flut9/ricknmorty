import axios from "axios"

export const network = axios.create({
    baseURL: "https://rickandmortyapi.com/api"
})