export interface PokemonListResponse {
    count:    number;
    next:     string;
    previous: string;
    results:  ListPokemon[];
}

export interface ListPokemon {
    name: string;
    url:  string;
    id: number;
    image: string;
}
