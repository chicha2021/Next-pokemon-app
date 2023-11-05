import Layout from "@/components/layouts/Layout";
import { GetStaticProps, NextPage } from "next";
import pokeApi from "@/api/pokeApi";
import { ListPokemon, PokemonListResponse } from "../interfaces/pokemon-list";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router';

interface Props {
  pokemons: ListPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  const router = useRouter();

  const onDetailPokemon = (id: string ) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Layout title="Pokemons Page">
      <Grid container spacing={2}>
        {pokemons.map((e: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={e.id} onClick={() => onDetailPokemon(e.id)} >
            <Card sx={{ maxWidth: 340 }}>
              <CardMedia
                sx={{ height: 10, padding: 20 }}
                image={e.image}
                title={e.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {e.name[0].toUpperCase() + e.name.substring(1)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Buy</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: ListPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
