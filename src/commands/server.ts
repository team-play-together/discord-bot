import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BaseInteraction } from "../baseCommand";

const server: BaseInteraction = {
  builder: new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with server info!"),
  execute: async (interaction: CommandInteraction) => {
  await interaction.reply("Server info.");
  },
}

export default server;

