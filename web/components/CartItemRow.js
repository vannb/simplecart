import { Component } from 'react';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';


export default class CartItemRow extends Component {
  constructor() {
    super();
    this.state = {
      waitForInput: false,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  inputQuantityOnChange(e, productId) {
    const quantity = parseInt(e.target.value, 10);
    if (typeof quantity === 'number') {
      if (Number.isNaN(quantity) || quantity === 0) {
        this.setState({ waitForInput: true });
      } else if (quantity <= Number.MAX_SAFE_INTEGER) {
        this.changeQuantity(productId, quantity, true);
      }
    }
  }

  changeQuantity(productId, quantityParam, reset = false) {
    const { item: { quantity }, addToCart } = this.props;
    const quantityParamInt = parseInt(quantityParam, 10);
    const newQuantity = reset ? quantityParamInt : quantity + quantityParamInt;
    addToCart(productId, newQuantity, true);
    this.setState({ waitForInput: false });
  }

  render() {
    const { changeQuantity } = this;
    const { item: { product, quantity } } = this.props;
    const { waitForInput } = this.state;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td style={{ width: '200px' }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button outline color="primary" onClick={() => changeQuantity(product.id, -1)}>-</Button>
            </InputGroupAddon>
            <Input style={{ textAlign: 'center' }} onChange={e => this.inputQuantityOnChange(e, product.id)} value={waitForInput ? '' : quantity} />
            <InputGroupAddon addonType="append">
              <Button outline color="primary" onClick={() => changeQuantity(product.id, 1)}>+</Button>
            </InputGroupAddon>
          </InputGroup>
        </td>
        <td>{product.price * quantity}</td>
        <td>
          <Button color="danger" onClick={() => changeQuantity(product.id, 0, true)}>Remove</Button>
        </td>
      </tr>
    );
  }
}
