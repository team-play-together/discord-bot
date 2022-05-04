import {
  Client,
  Collection,
  CommandInteraction,
  Intents,
  Interaction,
} from "discord.js";
import "dotenv/config";
import fs from "fs";
import { URL } from "url";
import { BaseInteraction } from "./baseCommand";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands: Collection<string, BaseInteraction> = new Collection();

const commandFiles = fs
  .readdirSync(new URL("./commands/", import.meta.url))
  .filter(
    (file) => file.endsWith("js") || file.endsWith("mjs") || file.endsWith("ts")
  );

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);

  commands.set(command.default.builder.name, command.default);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on(
  "interactionCreate",
  async (interaction: Interaction | CommandInteraction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
);

// login
client.login(process.env.DISCORD_BOT_TOKEN);
