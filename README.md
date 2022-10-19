# Unidade Virtual
## Projeto de plataforma virtual para desafios para Clubes de Desbravadores.

![GitHub package.json version](https://img.shields.io/github/package-json/v/Nick3n/unidade-virtual)
![GitHub](https://img.shields.io/github/license/Nick3n/unidade-virtual)


Tabela de conteúdos

=================
- Pré-Requisitos
- Instalação
- Tecnologias
- Screenshots
- Funcionalidades

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).
- Também será preciso a instalação de banco de dados como o [PostgreSQL](https://www.postgresql.org/) e o [MongoDB](https://www.mongodb.com/).

### 🎲 Rodando em sua máquina

```bash
# Clone este repositório
$ git clone git@github.com:Nick3n/unidade-virtual.git

# Acesse a pasta do projeto no terminal/cmd
$ cd unidade-virtual

# Acesse a pasta do projeto backend no terminal/cmd
$ cd backend

# Instale as dependências
$ npm install

# Configure o .env

# Execute as migrations do banco de dados
$ npx knex migrate:latest

# Execute a aplicação do backend em modo de desenvolvimento
$ npm run start

# Retorna ao projeto
$ cd ../

# Acesse a pasta do projeto frontend no terminal/cmd
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação do frontend em modo de desenvolvimento
$ npm run serve

# A aplicação inciará na porta:8080 - acesse <http://localhost:8080>
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)
- [Passport.js](https://www.passportjs.org/)
- [Knex.js](https://knexjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/pt-br/)

### Screenshots
  <b>Página de Cadastro</b>
  <img alt="Página de Login" title="#PaginaLogin" src="https://imgur.com/5tjyxSR.png" />
  <b>Página de Login</b>
  <img alt="Página de Cadastro" title="#PaginaCadastro" src="https://imgur.com/zoXsGPk.png" />
  <b>Dashboard</b>
  <img alt="Dashboard" title="#Dashboard" src="https://imgur.com/7dl39tS.png" />
  <b>Página de Usuário</b>
  <img alt="Página de Usuário" title="#PaginaUsuario" src="https://imgur.com/lBFCJFA.png" />
  <b>Página de Desafios</b>
  <img alt="Página de Desafios" title="#Dashboard" src="https://imgur.com/IwOZpkF.png" />