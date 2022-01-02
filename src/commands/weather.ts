import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BaseInteraction } from "../baseCommand";
import fetch from "node-fetch";

interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const API_BASE = "https://api.openweathermap.org/data/2.5";
const APP_ID = process.env.OPEN_WEATHER_API_KEY;
const CURRENT_API = `${API_BASE}/weather`;

const weather: BaseInteraction = {
  builder: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get weather")
    .addStringOption((option) =>
      option.setName("city").setDescription("city weather")
    ),
  execute: async (interaction: CommandInteraction) => {
    if (APP_ID === undefined) return;

    const default_query = {
      appid: APP_ID,
      units: "metric",
      lang: "kr",
    };
    let query;

    const city = interaction.options.getString("city");
    if (city === null) {
      query = { ...default_query, ...{ id: "1835848" } };
    } else {
      query = { ...default_query, ...{ q: city } };
    }

    const param = new URLSearchParams(query);

    const response = await fetch(`${CURRENT_API}?${param.toString()}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data: WeatherResponse = <WeatherResponse>await response.json();

      const name = data["name"];
      const weather = data["weather"][0];

      const main = weather["main"];
      const desc = weather["description"];

      await interaction.reply(`${name}: ${main} - ${desc}`);
    } else {
      await interaction.reply(`${city} is not found`);
    }
  },
};

export default weather;
