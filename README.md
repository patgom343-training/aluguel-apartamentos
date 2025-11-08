
# API de Gestão de Apartamentos por Temporada

API RESTful para cadastro, autenticação de proprietários e gestão de imóveis para aluguel por temporada.

## Funcionalidades
- Registro e autenticação de proprietários (JWT)
- Cadastro de imóveis por proprietários autenticados
- Listagem de imóveis disponíveis com filtros
- Documentação Swagger acessível via endpoint

## Arquitetura
- **Express** para rotas e servidor
- **JWT** para autenticação
- **Swagger** para documentação
- **Banco em memória** (dados não persistem após reiniciar)
- Camadas: `routes`, `controllers`, `services`, `models`, `middleware`

## Autenticação
Utilize o endpoint `/api/owners/login` para obter um token JWT. Envie o token no header `Authorization: Bearer <token>` para acessar rotas protegidas.

## Endpoints Principais

### Registro de Proprietário
`POST /api/owners/register`
```json
{
	"name": "Nome",
	"email": "email@exemplo.com",
	"password": "senha1234",
	"phone": "11999999999"
}
```

### Login de Proprietário
`POST /api/owners/login`
```json
{
	"email": "email@exemplo.com",
	"password": "senha1234"
}
```
Resposta:
```json
{
	"token": "<jwt_token>"
}
```

### Cadastro de Imóvel
`POST /api/properties` (protegido)
```json
{
	"title": "Apartamento Central",
	"description": "Ótimo apto mobiliado",
	"address": "Rua X, 123",
	"city": "São Paulo",
	"price": 200,
	"type": "apartamento"
}
```

### Listar Imóveis Disponíveis
`GET /api/properties/available?city=São Paulo&minPrice=100&maxPrice=300&type=apartamento`


## Documentação Swagger
Acesse a documentação interativa em: [`/api/docs`](http://localhost:3000/api/docs)

## Testes Automatizados

Os testes de API REST estão implementados usando Mocha, Chai, Supertest e Mochawesome.

### Estrutura dos testes
- Os testes estão na pasta `test/`, organizados por funcionalidade (`owner`, `property`, etc).
- Dados de teste (fixtures) estão em `test/fixtures/`.
- Helpers reutilizáveis estão em `test/helpers/`.
- O arquivo `.env` permite configurar a URL base da API (`BASE_URL`).

### Executando os testes

1. Instale as dependências:
	```bash
	npm install
	```
2. Execute todos os testes:
	```bash
	npm test
	```
3. Execute os testes com geração de relatório HTML:
	```bash
	npm run test:report
	```
	O relatório será gerado na pasta `mochawesome-report/`.

### Observações
- Os testes usam Data Driven Testing com arquivos JSON em `test/fixtures`.
- O helper `test/helpers/token.js` facilita a obtenção de token JWT para rotas protegidas.
- Os testes cobrem todos os cenários descritos em `CondicoesDeTeste.txt`.

## User Stories e Regras de Negócio

### 1. Registro de Proprietário
- E-mail único
- Campos obrigatórios: nome, e-mail, senha (mín. 8 caracteres), telefone

### 2. Login de Proprietário
- Validação de e-mail/senha
- Apenas proprietários ativos
- Geração de token JWT (expira em 2h)

### 3. Registro de Imóveis
- Apenas autenticados
- Imóvel vinculado a um proprietário
- Campos obrigatórios: título, descrição, endereço, cidade, valor da diária
- Não pode haver dois imóveis do mesmo proprietário com o mesmo endereço

### 4. Lista de Apartamentos Disponíveis
- Apenas status "disponível"
- Filtros: cidade, faixa de preço, tipo

