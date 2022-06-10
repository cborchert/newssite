import styles from "./Container.module.scss";
type PropTypes = { children: React.ReactNode };

const Container = ({ children }: PropTypes) => (
  <div className={styles.Container}>{children}</div>
);

export default Container;
