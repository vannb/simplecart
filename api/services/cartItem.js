import { reduce, map, find } from 'lodash';
import Cart from '../models/cartItem';
import Product from '../models/product';

const create = async (params) => {
  const cartItems = reduce(params, (result, item) => {
    if (item.productId && item.quantity) {
      return [...result, { productId: item.productId, quantity: item.quantity }];
    }
    return result;
  }, []);
  const products = await Product.findAndCountAll({ where: { id: map(cartItems, 'productId') } });
  const models = reduce(cartItems, (result, item) => {
    const product = find(products.rows, o => o.id === item.productId);
    if (product) {
      return [
        ...result,
        {
          ...item,
          name: product.name,
          price: product.price,
          totalPrice: product.price * item.quantity,
        },
      ];
    }
    return result;
  }, []);
  return Cart.bulkCreate(models);
};

const list = (queryParams) => {
  const fields = ['name', 'price', 'totalPrice', 'createdAt', 'quantity'];
  const sortBy = find(fields, field => field === queryParams.sortBy) || 'createdAt';
  const order = find(['DESC', 'ASC'], field => field === queryParams.order) || 'DESC';
  return Cart.findAndCountAll({ order: [[sortBy, order]] });
};

export default {
  list,
  create,
};
