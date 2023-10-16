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

export type CharacterUI = {
    image: string,
    details: {
        name: CharacterDetails,
        species: CharacterDetails,
        type: CharacterDetails,
        originName: CharacterDetails,
        locationName: CharacterDetails
    }
}

export type CharacterDetails = {
    title: string,
    description: string
}

export const mapCharacterResponseToUI = (character: CharacterResponse): CharacterUI => ({
    image: character.image,
    details: {
        name: {
            title: "Name:",
            description: character.name
        },
        species: {
            title: "Species:",
            description: character.species
        },
        type: {
            title: "Type:",
            description: character.type
        },
        originName: {
            title: "Origin name:",
            description: character.origin.name
        },
        locationName: {
            title: "Location name:",
            description: character.location.name
        }
    }
})