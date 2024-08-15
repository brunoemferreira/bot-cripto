![chrome_YV9JKNy3JO](https://github.com/user-attachments/assets/297ad53f-a733-45e6-a812-7c23c5665a22)

## 📄 Descrição 
Bot que monitora e opera no mercado de criptomoedas 24h por dia, 7 dias por semana. O projeto apresenta duas possibilidades de execução a primeira é usando a estratégia de média que compra em 90% e vende em 110% e a outra é utilizando o cruzamento de médias.

## Ferramentas e Bibliotecas

* [NodeJS 20.16.0]( )
* [Axios]()
* [Crypto]() - Biblioteca Nativa do NodeJS
* [process.env]() - Arquivo de variáveis de ambiente


## ⚙️ Configurações
### Estrutura do arquivo .env
```env
API_URL=<api-de-testes-da-binance>
SYMBOL=BTCUSDT
QUANTITY=0.001
API_KEY=<api-key-binance>
SECRET_KEY=<secret-key-binance>
```

## 🗃️ Estrutura de Pastas e Arquivos
```shell
bot-cripto
    │   .env
    │   .gitattributes
    │   .gitignore
    │   package.json
    │   Readme.md
    │   yarn.lock
    └───src
          index-1.js
          index-2.js
```

## Execução 

```shell
# Executa a estratégia de média que compra em 90% e vende em 110%
$ npm run start-one

# Executa a estratégia de cruzamento de médias
$ npm run start-two
```
