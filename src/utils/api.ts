import { Accessory } from '@type/Accessory';
import { Phone } from '@type/Phone';
import { Product } from '@type/Product';
import { Tablet } from '@type/Tablet';

export const getPhones = (): Promise<Phone[]> => {
  return fetch('api/phones.json').then(data => data.json());
};

export const getProducts = (): Promise<Product[]> => {
  return fetch('api/products.json').then(data => data.json());
};

export const getTablets = (): Promise<Tablet[]> => {
  return fetch('api/tablets.json').then(data => data.json());
};

export const getAccessories = (): Promise<Accessory[]> => {
  return fetch('api/accessories.json').then(data => data.json());
};

export const getNewModels = (category: string, currentProducts: Product[]) => {
  const newProducts = currentProducts.filter(
    product => product.category === category,
  );

  newProducts.sort((product1: Product, product2: Product) => {
    return Number(product2.year) - Number(product1.year);
  });

  if (!newProducts.length) {
    return [];
  }

  const currentYear = Number(newProducts[0].year);

  return newProducts.filter(
    newProduct => Number(newProduct.year) === currentYear,
  );
};
