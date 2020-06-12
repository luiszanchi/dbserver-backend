### Requisitos
- Docker (ultima versão);
- Docker compose (ultima versão);

#### Comando para rodar o projeto na primeira vez
`$ cp .env.example .env && docker-compose up -d && docker-compose exec node sh -c "npm install" && docker-compose exec node sh -c "adonis seed --files='VoteConfigSeeder.js'" && docker-compose restart node`

#### Comando para executar o projeto nas próximas vezes
`$ docker-compose up -d`

#### Requisições API
Caso deseje no projeto contém o arquivo `Insomnia_dbserver.json` para ser importado pelo insomnia e realizar as requisições via API

#### O que vale destacar no código utilizado?

- Utilização do node como Backend
- Utilização do framework AdonisJS
	- Cache
	- Banco
	- Validação
	- MVC

#### O que poderia ser feito para melhorar o sistema?
Permitir que o usuário veja a votação em tempo real com a biblioteca `socket.io

#### Algo a mais que você tenha a dizer
Acredito que eu possa ter muitos desafios na DBServer e que possamos crescer em conjunto, espero que esses projetos atendam a espectativa de você leitor/programador
