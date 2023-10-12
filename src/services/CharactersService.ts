import axios from "axios"

import { CharactersResponse, CharacterResponse } from "../types/CharactersResponse"

export default class CharactersService {
    static async getCharacters(page: number) {
        try {
            return await axios.get<CharactersResponse>("https://rickandmortyapi.com/api/character", {
                params: {
                    page
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getCharacter(id: number) {
        try {
            return await axios.get<CharacterResponse>(`https://rickandmortyapi.com/api/character/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}