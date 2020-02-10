import React from 'react';
import { Link } from 'react-router-dom';

// conectando ao redux store para acessar dados do reducer store neste componente
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

// Estamos acessando uma propriedade chamada cart que vem do nome que definimos dentro
// de connect para acessar todos os dados do reducer
function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

// O connect pode receber parametros e essa função ela pode receber estados que é o estado
// inteiro do meu redux, e preciso retornar deste estado as informações que eu quero acessar
// dentro desse meu componente, e geralmente retornamos em formato de object
// Quero retornar uma informação para este meu componente que se chama cartSize que vem de dentro
// de state.cart o nome cart seguido do state é o nome do reducer que eu quero acessar

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
