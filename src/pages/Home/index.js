/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

// connect ele vai conectar nosso componente com o estado do redux
import { connect } from 'react-redux';

// Função do redux
import { bindActionCreators } from 'redux';

import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

// Importando as actions do cart, todos as funções estão nesse import
import * as CartActions from '../../store/modules/Cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  // È invocado assim que o componente do React é montado
  async componentDidMount() {
    const response = await api.get('products');

    // Percorro cada um desses produtos, e retorno um novo objeto
    const data = response.data.map(product => ({
      // Vou copiar todos os dados do produtos com ... então estou pegando todos os
      // dados do produto que vem de response e vou adicionar uma nova informação que
      // se chama priceFormatted chamando o função de formatação passando o preço que vem da api

      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  // Todo componente que conecta com o redux que utiliza o connect ele recebe uma propriedade
  // this.props.dispatch  ele serve basicamente para disparar uma action  ao redux, então
  // desestruturamos e pegamos o dispatch de dentro de props, chamamos o dispatch e colocamos
  // um objeto que é a nossa action
  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  // formatPrice não vamos formatar o preço diretamente formatPrice(product.price), porque isso
  // estará executando muitas vezes, onde todas as vezes que tivermos qualquer alteração em um
  // state qualquer propriedade do React ele sempre executa o render() de novo para mostrar
  // essas alterações, e como temos uma função aqui dentro toda vez ele vai formatar esse
  // preço sem necessidade, sendo que este preço só precisa ser fomatado uma unica vez no
  // inicio quando esses produtos são carregados porque este preço nunca vai mudar

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

// basicamente converte pedaços do nosso estado reducers da nossa aplicação em propriedade
// dentro do nosso componente
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

// Esta função converte actions do nosso redux em propriedades do nosso componente, ele recebe o
// dispatch como parametro ou seja a action, e estamos passando o bindActionCreators dentro
// do corpo dessa função, e o primeiro parametro é o nossa action e o segundo parametro tem
// que ser o dispatch
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

// O connect retorna uma função e estamos chamando ela passando o nome do nosso componente
export default connect(mapStateToProps, mapDispatchToProps)(Home);
