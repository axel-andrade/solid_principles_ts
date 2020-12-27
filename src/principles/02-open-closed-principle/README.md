# Princípio Aberto-Fechado

Objetos ou entidades devem estar abertos para extensão, mas fechados para modificação, ou seja, quando novos comportamentos e recursos precisam ser adicionados no software, devemos estender e não alterar o código fonte original.

## Como adicionamos um novo comportamento sem alterar o código fonte já existente?

"Separe o comportamento extensível por trás de uma interface e inverta as dependências." - Uncle, Bob

## Lembre-se:

OCP preza que uma classe deve estar fechada para alteração e aberta para extensão.