import { Component } from 'react';
import {
  map, find, remove, reduce,
} from 'lodash';
import { Button } from 'reactstrap';
import Router from 'next/router';
import FetchUtils from '../utils/fetch';
import ProductRow from '../components/ProductRow';
import CartItemRow from '../components/CartItemRow';

export default class Add extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.loadProducts();
  }

  async loadProducts() {
    const res = await FetchUtils.get('product');
    const products = await res.json();
    this.setState({
      products,
    });
  }

  addToCart(productId, quantity = 1, reset = false) {
    const { products, cart } = this.state;
    let cartItem = find(cart, o => o.product.id === productId);

    if (!cartItem) {
      const product = find(products.rows, { id: productId });
      cartItem = { product, quantity: 0 };
      cart.push(cartItem);
    }
    cartItem.quantity = reset ? quantity : cartItem.quantity + quantity;
    if (cartItem.quantity <= 0) {
      remove(cart, cartItem);
    }
    this.forceUpdate();
  }

  async submit(cart) {
    const res = await FetchUtils.post('cart_item', map(cart,
      cartItem => ({ productId: cartItem.product.id, quantity: cartItem.quantity })));
    if (res.status === 200) {
      Router.replace('/list');
    }
  }

  render() {
    const { products, cart } = this.state;
    const { submit } = this;
    return (
      <div className="container">
        {products
          ? <>
            <h1>Product list</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {map(
                  products.rows,
                  product => (<ProductRow key={product.id} addToCart={this.addToCart} product={product} />),
                )}
              </tbody>
            </table>
          </>
          : <p>Product list is empty </p>}{cart.length
          ? <>
            <h1>Cart</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {map(cart, item => (<CartItemRow key={item.product.id} addToCart={this.addToCart} item={item} />))}
              </tbody>
            </table>
            <p style={{ textAlign: 'right' }}><strong>Total amount: {reduce(cart, (total, item) => total + item.product.price * item.quantity, 0)}</strong></p>
            <Button style={{ float: 'right' }} onClick={() => submit(cart)} color="success">Submit</Button>
          </>
          : <h1>Cart is empty</h1>}
      </div>
    );
  }
}
