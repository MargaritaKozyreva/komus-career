import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
} from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useDispatch } from "react-redux";

import cn from "classnames";
import styles from "./Layout.module.scss";
import { useLocation } from "react-router";
import { userModel } from "../../../entities/employee";
import { AppDispatch } from "../../../state/store";

export interface LayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children, className, ...attr } = props;
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userModel.actions.getUserById(null));
  }, [dispatch]);

  return (
    <div>
      <div className={cn(styles.root, className)}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <div className={styles.page}>
          <Component {...props} />
        </div>
      </Layout>
    );
  };
};
