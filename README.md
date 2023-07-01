# Desafio Fpass

_Éderson Cássio Lacerda Ferreira_  
edersoncassio1983@gmail.com

## Executando a aplicação

Configure a variável de ambiente `JWT_SECRET` com o segredo para assinatura dos tokens JWT.

```bash
export JWT_SECRET='segredo bem guardado'

```

Acesse o diretório da aplicação web e execute o servidor:

```bash
cd app/nestjs-api/
npm run start[:dev]
```

## Autenticação

Será necessária para marcar heróis como favoritos. Acesse o endpoint de login informando
as credenciais `user` e `password`:

```bash
curl -iX POST localhost:3000/auth/signin \
   -H 'Content-Type: application/json' \
   -d '{"username": "user", "password": "password"}'
```

## Referências

* https://wallis.dev/blog/typescript-project-references
* https://github.com/nestjs/nest-cli/issues/392


