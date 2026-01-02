const TelegramBot = require("node-telegram-bot-api");
const { generateWallets } = require("./wallet");

/* ===============================
   EXPRESS SERVER (ANTI SLEEP)
================================ */
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running..");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Web server running on port", PORT);
});

/* ===============================
   TELEGRAM BOT
================================ */
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN not set");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const sessions = {};

bot.onText(/\/start/, (msg) => {
  sessions[msg.chat.id] = { step: "seed" };
  bot.sendMessage(msg.chat.id, "Masukkan seed phrase (12 / 24 kata):");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (!sessions[chatId] || msg.text.startsWith("/")) return;

  const session = sessions[chatId];

  if (session.step === "seed") {
    session.seed = msg.text.trim();
    session.step = "count";
    return bot.sendMessage(chatId, "Mau generate berapa wallet? (max 100)");
  }

  if (session.step === "count") {
    const count = parseInt(msg.text);
    if (isNaN(count) || count <= 0 || count > 100) {
      return bot.sendMessage(chatId, "Masukkan angka yang valid (1–100)");
    }
    session.count = count;
    session.step = "pk";
    return bot.sendMessage(chatId, "Tampilkan private key? (on / off)");
  }

  if (session.step === "pk") {
    const opt = msg.text.toLowerCase();
    if (!["on", "off"].includes(opt)) {
      return bot.sendMessage(chatId, "Ketik: on atau off");
    }

    const showPK = opt === "on";
    const wallets = generateWallets(session.seed, session.count);

    for (const w of wallets) {
      let message =
        `Index ${w.index}\nAddress:\n\`${w.address}\``;

      if (showPK) {
        message += `\n\nPk:\n||${w.privateKey}||`;
      }

      await bot.sendMessage(chatId, message, {
        parse_mode: "MarkdownV2"
      });
      await new Promise(r => setTimeout(r, 250));
    }

    delete sessions[chatId];
  }
});
