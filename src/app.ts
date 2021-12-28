import dotenv from 'dotenv';
import { Client, Intents } from "discord.js";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready!');
});

// login
client.login(process.env.DISCORD_BOT_TOKEN);
