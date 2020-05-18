# Desenvolvedores

- Guilherme Rocha Vieira RA: 22.118.024-3
- Thomas Anderson Ferrari RA: 22.118.175-3

# Problema #1 - Menor quantidade de moedas para um valor

<p align="justify">
Nesse problema, dado um valor V em reais e supondo que temos quantidade infinitas de moedas C = {C1, C2, C3,...,Cm} com valores distintos, é necessário encontrar a quantidade mínima de moedas que representam o valor V.
</p>

<p align="justify">
Por exemplo, para V = 62 e C = {25, 4, 3, 1}, precisamos de 2 moedas de 25 e 3 moedas de 4 centavos, ou então {25, 25, 4, 4, 4}, logo a saída deveria ser 5. E ainda utilizando o mesmo valor de V = 62, para C = {25, 16, 15, 4, 3, 1}, precisariamos dessa vez de 2 moedas de 16 e 2 moedas de 15 centavos, ou então {16, 16, 15, 15}, na qual a saída teria que ser 4.
</p>

<p align="justify">
Logo, através desses exemplos é possível verificar que o método por Algoritmos Gulosos é ineficiente, pois somente com determinados exemplos seria possível utilizar ele, como foi no caso do primeiro exemplo, onde bastava escolher as moedas de maior valor para se obter a resposta, contudo, ao adicionar novas moedas para solucionar um mesmo problema V, se o método Guloso ainda fosse utilizado, ele estária errado, já que ele retornaria o mesmo resultado anterior, sendo que utilizando as novas moedas adicionadas seria possível solucionar o problema com menos moedas. Assim, para resolver este problema, foi utilizado os métodos de Programação Dinâmica.
</p>

## Método da Divisão e Conquista

<p align="justify">
Antes de solucionar o problema por Programação Dinâmica, primeiro é necessário resolvê-lo pelo método da Divisão e Conquista, para então encontrar a sub-estrutura ótima e, por fim, desenvolver um algoritmo de maneira bottom-up.
</p>

<p align="justify">
Para solucioná-lo por esse método, basta pegar o valor V e subtrair ele de cada uma das moedas C, desde que a moeda C seja menor do que o valor V, e verificar se o valor foi zerado, se foi, a função retorna 0, caso contrário, ele prossegue para fazer o mesmo com os valores subsequentes até zerar o valor de V, na qual a cada retorno da função, ele soma 1 e retorna para a função que chamou ele dentro da recursão, até voltar para a chamada principal, na qual ele sempre pega o menor valor de retorno entre as funções que foram chamadas.
</p>

<p align="justify">
Exemplo: Para o valor V = 6, e C = {4, 3, 1}, a função vai chamar ela mesma, passando 6 - 4, já que 4 <= 6, assim como o vetor C com as moedas, então na próxima chamada, o valor de V passa a ser 2, como 4 e 3 > 2, eles não serão utilizados, apenas o 1, logo o próximo valor de V = 2 - 1 = 1, então será chamado mais uma vez a função, como 4 e 3 > 1, apenas o 1 será utilizado novamente, chamando pela última vez a função novamente passando V = 1 - 1 = 0, e como V = 0, a função retorna 0, e então a chamada interior soma 1, e isso procede até a última chamada, quando o V = 6, para que então seja realizado as chamadas de V = 6 - 3 e V = 6 - 1. Abaixo é possível ver o grafo gerado pela recursão de V = 6 - 4:
</p>
  
<p align="center">
  <img src="imgs/ex1/grafo1.png">
</p>

<p align="justify">
Após a realização de cada recursão é feito uma comparação para verificar qual é o menor número de moedas necessárias para representar o valor V, na qual isso é feito após cada retorno da chamada, para então retornar o melhor valor entre aqueles que foram encontrados, e fazer isso com os retornos subsequentes, assim como abaixo nós temos o grafo completo da recursão desse exemplo, se tivesses que utilizar apenas o grafo para dizer o melhor resultado para esssa questão, basta verificar qual caminho tem o menor número de nós, ou então qual nível chega até o zero primeiro, que nesse caso seria o caminho de  V = 6 - 3 = 3, e após V = 3 - 3 = 0, que retorna no final como saída 2:
</p>

