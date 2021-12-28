import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Replies with user info!");

export async function execute(interaction) {
  await interaction.reply("User info.");
}
