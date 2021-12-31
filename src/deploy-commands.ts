import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from 'fs';
import dotenv from "dotenv";
import { URL } from 'url';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const APP_ID = process.env.APP_ID || "";
const GUILD_ID =
  process.env.NODE_ENV === "production"
    ? process.env.PT_GUILD_ID || ""
    : process.env.TEST_GUILD_ID || "";

const commandFiles = fs
  .readdirSync(new URL("./commands/", import.meta.url))
  .filter(
    (file) => file.endsWith("js") || file.endsWith("mjs") || file.endsWith("ts")
  );

const commands = (await Promise.all(commandFiles.map(async (file) => {
  const module = await import(`./commands/${file}`);

  return module.default.builder;
}))).map((command) => command.toJSON());

console.log(commands);

const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_TOKEN);

console.log("Started refreshing application commands.");

rest
  .put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
