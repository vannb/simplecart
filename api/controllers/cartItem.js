import CartItemServices from '../services/cartItem';

const create = (req, res, next) => {
  CartItemServices.create(req.body)
    .then(result => res.json(result))
    .catch(next);
};

const list = (req, res, next) => {
  CartItemServices.list(req.query)
    .then(result => res.json(result))
    .catch(next);
};

export default {
  create,
  list,
};
