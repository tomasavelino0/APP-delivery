import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

function navBar({ pageType }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const renderRoleBasedElement = () => {
    switch (user.role) {
    case 'customer':
      return (
        <nav>
          <div
            className={ `${pageType === 'products' ? 'products productsChange' : null}` }
            style={ { marginRight: '30px' } }
          >
            <Link
              to="/customer/products"
              className={ `${pageType === 'products' ? 'link-1' : 'link-2'}` }
              data-testid="customer_products__element-navbar-link-products"
            >
              PRODUTOS
            </Link>
          </div>
          <div
            className={ `${pageType === 'orders' ? 'orders productsChange' : null}` }
          >
            <Link
              to="/customer/orders"
              className={ `${pageType === 'orders' ? 'link-1' : 'link-2'}` }
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS
            </Link>
          </div>
        </nav>
      );
    case 'administrator':
      return <span className="left-1">GERENCIAR USUÁRIOS</span>;
    case 'seller':
      return <span className="left-1">PEDIDOS</span>;
    default:
      return null;
    }
  };

  return (
    <nav>
      <div className="navbar_left">{renderRoleBasedElement()}</div>
      <div className="navbar_right">
        <span
          className="right-1"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { `${user.name}` }
        </span>
      </div>
      <div className="container-checkout">
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          className="right-2"
          onClick={ () => {
            localStorage.clear();
          } }
        >
          Sair

        </Link>
      </div>
    </nav>
  );
}

export default navBar;
