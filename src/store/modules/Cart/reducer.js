// Pacote que permite trabalhar com state imutaveis
import produce from 'immer';

// Todo reducer ele recebe por padrão a variavel state e action, a action é o dispatche
// que estamos disparando através do nosso componente, o state é o estado antes de fazer
// a alteração, ou seja antes de ser disparado uma action
// por exemplo, se o estado inicial era um array vazio e agora estamos disparando uma
// action para adicionar produtos, o state ele pega o estado vazio o estado anterior

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          // splice que é para remover, eu passo o index que eu quero remover e a quantidade
          // de itens que eu quero remover a partir desse index
          draft.splice(productIndex, 1);
        }
      });

    case 'UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    // Se ele não encontrar esses reducers ele vai deixar o stado da maneira que estava
    default:
      return state;
  }
}
