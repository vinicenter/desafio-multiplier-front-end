# Mockup do projeto

<img src="https://i.imgur.com/9zwEt3A.png" width="700" height="auto" alt="Mockup Image for project"></img>

# Veja o projeto ao vivo
https://vini.center/pokedex

# Como rodar em sua máquina?

## Dependências gerais

Para rodar o projeto em sua máquina, você irá precisar das seguintes dependências:

<ul>
  <li>NPM</li>
  <li>Node</li>
  <li>Git</li>
</ul>

## Baixando e rodando

Após ter satisfeito essas depêndencias, você pode clonar o repositório com o comando abaixo:
```sh
git clone https://github.com/vinicenter/pokedex.git
```

Após ter clonado o repositório, é necessário instalar as dependências locais com o comando abaixo:
```sh
npm install
```

Para iniciar o servidor de desenvolvimento, use o comando abaixo:
```sh
npm run serve
```

Para buildar o projeto, configure a publicPath no arquivo "vue.config.js", e depois use o comando abaixo:
```sh
npm run build
```

# O que foi usado para desenvolver o projeto?

## Tecnologias usadas para o desenvolvimento

<ul>
<li>Vue.JS</li>
<li>Bootstrap</li>
<li>Axios</li>
<li>Sass</li>
<li>ESLint</li>
<li>Vue-cli</li>
</ul>

## Bibliotecas do framework Vue

<ul>
<li>vue3-notification</li>
</ul>

# Diferenciais

<ul>
<li>Arquivo de configuração de texto para rápida tradução das mensagens</li>
<li>Alto nível de componentização</li>
<li>Linter para manter o código padronizado</li>
</ul>

<hr />

# Introdução do desafio da Multiplier

<p align="center">
  <img src="https://multiplier.com.br/assets/multiplier.svg" width="320" alt="Nest Logo" />
</p>

# Desafio Front-end Multiplier

O intuito deste teste é avaliar seus conhecimentos técnicos de front-end.

O teste consiste em utilizar a API([pokeapi v2](https://pokeapi.co/docsv2/#)) para construção de uma Pokédex.

Este desafio deve ser feito por você em sua casa. Gaste o tempo que você quiser. Mas nos conte o tempo que levou para realizar o desafio.

# Instruções de entrega do desafio

1. Primeiro, faça um fork deste projeto para sua conta no Github (crie uma se você não possuir).
2. Em seguida, implemente o projeto tal qual descrito abaixo, em seu clone local.
3. Por fim, envie via e-mail com o link do desafio, avisando quanto tempo levou para faze-lo.

# Descrição do projeto

Com esta API([pokeapi v2](https://pokeapi.co/docsv2/#)) em mãos, precisamos que você crie uma interface WEB para exibir as informações dos pokémons capturados.

> Não esqueça de ler as informações da documentação da [pokeapi v2](https://pokeapi.co/docsv2/#), armazene dados em cache 

**Sua aplicação DEVE:**

1. Ter um filtro para buscar os pokémons por nome ou número.
2. Adicionar ou capturar, como preferir, novos pokémons a Pokédex que a principio estará vazia.
3. Listar os pokémons que foram adicionados a Pokédex.
4. Mostrar detalhes do personagem adicionados a Pokédex como: 
    - Nome
    - Imagem dando a opção do usuário fazer upload de sua própria imagem, substituindo a que é entregue via API
    - Peso
    - Tamanho
    - Lista de tipos
    - Lista de habilidades
    - Estatísticas de velocidade
    - Defesa
    - Ataque
    - Hp
    - Cada passo de sua evolução
    - Ao clicar em um item da lista de tipos, mostrar todos os pokémons daquele mesmo tipo, inclusive os que ainda não estão adicionados a Pokédex
    - Ao clicar em um item da lista de habilidades mostrar o `short_effect` da mesma da para fazer com as notificações
5. Excluir os pokémons que foram adicionados a Pokédex.

**Sua aplicação web NÃO PRECISA:**

1. Lidar com autenticação ou autorização (pontos extras se fizer)
2. Não precisa estar hospedada em nenhum servidor.
3. Lidar com APIs que não seja a recomendada pelo teste.
4. Ser escrita usando algum framework específico (mas não há nada errado em usá-los também, use o que achar melhor).
5. Testes unitarios (pontos extras se fizer)

# Tecnologias que deve estar presentes no desafio

- VueJS
- Bootstrap

**Não necessário mas se tiver será um diferencial**

- Testes Unitarios

# Avaliação

Seu projeto será avaliado de acordo com os seguintes critérios.

1. Sua aplicação preenche os requerimentos básicos?
2. Você documentou a maneira de configurar o ambiente e rodar sua aplicação?
3. Você seguiu as instruções de envio do desafio?
4. Ter uma aparência bonita
5. Altamente responsivo

Adicionalmente, tentaremos verificar sua experiência com programação funcional a partir da estrutura de seu projeto.

---

## Boa sorte!
