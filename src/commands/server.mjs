import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with server info!");

export async function execute(interaction) {
  await interaction.reply("Server info.");
}
