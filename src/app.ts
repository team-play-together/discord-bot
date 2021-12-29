import dotenv from "dotenv";
import { Client, Collection, Intents, CommandInteraction, Interaction } from "discord.js";
import fs from "fs";
import { BaseInteraction } from "./baseCommand";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands: Collection<string, BaseInteraction> = new Collection();

const commandFiles = fs
  .readdirSync("dist/commands/")
  .filter((file) => file.endsWith("ts"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);

  commands.set(command.builder.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction|CommandInteraction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.
      reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
  }
});

// login
client.login(process.env.DISCORD_BOT_TOKEN);
