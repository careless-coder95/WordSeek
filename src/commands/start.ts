import { Composer, InlineKeyboard, InputFile } from "grammy";

import { createReadStream } from "fs";

import { DISCUSSION_GROUP, UPDATES_CHANNEL } from "../config/constants";
import { CommandsHelper } from "../util/commands-helper";

const composer = new Composer();

composer.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    // 1st line
    .url(
      "Add Me To Your Group",
      `https://t.me/${ctx.me.username}?startgroup=true`,
    )

    // 2nd line
    .row()
    .text("Help and Commands", "help_howto")

    // 3rd line
    .row()
    .url("Updates", UPDATES_CHANNEL)
    .url("Discussions", DISCUSSION_GROUP)

    // 4th line
    .row()
    .url("Owner", "https://t.me/yourusername");
});

  const caption = `<b>Welcome to WordSeek!</b>

A fun and competitive Wordle-style game that you can play directly on Telegram.

<blockquote><b>Quick Start:</b>
• Use /new to start a new game
• Add me to a group with admin permissions to play with friends
• Use /help for detailed instructions and command list</blockquote>

Ready to test your word skills? Let's play!`;

  try {
    await ctx.replyWithPhoto(
      new InputFile(createReadStream("./src/data/banner.png")),
      {
        caption,
        parse_mode: "HTML",
        reply_markup: keyboard,
      },
    );
  } catch {
    await ctx.reply(caption, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  }
});

CommandsHelper.addNewCommand("start", "Start the bot");

export const startCommand = composer;