<p align="center">
  <img src="imgs/ex1/grafo-completo.png">
</p>

### Algoritmo Recursivo

Para melhor entender como isso funciona na prática, vamos analisar o algoritmo abaixo:

```javascript
function findMinCoin(coins, change) {
  if (change === 0) {
    return 0;
  }

  let result = Number.MAX_VALUE;

  for (let i = 0; i <= coins.length; i++) {
    if (coins[i] <= change) {
      let tempResult = findMinCoin(coins, change - coins[i]);

      if (tempResult !== Number.MAX_VALUE && tempResult < result) {
        result = tempResult + 1;
      }
    }
  }
  return result;
}
```

<p align="justify">
Primeiro nós temos a condição inicial que impede que o algoritmo entre dentro de uma chamada recursiva infinita, para sempre retornar 0 quando o valor do 'change', que seria o troco ou o valor V, chegar a 0:
</p>

```javascript
if (change === 0) {
  return 0;
}
```

<p align="justify">
Após nós temos a variavel 'result', que tem a responsabilidade de guardar a quantidade mínima de moedas a serem utilizadas para representar o 'change'. Ela é iniciada sempre com o valor númerico máximo do JavaScript para que quando for realizado uma comparação, seja possível trocar o seu valor para obter um possível valor ótimo, ou então, no caso de não existirem valores que possam representar o 'change', ela vai retornar o valor máximo para que esse caminho seja descartado como uma das possíveis soluções:
</p>

```javascript
let result = Number.MAX_VALUE;
```

<p align="justify">
Por fim é feito uma iteração entre todos os valores do vetor 'coins', que seriam as moedas inseridas pelo usuário, para então verificar se cada uma delas é menor que o valor atual do 'change', e caso seja, a função 'findMinCoins' será chamada novamente, passando como parâmetros o vetor 'coins' e o resultado da subtração entre 'change - coins[i]', na qual a função 'findMinCoins' continuará a ser chamada até o 'change' chegar a 0, ou até não existir mais moedas que sejam menores que o valor de 'change', na qual o valor do retorno será armazenado na variável 'tempResult', que então será utilizada numa condição, primeiro para verificar se o valor dela é diferente do valor máximo, pois caso seja isso significa que o caminho que ele percorreu é inviável, já que nem mesmo existem moedas que possam representar o valor de 'change', e depois ele compara se o valor de 'tempResult' é menor que de 'result', caso seja, o valor de 'result' passa a ser o valor de 'tempResult' + 1, para que então o 'result' sejá utilizando nas próximas iterações, portanto, a função desse laço é sempre buscar encontrar o menor número de moedas entre os possíveis caminhos que ele pode tomar, e no final retornar esse resultado, seja para a chamada principal, ou para as chamadas subsequentes:
</p>

```javascript
for (let i = 0; i <= coins.length; i++) {
  if (coins[i] <= change) {
    let tempResult = findMinCoin(coins, change - coins[i]);

    if (tempResult !== Number.MAX_VALUE && tempResult < result) {
      result = tempResult + 1;
    }
  }
}
return result;
```

## Sub-Estrutura Ótima

<p align="justify">
Ainda utilizando o exemplo do valor V = 6 e C = {4, 3, 1}, é possível perceber no grafo abaixo que quando o algoritmo recursivo é utilizado, ele acaba resolvendo o mesmo problema inúmeras vezes, como a melhor solução para V = 1 (em azul), que aparece 5 vezes, para V = 2 (em vermelho), que aparece 4 vezes, e para V = 3 (em verde), que aparece 2 vezes:
</p>

<p align="center">
  <img src="imgs/ex1/grafo-completo-sub-estrutura.png">
</p>

<p align="justify">
Logo, seria interessante armazenar esses valores, para que eles possam ser utilizados sempre que o algoritmo se encontrar em uma situação que já foi resolvida anteriormente, e para isso, será necessário utilizar o método de 'bottom-up'
</p>

