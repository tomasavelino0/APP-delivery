import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './productItemCard';
import '../style/productsList.css';

function ProductList({ products }) {
  return (
    <div className="products-list">
      {products.map((product) => <ProductItem product={ product } key={ product.id } />)}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  })).isRequired,
};

export default ProductList;
