import CartItemCtrl from '../controllers/cartItem';
import ProductCtrl from '../controllers/product';

const routes = (app) => {
  app.route('/cart_item')
    .post(CartItemCtrl.create)
    .get(CartItemCtrl.list);
  app.route('/product')
    .post(ProductCtrl.create)
    .get(ProductCtrl.list);
};

export default routes;