### Método 'bottom-up'

<p align="justify">
Para solucionar esse problema de forma eficiente, precisamos olhar para ele por baixo, para onde os valores começam a ser retornados na função, pois em vez de tentarmos buscar a melhor solução para V logo de cara, é melhor começar a buscar a melhor solução de cada um dos números que antecedem V, e salvar esses resultados, para que eles possam ser utilizados mais tarde em problemas similares, assim, utilizando o exemplo anterior de V = 6, e C = {4, 3, 1}, vamos criar um vetor para armazenar a melhor solução de cada valor que antecede V, começando do 0 e indo até V, que nesse caso é 6, e iniciar todos os valores com 0:
</p>

| 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 0   | 0   | 0   |

<p align="justify">
Agora iniciando com V = 1, é necessário realizar uma subtração para cada valor dentro de C que seja menor ou igual a V, que nesse caso só tem apenas o valor 1, e como 1 - 1 = 0, se buscarmos no vetor esse resultado, teremos 0, pois vetor[0] = 1, e como uma moeda foi utilizada, somamos 1 ao valor retornado, para então colocarmos 1 como resultado na posição 1 do vetor: 
</p>

| 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 0   | 0   | 0   | 0   | 0   |

<p align="justify">
Prosseguimos então para V = 2, na qual somente o valor 1 poderá ser utilizado, então como 2 - 1 = 1, se buscarmos no vetor esse valor, será retornado 1, e então nós somamos 1 ao valor retornado, e então inserimos esse valor no vetor:      
</p>
          
| 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| - | - | - | - | - | - | - |
| 0 | 1 | 2 | 0 | 0 | 0 | 0 |

<p align="justify">
Agora para o V = 3, nós temos o 1 e 3 que podem ser utilizados, primeiro é feito 3 - 1 = 2, e como o valor retornado é 2, nós somamos 1 que resultará em 3, contudo, ao utilizarmos o valor 3, 3 - 3 = 0, e ao retornar o valor 0 do vetor, teremos 0 + 1 = 1, que é menor que o valor encontrado ao utilizar o valor 1, logo o menor valor será inserido no vetor:
</p>

| 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 2   | 1   | 0   | 0   | 0   |

<p align="justify">
E assim o mesmo será feito para os valores subsequentes do vetor, até chegar no valor original de V = 6, na qual, ao ter encontrado as melhores soluções anteriores, basta subtrair das moedas dentro do vetor, e retornar o melhor resultado + 1, dentre aqueles que já foram encontrados: 
</p>

| 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 2   | 1   | 1   | 2   | 2   |

### Algoritmo por Programação Dinâmica

Agora vamos analisar o algoritmo por programação dinâmica:

```javascript
function findMinCoins(coins, change) {
  let savedResults = [];
  for (let i = 0; i <= change; i++) {
    savedResults[i] = 0;
  }

  for (let i = 1; i <= change; i++) {
    let currentChange = i;
    let bestCount = Number.MAX_VALUE;
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= currentChange) {
        let count = savedResults[currentChange - coins[j]] + 1;

        if (bestCount > count) {
          bestCount = count;
        }
      }
    }
    savedResults[i] = bestCount;
  }

  return savedResults[change];
}
```

<p align="justify">
Primeiro nós precisamos inicializar o vetor 'savedResults', que irá salvar os melhores resultados de 0 até 'change'(valor de V), com 0:
</p>

```javascript
let savedResults = [];
for (let i = 0; i <= change; i++) {
  savedResults[i] = 0;
}
```

