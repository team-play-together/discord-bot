import {
  Client,
  Collection,
  CommandInteraction,
  Intents,
  Interaction,
  Message,
} from "discord.js";
import "dotenv/config";
import fs from "fs";
import { URL } from "url";
import { BaseInteraction, MessageCommand } from "./commands/baseCommand";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const COMMAND_PREFIX = "/";
const COMMAND_PATH = "./commands/";

client.once("ready", () => {
  console.log("Ready!");
});

const MESSAEG_COMMNAD_PATH = `${COMMAND_PATH}/message`;
const messageCommands: Collection<string, MessageCommand> = new Collection();
const messageCommandFiles = fs
  .readdirSync(new URL(MESSAEG_COMMNAD_PATH, import.meta.url))
  .filter(
    (file) => file.endsWith("js") || file.endsWith("mjs") || file.endsWith("ts")
  );

for (const file of messageCommandFiles) {
  const command = await import(`${MESSAEG_COMMNAD_PATH}/${file}`);

  messageCommands.set(command.default.name, command.default);
}

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;

  const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = messageCommands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message);
  } catch (error) {
    console.error(error);
  }
});

// Slash commands
const SLASH_COMMAND_PATH = `${COMMAND_PATH}/slash`;
const slashCommands: Collection<string, BaseInteraction> = new Collection();
const slashCommandFiles = fs
  .readdirSync(new URL(SLASH_COMMAND_PATH, import.meta.url))
  .filter(
    (file) => file.endsWith("js") || file.endsWith("mjs") || file.endsWith("ts")
  );

for (const file of slashCommandFiles) {
  const command = await import(`${SLASH_COMMAND_PATH}/${file}`);

  slashCommands.set(command.default.builder.name, command.default);
}

client.on(
  "interactionCreate",
  async (interaction: Interaction | CommandInteraction) => {
    if (!interaction.isCommand()) return;

    const command = slashCommands.get(interaction.commandName);

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
