import { useMemo, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

import { CharacterResponse } from "../types/CharactersResponse"
import CharactersService from "../services/CharactersService"

type ReturnType = {
    characters?: CharacterResponse[],
    isLoading: boolean,
    isFetching: boolean,
    fetchNextPage: () => void
}

export const useCharacters = (searchText: string): ReturnType => {
    const {
        data, 
        isLoading, 
        fetchNextPage,
        isFetching
    } = useInfiniteQuery<CharacterResponse[]>({
        queryKey: ["character"],
        queryFn: ({ pageParam }) => fetchCharacters(pageParam),
        initialPageParam: 1,
        getNextPageParam: (_, allPages) => {
            return allPages.length + 1
        },
        maxPages: 42
    })

    const fetchCharacters = useCallback(async (page: number) => {
        const response = await CharactersService.getCharacters(page)
        return response.data.results
    }, [])

    const filteredCharacters = useMemo(() => {
        return data?.pages.flat().filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    }, [searchText, data])

    return {
        characters: filteredCharacters,
        isLoading, 
        isFetching,
        fetchNextPage
    }
}