# Desafio NodeJS

## Dependências

- node v8 (recomendo instalar [via](https://github.com/creationix/nvm))
  - [yarn](https://yarnpkg.com)

## Instalar dependências e iniciar servidor

```bash
yarn # instalar dependências
yarn start # iniciar servidor
```

## Instruções

Faça um fork do repositório e abra um pull request com seu desafio.

## Objetivos do desafio

Você é livre pra instalar quaiquer libs que quiser.

1. Modifique o arquivo routes/fat.js pra que o comando abaixo retorne o fatorial de um número qualquer `n`
```bash
curl -X POST http://localhost:7777/calcs/fat -H 'Content-Type: application/json' -d '{"n": 1}'

```
2. Implemente a rota que responde com o valor fibonacci de um número. Como a chamada abaixo
```bash
curl -X POST http://localhost:7777/calcs/fib -H 'Content-Type: application/json' -d '{"n": 1}'

```
3. Faça log da URL de todas as requisições que chegam ao servidor automaticamente
4. Implemente rotas de CRUD de uma entidade livro, com os atributos `{id, nome}`. A persistência pode ser em memória, mas usar MongoDB, é um bônus.
5. Atualize a seção [resultados](#resultados) com instruções de como testar o passo 4
6. Bônus: use docker

## Resultados

Assumindo que o testador tenha mongoDB, Linux OS e Postman

1. Usando o comando "mongo" no terminal, entra-se na instância do mongodb.
2. Usando o comando "use mydb", estará utilizando a instância mydb.
3. Digite "exit" para sair da instância do mongodb.
4. Utilizando a ferramenta Postman é possível testar as rotas:
```bash
http://localhost:7777/books/add <-POST

```
```bash
http://localhost:7777/books/get/:id <-GET by id

```
```bash
http://localhost:7777/books/del <-DELETE

```
```bash
http://localhost:7777/books/att <-POST (att by id, set new nome)

```
Todas as url das requisições serão gravadas no arquivo urls.log