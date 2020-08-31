# todo-api

That is a simple project to manage a to do list

## status check
|SCOPE      |STATUS                       |
|---        |---                          |
|tests      |![run-tests][tests-badge]    |
|build      |![run-build][build-badge]    |
|deploy     |![deploy-badge][deploy-badge]|

## to run
```sh
yarn && yarn dev
```
>or
```sh
yarn && yarn build && yarn start
```

## simple entity diagram
![no found][entity-diagram]

<!-- alias -->
[entity-diagram]: https://github.com/jonathan-sh/todo-api/blob/master/doc/db-relationship.jpg?raw=true
[tests-badge]: https://github.com/jonathan-sh/todo-api/workflows/run-tests/badge.svg
[build-badge]: https://github.com/jonathan-sh/todo-api/workflows/run-build/badge.svg
[deploy-badge]: https://c1ncr9o0gj.execute-api.sa-east-1.amazonaws.com/default/health-api?kill_cache=1&app=todo-api&url=https://jonathan-todo-api.herokuapp.com/heath