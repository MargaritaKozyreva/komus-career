import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Footer.module.scss";

interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
    </footer>
  );
};
