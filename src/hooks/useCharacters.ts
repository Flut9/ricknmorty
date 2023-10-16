import { useMemo, useState, useCallback } from "react"

import { CharacterResponse } from "../types/CharactersResponse"

type ReturnType = {
    characters: CharacterResponse[],
    setCharacters: (characters: CharacterResponse[]) => void
}

export const useCharacters = (searchText: string): ReturnType => {
    const [initialCharacters, setInitialCharacters] = useState<CharacterResponse[]>([])

    const filteredCharacters = useMemo(() => {
        return initialCharacters.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    }, [searchText, initialCharacters])

    const updateInitialCharacters = useCallback((characters: CharacterResponse[]) => {
        setInitialCharacters(characters)
    }, [setInitialCharacters])

    return {
        characters: filteredCharacters,
        setCharacters: updateInitialCharacters
    }
}