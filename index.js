const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 34160;
const SELL_PRICE = 34501;

const API_URL = "https://testnet.binance.vision"; //https://api.binance.com

let isOpened = false;

// Sync Move Average - Média Móvel Simples
function calcSMA(data) {
  // Array de valores de fechamento
  const closes = data.map((candle) => parseFloat(candle[4]));
  const sum = closes.reduce((a, b) => a + b);
  return sum / data.length;
}

async function start() {
  const { data } = await axios.get(
    API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL
  );
  const candle = data[data.length - 1];
  const price = parseFloat(candle[4]);

  console.clear();
  console.log("Price: " + price);

  const sma21 = calcSMA(data);
  const sma13 = calcSMA(data.slice(8));
  console.log("SMA(13): " + sma13);
  console.log("SMA(21): " + sma21);
  console.log("Is Opened? " + isOpened);

  if (sma13 > sma21 && isOpened === false) {
    isOpened = true;
    console.log("comprar");
  } else if ( sma13 < sma21 && isOpened === true) {
    console.log("vender");
    isOpened = false;
  } else console.log("aguardar");
}

setInterval(start, 3000);

start();
