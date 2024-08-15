/*
 * INDEX-1.JS
 * Exemplo didático de estratégia com uma média (compra em 90%, vende em 110%).
 */

import axios from "axios";
import crypto from "crypto";

let isOpened = false;

function calcSMA(data) {
  const closes = data.map((candle) => parseFloat(candle[4])); //pega somente os fechamentos
  const sum = closes.reduce((a, b) => a + b); //somatório de fechamentos
  return sum / data.length; //média simples
}

async function start() {
  const { data } = await axios.get(
    process.env.API_URL +
      "/api/v3/klines?limit=21&interval=15m&symbol=" +
      process.env.SYMBOL
  ); //pega 21 velas de 15min
  const candle = data[data.length - 1]; //pega última vela
  const price = parseFloat(candle[4]); //pega preço de fechameno

  console.clear();
  console.log("Price: " + price);

  const sma = calcSMA(data);
  console.log("SMA: " + sma);
  console.log("Is Opened? " + isOpened);

  if (price < sma * 0.9 && isOpened === false) {
    isOpened = true;
    newOrder(process.env.SYMBOL, process.env.QUANTITY, "BUY");
  } else if (price > sma * 1.1 && isOpened === true) {
    newOrder(process.env.SYMBOL, process.env.QUANTITY, "SELL");
    isOpened = false;
  }
}

async function newOrder(symbol, quantity, side) {
  const order = { symbol, quantity, side };
  order.type = "MARKET";
  order.timestamp = Date.now();

  const signature = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(new URLSearchParams(order).toString())
    .digest("hex");

  order.signature = signature;

  try {
    const { data } = await axios.post(
      process.env.API_URL + "/api/v3/order",
      new URLSearchParams(order).toString(),
      {
        headers: { "X-MBX-APIKEY": process.env.API_KEY },
      }
    );

    console.log(data);
  } catch (err) {
    //para erros e soluções com essa API, consulte https://www.luiztools.com.br/post/erros-comuns-com-as-apis-da-binance/
    console.error(err.response.data);
  }
}

setInterval(start, 3000);

start();
