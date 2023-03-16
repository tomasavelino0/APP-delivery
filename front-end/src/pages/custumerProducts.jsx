import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navBar';
import { useProduct } from '../context/productContext';
import { requestGetAllProducts } from '../helpers/endPointsApi';
import ProductList from '../components/productList';
import '../style/customerProducts.css';

function Products() {
  const { total, products, setProducts } = useProduct();

  const getAllProducts = useCallback(
    async () => {
      const result = await requestGetAllProducts();
      const allProductsWithQuantity = result.map((product) => {
        product.quantity = 0;
        return product;
      });
      setProducts(allProductsWithQuantity);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const history = useHistory();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className="container-products">
      <Navbar
        pageType="products"
      />
      <h1>Produtos</h1>

      {products && <ProductList products={ products } />}

      <button
        type="button"
        disabled={ total === 0 || total === '0,00' }
        data-testid="customer_products__button-cart"
        className="total-button"
        onClick={ () => {
          localStorage.setItem('cart', JSON.stringify(products
            .filter((product) => product.quantity > 0)));
          history.push('/customer/checkout');
        } }
      >
        <span
          className="total-button"
          data-testid="customer_products__checkout-bottom-value"
        >
          { `Ver Carrinho: RS ${products && total}` }
        </span>

      </button>
    </div>
  );
}

export default Products;
