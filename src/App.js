import React from 'react';
import { Router } from 'react-router-dom';

// Esse provider vai deixar disponivel o nosso store da aplicação, que é o arquivo que criamos
// em src/store/index que é nosso estado global disponivel para todos nossos componentes
// Então jogamos ele por volta de todos os componentes da aplicação todas as rotas
// passamos uma propriedade chamada store que passa o store como parametro
// Agora toda a aplicação tem acesso ao store
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// Importar as configurações do reactotron antes do store
import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />

        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
