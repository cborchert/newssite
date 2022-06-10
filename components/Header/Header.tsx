import Link from "next/link";
import { siteName } from "../../lib/constants/site";
import Container from "../Container/Container";

import styles from "./Header.module.scss";

const Header = () => (
  <Container>
    <Link href="/">
      <a className={styles.Header}>{siteName}</a>
    </Link>
  </Container>
);

export default Header;
