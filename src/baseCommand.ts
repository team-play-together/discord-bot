import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export interface BaseInteraction {
  builder: SlashCommandBuilder;
  execute(interaction: CommandInteraction): void;
}
