import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  /* Para que os produtos fiquem em formato de grid */
  display: grid;

  /* 3 espaçamentos de grid com uma largura igual*/
  grid-template-columns: repeat(3, 1fr);

  /* para dar uma distancia entre cada grid ou seja cada produto */
  grid-gap: 20px;
  list-style: none;

  li {
    /* Para ficar uma informação abaixo da outra */
    display: flex;
    flex-direction: column;

    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    /* > esta instrução é para informar que a estilização deve ser aplicada
    no strong dentro da li, se houver strong fora não será aplicado*/
    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
