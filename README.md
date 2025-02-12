## Example of how the project will work

![Interface da aplicação mostrando a página Heroes com um botão Fetch](./example/GIF.gif)

## Como executar o projeto

### Pré-requisitos  
Certifique-se de ter instalado:  
- [Node.js](https://nodejs.org) - Versão do NodeJS v20.18.1
- [Yarn](https://yarnpkg.com)  
- [Docker](https://www.docker.com) e [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo  
1. Clone o repositório.
2. Instale as dependências com o comando `yarn install` nas pastas `api` e `app`.
3. Inicie o projeto no docker com comando `docker-compose up --build` na pasta raiz.
4. Inicie o backend manualmente navegando até a pasta `api` e inicie com comando `yarn api`.
5. Inicie o frontend manualmente navegando até a pasta `app` e inicie com comando `yarn start`