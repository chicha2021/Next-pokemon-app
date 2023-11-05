import Head from "next/head";
import { ReactElement } from "react";
import { Navbar } from '../ui/Navbar';

interface PropsLayout {
  title?: string;
  children: ReactElement;
}

const Layout: React.FC<PropsLayout> = ({ children, title,}) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Ezequiel Hernandez" />
        <meta name="description" content="Información sobre el pokemón XXXX" />
        <meta name="keywords" content="XXXX, pokemon, pokedex" />
      </Head>

      <Navbar />
      <main style={{ padding: '0px 20px'}}>{children}</main>
    </>
  );
};

export default Layout;
