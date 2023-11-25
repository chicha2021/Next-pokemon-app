import pokeApi from "@/api/pokeApi";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async (id: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
    return pokemon;
  } catch (error) {
    console.log("estoy");
    return null;
  }
};
