import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export interface BaseInteraction {
  builder: Pick<SlashCommandBuilder, "toJSON">;
  execute(interaction: CommandInteraction): void;
}
