import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";

export interface BaseInteraction {
  builder: Pick<SlashCommandBuilder, "toJSON">;
  execute(interaction: CommandInteraction): void;
}

export interface MessageCommand {
  name: string;
  description: string;
  execute(message: Message): void;
}
