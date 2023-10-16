import { network } from "../network/network"

import { CharactersResponse, CharacterResponse } from "../types/CharactersResponse"

export default class CharactersService {
    static async getCharacters(page: number) {
        try {
            return await network.get<CharactersResponse>("/character", {
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
            return await network.get<CharacterResponse>(`/character/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}