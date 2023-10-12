export type CharactersResponse = {
    info: CharactersInfoResponse,
    results: CharacterResponse[]
}

export type CharactersInfoResponse = {
    count: number,
    pages: number,
    next?: string,
    prev?: string
}

export type CharacterResponse = {
    id: number,
    name: string,
    status: "Alive" | "Dead" | "unknown",
    species: string,
    type: string,
    gender: "Female" | "Male" | "Genderless" | "unknown",
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}