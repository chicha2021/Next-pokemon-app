import { Head } from "next/document";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <meta name="author" content="Ezequiel Hernandez" />
        <meta name="description" content="Información sobre el pokemón XXXX" />
        <meta name="keywords" content="XXXX, pokemon, pokedex" />
      </Head>

      {/* Navbar */}

      <main>{children}</main>
    </>
  );
};

export default Layout;
