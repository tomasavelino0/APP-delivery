const roleValidator = (user) => {
  switch (user.role) {
  case 'administrator':
    return '/admin/manage';
  case 'seller':
    return '/seller/orders';
  default:
    return '/customer/products';
  }
};

const userRole = (userInfos) => {
  switch (userInfos.role) {
  case 'seller':
    return 'seller';
  case 'admin':
    return 'admin';
  default:
    return 'customer';
  }
};

export default { roleValidator, userRole };
