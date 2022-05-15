import { Message, Snowflake } from "discord.js";
import { MessageCommand } from "../baseCommand";

const pin: MessageCommand = {
  name: "pin",
  description: "Pin message.",
  execute: async (message: Message) => {
    if (message.type === "REPLY" && message.reference) {
      if (
        "reference" in message &&
        "messageId" in message.reference &&
        typeof message.reference.messageId === "string"
      ) {
        const messageId: Snowflake = message.reference.messageId;
        message.channel.messages
          .fetch(messageId)
          .then((m: Message) => m.pin().catch(console.error))
          .catch(console.error);
      }
    }
  },
};

export default pin;
