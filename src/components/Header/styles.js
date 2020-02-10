import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  /* Para alinhar um itens totalmente a esq que é a logo e outro
  totalmente a direita que é o carrinho */
  display: flex;

  /* Para isso darei um space entre os elementos de dentro desse componente */
  justify-content: space-between;

  /* Se um item for maior que o outro alinharemos todos ao centro */
  align-items: center;
  margin: 50px 0;
`;

// Utilizando um componente que não é nativo do HTML e sim do react-router-dom
// colocamos entre ()
export const Cart = styled(Link)`
  display: flex;

  /* Faz com que os elementos de dentro desse componente fiquem ao centro
  ou seja ficaram um ao lado do outro*/
  align-items: center;

  /* Tirar o anderline*/
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
