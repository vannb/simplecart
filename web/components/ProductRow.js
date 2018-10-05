import { Component } from 'react';
import { Button } from 'reactstrap';

export default class ProductRow extends Component {
  render() {
    const { product, addToCart } = this.props;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td><Button color="primary" onClick={() => addToCart(product.id)}>Add to cart</Button></td>
      </tr>
    );
  }
}
