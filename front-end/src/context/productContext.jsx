import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);

  const handleCalculateTotal = useCallback(() => {
    if (products) {
      const currentTotal = products
        .reduce((totalPrice, currentProduct) => totalPrice
        + (+currentProduct.price * +currentProduct.quantity), 0);

      setTotal(currentTotal.toFixed(2).replace(/\./, ','));
    }
  }, [products]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal, products]);

  const contextValue = useMemo(() => ({
    products, setProducts, total, setTotal,
  }), [products, setProducts, total, setTotal]);

  return (
    <ProductContext.Provider value={ contextValue }>
      {children}
    </ProductContext.Provider>
  );
}

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useProduct() {
  const context = useContext(ProductContext);

  return context;
}
