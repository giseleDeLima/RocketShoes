// Configuração inicial do redux

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Não podemos criar um store sem reducer, ou seja sem nenhum tipo de informação
// que vamos armazenar aqui dentro, vamos armazenar, neste arquivo que estamos importando
// contem todos os reducers da nossa aplicação
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

// Se o usuário estiver em ambiente de desenvolvimento
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

// a constante executa essa função de store
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
