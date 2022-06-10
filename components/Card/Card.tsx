import styles from "./Card.module.scss";

type PropTypes = {
  children?: React.ReactNode;
};

const Card = ({ children }: PropTypes) => (
  <div className={styles.Card}>{children}</div>
);

export default Card;
