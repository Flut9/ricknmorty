import { useMemo, useState, useCallback } from "react"

import { CharacterResponse } from "../types/CharactersResponse"

export const useCharacters = (searchText: string): [CharacterResponse[], (characters: CharacterResponse[]) => void] => {
    const [initialCharacters, setInitialCharacters] = useState<CharacterResponse[]>([])

    const filteredCharacters = useMemo(() => {
        return initialCharacters.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    }, [searchText, initialCharacters])

    const updateInitialCharacters = useCallback((characters: CharacterResponse[]) => {
        setInitialCharacters(characters)
    }, [setInitialCharacters])

    return [filteredCharacters, updateInitialCharacters]
}