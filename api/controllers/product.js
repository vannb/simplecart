import ProductServices from '../services/product';

const create = (req, res, next) => {
  ProductServices.create(req.body)
    .then(result => res.json(result))
    .catch(next);
};

const list = (req, res, next) => {
  ProductServices.list()
    .then(result => res.json(result))
    .catch(next);
};

export default {
  create,
  list,
};
