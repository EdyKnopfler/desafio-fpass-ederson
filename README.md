# Desafio Fpass

## Executando a aplicação

1. Configure a variável de ambiente `JWT_SECRET` com o segredo para assinatura dos tokens JWT.

```bash
export JWT_SECRET='segredo bem guardado'
```

2. Configure as variáveis de ambiente `MARVEL_PRIVATE_KEY` e `MARVEL_PUBLIC_KEY` com suas credencias da [Marvel for Developers](https://developer.marvel.com/)

```bash
export MARVEL_PRIVATE_KEY='...'
export MARVEL_PUBLIC_KEY='...'
```

3. Acesse o diretório da aplicação web e execute o servidor:

```bash
cd app/nestjs-api/
npm run start[:dev]
```

## Autenticação

Será necessária para marcar/desmarcar heróis como favoritos. Acesse o endpoint de login informando as credenciais `user` e `password`:

```bash
curl -iX POST localhost:3000/auth/signin \
   -H 'Content-Type: application/json' \
   -d '{"username": "user", "password": "password"}'
```

## Funcionalidades

### Listagem de heróis

Não requer autenticação.

Parâmetros querystring:

* `search`: texto a pesquisar (obrigatório)
* `page`: página de resultado iniciando em 1 (default 1, 30 por página)

```bash
curl -i localhost:3000/heroes?search=<pesquisa>[&page=<pagina>]
```

### Favoritar herói

Campos da requisição (obrigatórios):

* `marvelId`: ID do herói (numérico)
* `reason`: motivo para favoritar (string)

```bash
curl -iX POST localhost:3000/heroes/favorites \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer <token>' \
   -d '{"marvelId": <id>, "reason": "<motivo>"}'
```

### Remover herói dos favoritos

Parâmetro da URL:

* `marvelId`: ID do herói (numérico)

```bash
curl -iX DELETE localhost:3000/heroes/favorites/<marvelId> \
   -H 'Authorization: Bearer <token>'
```

### Listar favoritos

Não requer autenticação.

```bash
curl localhost:3000/heroes/favorites
```

## Clean Architecture

Referência de configuração do projeto em NestJs em:
https://github.com/EdyKnopfler/desafio-fpass-ederson/commit/81814ad1fd13361e9ca8a14653f790bb6cde8971

Configurando corretamente as [referências](https://www.typescriptlang.org/docs/handbook/project-references.html) e o `entryFile`, ao importar o projeto `core` o `rootDir` "sobe" para a pasta principal  do repositório.

O módulo `core` deve ter a configuração `composite: true` em seu `tsconfig.json`.

## Referências

* https://wallis.dev/blog/typescript-project-references
* https://github.com/nestjs/nest-cli/issues/392


