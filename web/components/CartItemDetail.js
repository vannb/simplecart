import { Component } from 'react';

export default class CartItemRow extends Component {
  render() {
    const { cartItem } = this.props;
    return (
      <tr>
        <td>{cartItem.name}</td>
        <td>{cartItem.price}</td>
        <td>{cartItem.quantity}</td>
        <td>{cartItem.totalPrice}</td>
        <td>{new Date(cartItem.createdAt).toLocaleString()}</td>
      </tr>
    );
  }
}
