import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BaseInteraction } from "../baseCommand";
import { DateTime } from "luxon";

const time: BaseInteraction = {
  builder: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Return current time"),
  execute: async (interaction: CommandInteraction) => {
    const now = DateTime.now();

    await interaction.reply(toFormat(now));
  },
};

function toFormat(dateTime: DateTime): string {
  function format(dt: DateTime) {
    return dt.setLocale("en").toFormat("ff");
  }
  return (
    "UTC: " +
    format(dateTime.toUTC()) +
    "\n" +
    "KST: " +
    format(dateTime.setZone("Asia/Seoul")) +
    "\n" +
    "PST: " +
    format(dateTime.setZone("America/Los_Angeles"))
  );
}

export default time;
