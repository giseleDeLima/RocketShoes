import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

// Verifico se o usuário esta em ambiente de desenvolvimento
// o create react app coloca essa variavel NODE_ENV nas variaveis de ambiente como
// development enquanto estivermos rodando yarn start e ai quando for na build ela
// não vai mais existir e não vai cair aqui dentro
if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();
  console.tron = tron;
}
