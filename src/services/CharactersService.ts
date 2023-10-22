import { network } from "../network/network"

import { CharactersResponse, CharacterResponse } from "../types/CharactersResponse"

export default class CharactersService {
    static async getCharacters(page: number) {
        return await network.get<CharactersResponse>("/character", {
            params: {
                page
            }
        })
    }

    static async getCharacter(id: number) {
        return await network.get<CharacterResponse>(`/character/${id}`)
    }
}