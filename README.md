<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  Aplicação desenvolvida em <a href="http://nodejs.org" target="_blank">Node.js</a> com <a href="https://nestjs.com" target="_blank">NestJS</a>, utilizando o padrão arquitetural <b>CQRS</b> para separar claramente operações de leitura (queries) e escrita (commands), garantindo maior escalabilidade, organização e manutenção do código.
</p>

---

## 📝 Descrição do Projeto

Este projeto foi desenvolvido com **NestJS** aplicando o padrão **CQRS (Command Query Responsibility Segregation)**.  
A aplicação tem como objetivo gerenciar produtos de forma eficiente, separando responsabilidades em:

- **Commands:** usados para criar, atualizar e remover registros.  
- **Queries:** usados para consultar dados de forma otimizada.  

Com essa abordagem, o sistema fica mais organizado, facilita testes, melhora a escalabilidade e permite evoluir funcionalidades de forma independente.

---

## 🚀 Project setup

```bash
$ yarn install

$ yarn run start:dev
