import { Link } from 'react-router-dom';
import { useAppContext } from '@context/AppContext';
import { Product } from '@type/Product';
import { toggleArrayIds } from '@utils/toggleArrayIds';
import styles from './ProductCard.module.scss';
import cn from 'classnames';

type Props = {
  product: Product;
  isOldPriceVisible?: boolean;
};

export const ProductCard = ({ product, isOldPriceVisible }: Props) => {
  const { favoritesIds, cartIds, setFavoritesIds, setCartIds } =
    useAppContext();

  const toggleFavorites = (id: number) => {
    setFavoritesIds(toggleArrayIds(favoritesIds, id));
  };

  const toggleAddButton = (id: number) => {
    setCartIds(toggleArrayIds(cartIds, id));
  };

  return (
    <div className={styles.phoneCard}>
      <Link
        to={`/product/${product.category}/${product.id}`}
        className={styles.imgContainer}
      >
        <img
          className={styles.img}
          src={`${product.image}`}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <Link
        className={styles.linkTitleContainer}
        to={`/product/${product.category}/${product.id}`}
      >
        <h3 className={styles.cardTitle}>{product.name}</h3>
      </Link>
      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>
        {isOldPriceVisible && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
        )}
      </div>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Screen</p>
          <p className={styles.specDescription}>{product.screen}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>Capacity</p>
          <p className={styles.specDescription}>{product.capacity}</p>
        </div>
        <div className={styles.spec}>
          <p className={styles.specTitle}>RAM</p>
          <p className={styles.specDescription}>{product.ram}</p>
        </div>
        <div className={styles.cardButtons}>
          <button
            onClick={() => toggleAddButton(product.id)}
            className={cn(styles.addBtn, {
              [styles.isActive]: cartIds.includes(product.id),
            })}
          >
            {cartIds.includes(product.id) ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            onClick={() => toggleFavorites(product.id)}
            className={styles.favoritesBtn}
            aria-label={
              favoritesIds.includes(product.id)
                ? 'Remove from favorites'
                : 'Add to favorites'
            }
          >
            <img
              className={styles.favorites}
              src={
                favoritesIds.includes(product.id)
                  ? 'icons/favorites-filled.svg'
                  : 'icons/favorites.svg'
              }
              alt="favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
