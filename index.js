require(`dotenv`).config();

const Discord = require(`discord.js`);
const express = require(`express`);

const bot = new Discord.Client();

let channel;

bot.on(`ready`, () => {
    console.log(`${bot.user.tag} came online!`);
    channel = bot.channels.cache.get(`840627306099376158`)
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/`, (req, res) => {
    if (req.body.apiToken !== process.env.API_TOKEN) return res.send(`Invalid API token provided.`);
    channel?.send(req.body.data ?? "No content passed.");
    return res.send(`Successfully sent the embed.`);
});

app.listen(process.env.PORT, () =>
    console.log(`Message API listening on port ${process.env.PORT}!`),
);

bot.login(process.env.BOT_TOKEN);