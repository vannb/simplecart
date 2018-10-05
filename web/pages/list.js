import { Component } from 'react';
import {
  map,
} from 'lodash';
import {
  Input, Col, Row, Form, FormGroup, Label,
} from 'reactstrap';
import qs from 'qs';
import FetchUtils from '../utils/fetch';
import CartItemDetail from '../components/CartItemDetail';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      query: { order: 'DESC', sortBy: 'createdAt' },
    };
    this.changeOrder = this.changeOrder.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
  }


  componentDidMount() {
    this.loadCarts();
  }

  async loadCarts(queryParams) {
    const { query: queryState } = this.state;
    const query = queryParams || queryState;
    const res = await FetchUtils.get(`cart_item?${qs.stringify(query)}`);
    const cartItems = await res.json();
    this.setState({
      cartItems,
    });
  }

  changeOrder(order) {
    const { query } = this.state;
    query.order = order;
    this.loadCarts(query);
  }

  changeSortBy(sortBy) {
    const { query } = this.state;
    query.sortBy = sortBy;
    this.loadCarts(query);
  }

  render() {
    const { cartItems, query: { sortBy, order } } = this.state;
    const { changeOrder, changeSortBy } = this;
    return (
      <div className="container">
        {cartItems.count
          ? <>
            <h1>Cart item list</h1>
            <Form>
              <Row form="true">
                <Col md={3}>
                  <FormGroup>
                    <Label htmlFor="sort_by">Sort by</Label>
                    <Input defaultValue={sortBy} onChange={e => changeSortBy(e.target.value)} id="sort_by" type="select" name="sort_by" placeholder="Sort by">
                      <option value="name">Product name</option>
                      <option value="price">Price</option>
                      <option value="quantity">Quantity</option>
                      <option value="totalPrice">Total Price</option>
                      <option value="createdAt">Submit at</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Label htmlFor="order">Order</Label>
                  <Input defaultValue={order} onChange={e => changeOrder(e.target.value)} id="order" type="select" name="order" placeholder="order">
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                  </Input>
                </Col>
              </Row>
            </Form>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total price</th>
                  <th>Submit at</th>
                </tr>
              </thead>
              <tbody>
                {map(cartItems.rows, cartItem => (<CartItemDetail key={cartItem.id} cartItem={cartItem} />))}
              </tbody>
            </table>
          </>
          : <h1>No item yet</h1>}
      </div>
    );
  }
}
