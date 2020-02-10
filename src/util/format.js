// Classe de formatação do React, primeiro parametro é o idioma e depois um objeto de conf
// O new Intl.NumberFormat retorna várias funções uma delas é o format, então como eu quero
// exportar uma função diretamente que se chama format, eu posso fazer a desestruturação dessa
// função e retornar ela diretamente, eu posso inclusive renomear essa função com qualquer nome
// neste caso escolhemos o nome formatPrice e agora quando alguém importar esse arquivo consegue
// importar diretamente a função formatPrice
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency', // moeda
  currency: 'BRL', // qual a moeda
});
