<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Pour ajouter un module (à ranger dans le répertoire modules)

```bash
$ nest g module <nom_du_module>
```

## CQRS
### Pour ajouter une commande ou une query à un module
Ne pas oublier d'ajouter le handler dans le fichier <nom_du_module>.module.ts dans les providers et les exports

## Utilisation des guards
Différents guards sont utilisables dans l'application.
- JwtAuthGuard : permet de vérifier que l'utilisateur est authentifié via un token jwt. Ce guard doit être accompagné
d'un décorateur ```@ApiBearerAuth()``` sur la route concernée afin de pouvoir récupérer le token dans le bearer auth.
- RolesGuard : permet de vérifier que l'utilisateur a le rôle nécessaire pour accéder à la ressource. Ce guard doit être
accompagné d'un décorateur ```@Roles()``` sur la route concernée contenant les rôles autorisés.
- OwnGuard : permet de vérifier que l'utilisateur est propriétaire de la ressource concernée ou qu'il a le rôle admin.

Sur la majorité des routes, il faut utiliser le guard JwtAuthGuard. Il faut ensuite ajouter un guard parmi
RolesGuard ou OwnGuard en fonction de l'accès nécessaire à cette route. OwnGuard et RolesGuard ne devraient pas être 
utilisés en même temps sur une route.

Exemple d'utilisation :
```
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OwnGuard)
```
```
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
```

## IMPORTANT POUR L'ENVOI DE MAILS VIA UN COMPTE GMAIL
Il faut paramétrer le compte gmail pour autoriser l'envoi de mails depuis une application tierce.
- Aller sur l'espace sécurité de votre compte gmail.
- Activer l'authentification à deux facteurs.
- Cliquer sur les mots de passe des applications juste en dessous de l'authentification à deux facteurs.
- Sur la sélection d'application, sélectionner "autres" et renseigner le nom de l'application (api-ludosaure).
- Copier le mot de passe généré et le renseigner dans le fichier .env du projet dans la variable GENERATED_EMAIL_PASSWORD.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
