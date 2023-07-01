# Desafio Fpass

_Éderson Cássio Lacerda Ferreira_  
edersoncassio1983@gmail.com

## Autenticação

Será necessária para marcar heróis como favoritos.

1. Configure a variável de ambiente `JWT_SECRET` com o segredo para assinatura dos tokens JWT.

2. Acesse o endpoint de login:

```bash
curl -iX POST localhost:3000/auth/signin \
   -H 'Content-Type: application/json' \
   -d '{"username": "user", "password": "password"}'
```

## Referências

* https://wallis.dev/blog/typescript-project-references
* https://github.com/nestjs/nest-cli/issues/392


