module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    /*Vamos extender as configurações do prettier, e configurações do prettier feitas para
    o react */
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser:  /* è uma extensão que instalamos */
    'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],

  /* Vamos sobrescrever algumas regras que vem no padrão da airbnb*/
  rules: {
    /* Eu quero que o prettier aponte todas as regras que ele não encontrar que ele não
    bater com nosso código como um erro */
    'prettier/prettier': 'error',
    /* Por padrão da airbnb permite que a gente escreve código JSX (HTML com Javascrit)
    Somente em arquivos que termine com a extensão jsx, mas queremos utilizar a extensão
    js, quero que retorne um warning somente se as minhas extensões não forem js e jsx*/
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    /* Estou desativando uma regra que me obriga quando tenho apenas um export dentro de
    um arquivo que ele seja um export default, mas tem alguns arquivos que vamos
    precisar ter export dentro deles sem ser export default, isso será mais na
    parte de estilização */
    'import/prefer-default-export': 'off',

    /* O eslint pede para não alterar parametros que a gente recebe numa função, mas
    iremos precisar desativar essa regra */
    'no-param-reassign': 'off',

    /*Habilita para que possamos utilizar console.tron */
    'no-console': ["error", { allow: ["tron"] }]
  },
};
