import Product from '../models/product';

const create = params => Product.create(params);

const list = () => Product.findAndCountAll();

export default {
  list,
  create,
};
