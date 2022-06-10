import Head from "next/head";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type PropTypes = { children: React.ReactNode };

// TODO replace classnames with modular scss
const Layout = ({ children }: PropTypes) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="grow">
      <Container>{children}</Container>
    </div>
    <Footer />
  </div>
);

export default Layout;
