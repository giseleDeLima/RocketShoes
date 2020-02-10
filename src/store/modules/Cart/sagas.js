// No redux saga temos alguns métodos auxiliares porque não vamos poder chamar api.get
// ele não deixa fazer essa chamada, importamos o call que é responsável por chamar métodos
// que são asyncronos e retornam promisses dentro do javascript

// put dispara uma action do redux
// all juntar vários listener (ouvintes, estrutura programada que ouve eventos
// que foram registrados a ele)

// takeLatest ouve uma action, se o usuário clicar chamar a action duas vezes antes da
// nossa chamada a api finalizar, o saga ele vai descartar a primeira chamada que ele fez
// e ai ele vai cadastrar o produto uma vez só no carrinho, porque as vezes o usuario
// clica várias vezes no botão aguardando que alguma coisa funcione de forma mais rapida, e
// ai o saga ja controla isso
// select busca informações dentro do estado
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Este asterisco é uma funcionalidade do javascript que se chama generate ou seja seria
// como se fosse um async (async function), inclusive nosso async await ele é convertido
// no babel para generate
// Mas porque não iremos utilizar async await aqui dentro? básicamente o generate é mais potente
// que o async await conseguimos fazer algumas coisas com generate que com async await não
// conseguimos pois ele não tem suporte

// Essa função ela terá a responsabilidade de acessar a api buscar as informações detalhadas
// desse produto e cadastrar dentro do carrinho

// yield é como se fosse o await do generate, tudo que colocamos após o yield ele vai aguardar
// a execução para depois continuar o restante do código
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

// Importamos apenas a action que iremos usar
import { addToCartSucess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  // Sempre que utilizar um effect do saga precisamos do yield na frente
  // o select recebe uma função que vem meu estado completo, e aqui posso fazer qualquer coisa
  // com meu estado, então vou entrar no meu estado dentro do reducer do cart e vou dar um find
  // vou procurar se existe um produto em que o id seja igual a este id que eu esteja tentando add
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada não possui em estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSucess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada não possui em estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('ADD_REQUEST', addToCart),
  takeLatest('UPDATE_AMOUNT_REQUEST', updateAmount),
]);
