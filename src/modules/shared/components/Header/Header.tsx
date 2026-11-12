import { Link, NavLink } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import styles from './Header.module.scss';
import { useAppContext } from '@context/AppContext';
import { Counter } from './components/Counter';
import { Search } from './components/Search';

const getActiveClass = (isActive: boolean) => {
  return `${styles.icon} ${isActive ? styles.activeIcon : ''}`;
};

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export const Header = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { favoritesIds, cartIds } = useAppContext();

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/">
            <img
              className={styles.logo}
              src="img/logo/logo.svg"
              alt="Company Logo"
            />
          </Link>

          <HeaderNav />
        </div>

        <Search />

        <div className={styles.right}>
          <NavLink
            className={({ isActive }) => {
              return `${styles.favorites} ${getActiveClass(isActive)}`;
            }}
            to={'/favorites'}
            aria-label="Favorites"
          >
            <img src="icons/favorites.svg" alt="Favorites" />
            {favoritesIds.length > 0 && <Counter count={favoritesIds.length} />}
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return `${styles.cart} ${getActiveClass(isActive)}`;
            }}
            to={'/cart'}
            aria-label="Cart"
          >
            <img src="icons/cart.svg" alt="Cart" />
            {cartIds.length > 0 && <Counter count={cartIds.length} />}
          </NavLink>
          <button
            type="button"
            className={styles.burgerBtn}
            onClick={handleClick}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={isMenuOpen ? 'icons/close.svg' : 'icons/menu.svg'}
              alt="Menu"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
