import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import women1 from "../../../assets/women-1.svg";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { userModel } from "../../../entities/employee";
import { AppDispatch } from "../../../state/store";
import { WithSkeleton } from "../../ui/WithSkeleton";

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(userModel.actions.getUserById(null));
  }, [dispatch]);

  const userState = useSelector(
    (state: { user: userModel.slices.UserState }) => state.user
  );

  return (
    <header className={styles.header}>
      <div className={styles.cabinet}>
        <WithSkeleton
          isLoading={userState.isLoading}
          isEmpty={userState.entity === null}
        >
          {userState.entity && (
            <a href="/_wt/cabinet" className={styles.mainMenu__userLink}>
              <div
                className={styles.user_photo}
                style={{
                  backgroundImage: `url(${userState.entity.data.avatar})`,
                }}
              />
              <div className={styles.mainMenu__userName}>
                {userState.entity.data.fullname}
              </div>
            </a>
          )}
        </WithSkeleton>
      </div>
      <div className={styles.banner}>
        <Link to="/">
          <img src={logo} alt="Комус Карьера" className={styles.logo} />
        </Link>
        <img src={women1} alt="Сотрудник" className={styles.women1} />
      </div>
    </header>
  );
};