<p align="justify">
Após, iremos percorrer um laço começando do 1 até 'change', sempre iniciando a variavel 'currentChange' = i, que representa o troco, ou valor V, atual, e depois inicializamos 'bestCount' com o valor máximo do JavaScript. Dentro desse laço nós temos outro laço que percorre todas as moedas do vetor 'coins', na qual foi adicionado uma condição para ele entrar somente quando as moedas forem menores que o valor de 'currentChange'. Então, dentro desse laço, ele procura um valor correspondente no index do vetor 'savedResults' que seja igual a 'currentChange' - 'coins[j]', que seria o valor atual de V menos as moedas que são menores que V, soma + 1, já que uma moeda foi utilizada, para então no final do laço realizar uma comparação entre cada um desses valores encontrados e pegar o melhor entre eles, e após terminar esse laço, o melhor resultado é salvo no vetor 'savedResults' antes da próxima iteração do laço principal, e depois de finalizar o laço principal, a função retorna o melhor resultado para o valor V:
</p>

```javascript
for (let i = 1; i <= change; i++) {
  let currentChange = i;
  let bestCount = Number.MAX_VALUE;
  for (let j = 0; j < coins.length; j++) {
    if (coins[j] <= currentChange) {
      let count = savedResults[currentChange - coins[j]] + 1;

      if (bestCount > count) {
        bestCount = count;
      }
    }
  }
  savedResults[i] = bestCount;
}
```

## Análise Assintótica

<p align="justify">
Como é possível verificar no algoritmo, a parte que mais pesa nele é o laço que passa por todas as moedas que está dentro do laço principal que vai de 1 até V: 
</p>
  
```javascript
for (let i = 1; i <= change; i++) {
  let currentChange = i;
  let bestCount = Number.MAX_VALUE;
  for (let j = 0; j < coins.length; j++) {
    if (coins[j] <= currentChange) {
      let count = savedResults[currentChange - coins[j]] + 1;

      if (bestCount > count) {
        bestCount = count;
      }
    }

}
savedResults[i] = bestCount;
}

```
<p align="justify">
Logo a complexidade desse algoritmo é O(V*C), na qual V seria o valor do troco, ou então o valor a ser representado, enquanto C seria o tamanho do vetor que contêm as moedas. No pior caso, onde C = V, a complexidade do algoritmo passa a ser O(V^2), ou então O(n^2), supondo que seja realizado um filtro no vetor que contêm as moedas para retirar os valores que são maiores que o valor de V.
</p>

## Interface

<p align="center">
  <img src="imgs/ex1/exemplo1.gif">
</p>

# Problema #2 - Contagem de subconjuntos com soma X

<p align="justify">
Nesse problema, dado um vetor arr de tamanho N e um inteiro X, é necessário encontrar a quantidade de subconjuntos de arr que conseguem representar o valor de X.
</p>

<p align="justify">
Por exemplo, para arr = {1, 1, 2, 3, 4} e X = 5, a saída deverá ser 4, pois nós temos 4 subconjuntos que representam X: {1, 4}, {1, 4}, {2, 3} e {1, 1, 3}. Ou então para arr = {1, 2, 3, 4, 5} e X = 10, a saída deverá ser 3, pois teremos 3 subconjuntos que representam X: {1, 4, 5}, {2, 3, 5} e {1, 2, 3, 4}.
</p>

## Método da Divisão e Conquista

<p align="justify">
Para resolver este problema por divisão e conquista, é necessário pegar o valor de X e subtrair dele cada um dos valores contidos no vetor arr, e para cada caminho subsequente, é necessário descontar do vetor os valores que já foram utilizados, para que não sejam criados caminhos repetidos, por exemplo, para arr = {1, 2, 3, 4} e X = 5, se eu fizer 5 - 1 = 4, para o primeiro caminho, no caminho gerado a partir dele eu não poderei usar o 1 novamente, os únicos que eu poderei usar são os valores {2, 3, 4}, e então isso é feito até o valor inicial de X = 0, o que significa que foi encontrado um subconjunto capaz de representar X, logo contar esse caminho para encontrar a solução final, e no caso de X < 0 esse caminho é descartado. 
</p>
  
<p align = "justify">
 Para melhor visualizar essa solução por divisão e conquista, vamos utilizar o exemplo arr = {1, 1, 2, 3, 4} e X = 5, e visualizar a resolução pelo grafo abaixo:
</p>


