import pokeApi from "@/api/pokeApi";
import Layout from "@/components/layouts/Layout";
import { Pokemon } from "@/interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "@/utils/getPokemonInfo";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  console.log(pokemon);
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;
  };

  return (
    <Layout title="Detalle del pokemon">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 340 }}>
            <CardMedia
              sx={{ height: 10, padding: 20 }}
              image={pokemon.sprites.other?.dream_world.front_default}
              title={pokemon.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={8}>
          <Card sx={{ maxWidth: 700 }}>
            <CardContent>
              <Grid
                container
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                </Typography>
                <CardActions>
                  <Button size="small" onClick={onToggleFavorite}>
                    {isInFavorites
                      ? "Eliminar favorito"
                      : "Guardar en favoritos"}
                  </Button>
                </CardActions>
              </Grid>
              <Typography gutterBottom variant="h6" component="div">
                Sprites:
              </Typography>
              <Grid
                container
                spacing={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Grid item lg={2}>
                  <CardMedia
                    sx={{ height: 5, padding: 10 }}
                    image={pokemon.sprites.front_default}
                    title={pokemon.name}
                  />
                </Grid>
                <Grid item lg={2}>
                  <CardMedia
                    sx={{ height: 5, padding: 10 }}
                    image={pokemon.sprites.back_shiny}
                    title={pokemon.name}
                  />
                </Grid>
                <Grid item lg={2}>
                  <CardMedia
                    sx={{ height: 5, padding: 10 }}
                    image={pokemon.sprites.front_shiny}
                    title={pokemon.name}
                  />
                </Grid>
                <Grid item lg={2}>
                  <CardMedia
                    sx={{ height: 5, padding: 10 }}
                    image={pokemon.sprites.back_default}
                    title={pokemon.name}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((e, index) => String(index + 1));

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: "blocking",
    // fallback: false,
    // el fallback permite bloquear el ingreso a otros paths que no hayan sido creados por el getStaticPaths, hasta ahora
    // solo podemos ingresar a los primeros 3 pokemons, si entramos con el id 4 va a dar error porque esta en false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo( id );
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, //se revalidará la pagina al dia siguiente a las 24hs (86400seconds) para verificar si hay contenido nuevo y regenerarlo
  };
};

export default PokemonPage;
