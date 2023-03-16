import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useProduct } from '../context/productContext';
import '../style/productsList.css';

function ProductItem({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { products, setProducts } = useProduct();

  const handleProductQuantityChange = useCallback(
    () => {
      const newProduct = products.find((item) => item.id === product.id);
      newProduct.quantity = quantity;
      setProducts([...products]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.id, product.name, product.price, products, quantity, setProducts],
  );

  useEffect(() => {
    if (quantity !== 0) {
      handleProductQuantityChange();
    }
  }, [quantity]);

  const formatPrice = (price) => price.replace(/\./, ',');

  const decreaseQuantity = () => {
    if (quantity !== 0) { setQuantity(Number(quantity) - 1); }
  };

  const increaseQuantity = () => {
    setQuantity(Number(quantity) + 1);
  };

  return (
    <div className="container-itemCard">
      <div className="container-price">
        <span
          data-testid={ `customer_products__element-card-price-${product.id}` }
          className="product-price"
        >
          {`R$: ${formatPrice(product.price)}`}
        </span>
      </div>

      <img
        src={ product.urlImage }
        alt={ product.name }
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />

      <span
        data-testid={ `customer_products__element-card-title-${product.id}` }
        className="product-name"
      >
        {product.name}

      </span>

      <div className="quantity-buttons">
        <button
          className="buttonsAddRm"
          type="button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          onClick={ increaseQuantity }
        >
          +
        </button>

        <input
          className="input-price"
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
          value={ quantity }
          onChange={ (event) => {
            setQuantity(event.target.value);
          } }
        />

        <button
          className="buttonsAddRm"
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          onClick={ decreaseQuantity }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
