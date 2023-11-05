import { CSSProperties } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import NextLink from "next/link";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});

const cssStyles: CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  padding: "0px 20px",
};

export const Navbar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={cssStyles}>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="Icono App"
          width={70}
          height={70}
        />
        <NextLink href={"/"}>
          <span color="secondary">Pokemon API</span>
        </NextLink>
        <NextLink href={"/favorites"}>
          <span style={{ marginLeft: "30px" }}>Favoritos</span>
        </NextLink>
      </div>
    </ThemeProvider>
  );
};
