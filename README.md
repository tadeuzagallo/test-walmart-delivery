# Wallmart Job Interview #

## Problem statement (pt-BR)

.: Entregando Mercadorias

O Walmart esta desenvolvendo um novo sistema de logistica e sua ajuda é muito importante neste momento. Sua tarefa será desenvolver o novo sistema de entregas visando sempre o menor custo. Para popular sua base de dados o sistema precisa expor um Webservices que aceite o formato de malha logística (exemplo abaixo), nesta mesma requisição o requisitante deverá informar um nome para este mapa. É importante que os mapas sejam persistidos para evitar que a cada novo deploy todas as informações desapareçam. O formato de malha logística é bastante simples, cada linha mostra uma rota: ponto de origem, ponto de destino e distância entre os pontos em quilômetros.

```
A B 10
B D 15
A C 20
C D 30
B E 50
D E 30
```

Com os mapas carregados o requisitante irá procurar o menor valor de entrega e seu caminho, para isso ele passará o nome do ponto de origem, nome do ponto de destino, autonomia do caminhão (km/l) e o valor do litro do combustivel, agora sua tarefa é criar este Webservices. Um exemplo de entrada seria, origem `A`, destino `D`, autonomia `10`, valor do litro `2,50`; a resposta seria a rota `A B D` com custo de `6,25`.

## About this solution

I chose Node.js and MongoDB for this solution since it I think would be fast enough and are technologies that I quite enjoy working with.
I have worked with javascript lately, but not node.js, so I decided it would be a great opportunity to catch up. I also had worked with MongoDB in the past, but very briefly, so, the same applies.


## Instructions

This solution was written using [Node.js](http://nodejs.org) and uses [MongoDB](http://www.mongodb.com), so before start both should be up and running

clone the repository
```sh
$ git clone https://github.com/tadeuzagallo/test-walmart-delivery
```

install the dependencies
```sh
$ npm install
```

run the server
```sh
$ node index.js [port] # default port: 8080
```

To run the tests
```sh
$ npm test
```

After that a basic interface is available at `http://localhost:8080` for simulating api calls

## What this solution is using

* ExpressJS
* Mongoose
* Morgan
* PiorityQueueJS

_Dev Dependencies_

* Mocha
* Chai
* FactoryGirl
* Sinon
* RequireSubvert
