import dotenv from "dotenv";
import { Client, Collection, Intents } from "discord.js";
import fs from "fs";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("src/commands/")
  .filter((file) => file.endsWith("mjs"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction,
      reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
  }
});

// login
client.login(process.env.DISCORD_BOT_TOKEN);
