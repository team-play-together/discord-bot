import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BaseInteraction } from "../baseCommand";

const user: BaseInteraction = {
  builder: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("User info.");
  },
};

export default user;
