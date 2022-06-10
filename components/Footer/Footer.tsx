import {
  siteCopyrightStartYear,
  siteCopyrightName,
  siteDisplayCopyright,
} from "../../lib/constants/site";
import Container from "../Container/Container";

const Footer = () => {
  if (!siteDisplayCopyright) return null;
  const currentYear = new Date().getFullYear().toString();
  const copyright =
    siteCopyrightStartYear === currentYear
      ? siteCopyrightStartYear
      : `${siteCopyrightStartYear} - ${currentYear}`;

  return (
    <Container>
      &copy; {siteCopyrightName} {copyright}
    </Container>
  );
};

export default Footer;
