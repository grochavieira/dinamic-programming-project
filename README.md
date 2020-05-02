# Desenvolvedores
- Guilherme Rocha Vieira RA: 22.118.024-3
- Thomas Anderson Ferrari RA: 22.118.175-3

# Problema #1 - Menor quantidade de moedas para um valor
Nesse problema, dado um valor V em reais e supondo que temos quantidade infinitas de moedas C = {C1, C2, C3,...,Cm} com valores distintos, é necessário encontrar a quantidade mínima de moedas que representam o valor V.

Por exemplo, para V = 62 e C = {25, 4, 3, 1}, precisamos de 2 moedas de 25 e 3 moedas de 4 centavos, ou então {25, 25, 4, 4, 4}, logo a saída deveria ser 5. E ainda utilizando o mesmo valor de V = 62, para C = {25, 16, 15, 4, 3, 1}, precisariamos dessa vez de 2 moedas de 16 e 2 moedas de 15 centavos, ou então {16, 16, 15, 15}, na qual a saída teria que ser 4.

Logo, através desses exemplos é possível verificar que o método por Algoritmos Gulosos é ineficiente, pois somente com determinados exemplos seria possível utilizar ele, como foi no caso do primeiro exemplo, onde bastava escolher as moedas de maior valor para se obter a resposta, contudo, ao adicionar novas moedas para solucionar um mesmo problema V, se o método Guloso ainda fosse utilizado, ele estária errado, já que ele retornaria o mesmo resultado anterior, sendo que utilizando as novas moedas adicionadas seria possível solucionar o problema com menos moedas. Assim, para resolver este problema, foi utilizado os métodos de Programação Dinâmica.

## Método da Divisão de Conquista
Antes de solucionar o problema por Programação Dinâmica, primeiro é necessário resolvê-lo pelo método da Divisão e Conquista, para então encontrar a sub-estrutura ótima e, por fim, desenvolver um algoritmo de maneira bottom-up.

Para solucioná-lo por esse método, basta pegar o valor V e subtrair ele de cada uma das moedas C, desde que a moeda C seja menor do que o valor V, e verificar se o valor foi zerado, se foi, a função retorna 0, caso contrário, ele prossegue para fazer o mesmo com os valores subsequentes até zerar o valor de V, na qual a cada retorno da função, ele soma 1 e retorna para a função que chamou ele dentro da recursão, até voltar para a chamada principal, na qual ele sempre pega o menor valor de retorno entre as funções que foram chamadas.

Exemplo: Para o valor V = 6, e C = {4, 3, 1}, a função vai chamar ela mesma, passando 6 - 4, já que 4 <= 6, assim como o vetor C com as moedas, então na próxima chamada, o valor de V passa a ser 2, como 4 e 3 > 2, eles não serão utilizados, apenas o 1, logo o próximo valor de V = 2 - 1 = 1, então será chamado mais uma vez a função, como 4 e 3 > 1, apenas o 1 será utilizado novamente, chamando pela última vez a função novamente passando V = 1 - 1 = 0, e como V = 0, a função retorna 0, e então a chamada interior soma 1, e isso procede até a última chamada, quando o V = 6, para que então seja realizado as chamadas de V = 6 - 3 e V = 6 - 1. Abaixo é possível ver o grafo gerado pela recursão de V = 6 - 4:

<p align="center">
  <img width="300" height="500" src="img/ex1/grafo1.png">
</p>
