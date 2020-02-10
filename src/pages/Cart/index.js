import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';

// Importando as actions do cart, todos as funções estão nesse import
import * as CartActions from '../../store/modules/Cart/actions';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>R${product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subtotal}</strong>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
// No carrinho eu preciso receber o estado e preciso retornar um object com as informações
// que eu quero do estado, geralmento dentro do redux a gente chama esta função de
// mapStateToProps porque ela vai pegar informações do nosso estado e vai mapear em formato
// de propriedade por componente

// basicamente converte pedaços do nosso estado reducers da nossa aplicação em propriedade
// dentro do nosso componente
const mapStateToProps = state => ({
  // quero criar uma propriedade no componente cart onde ela vai receber todas as informações
  // do reducer de cart
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  // Reduce é quando queremos pegar um array e reduzir ele a um unico valor
  // recebemos esse valor como primeiro parametro, e cada item no segundo parametro
  // Vamos colocar que o total iniciará com valor 0
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
