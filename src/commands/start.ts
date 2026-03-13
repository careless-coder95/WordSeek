import { Composer, InlineKeyboard, InputFile } from "grammy";
import { createReadStream } from "fs";

import { CommandsHelper } from "../util/commands-helper";

const composer = new Composer();

// ===== FILL YOUR LINKS HERE =====
const UPDATES_CHANNEL = "https://t.me/ll_CarelessxCoder_ll";
const DISCUSSION_GROUP = "https://t.me/CarelessxWorld";
const OWNER_LINK = "t.me/CarelessxOwner";
// ================================

composer.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    // 1st line
    .url(
      "⌯ ᴀᴅᴅ ᴍє ɪη ʏσᴜʀ ɢʀσᴜᴘ ⌯",
      `https://t.me/${ctx.me.username}?startgroup=true`,
    )

    // 2nd line
    .row()
    .text("⌯ ʜєʟᴘ ᴧηᴅ ᴄσᴍᴍᴧηᴅ ⌯", "help_howto")

    // 3rd line
    .row()
    .url("⌯ ᴜᴘᴅᴧᴛє ⌯", UPDATES_CHANNEL)
    .url("⌯ ᴅɪsᴄᴜssɪᴏη ⌯", DISCUSSION_GROUP)

    // 4th line
    .row()
    .url("⌯ ᴍʏ ᴍᴧsᴛєʀ ⌯", OWNER_LINK);

  const caption = `<b>ᴡσʀᴅѕєєᴋ ᴡєʟᴄσᴍєѕ ʏσᴜ!</b>

ᴧ ғᴜη ᴧηᴅ ᴄσᴍᴘєᴛɪᴛɪᴠє ᴡσʀᴅʟє-ѕᴛʏʟє ɢᴧᴍє ᴛʜᴧᴛ ʏσᴜ ᴄᴧη ᴘʟᴧʏ ᴅɪʀєᴄᴛʟʏ ση ᴛєʟєɢʀᴧᴍ.

<blockquote><b>Qᴜɪᴄᴋ Sᴛᴧʀᴛ</b>
• ᴜѕє /new ᴛσ ѕᴛᴧʀᴛ ᴧ new ɢᴧᴍє  
• ᴧᴅᴅ ᴍє ᴛσ ᴧ ɢʀσᴜᴘ ᴡɪᴛʜ ᴧᴅᴍɪɴ ᴘєʀᴍɪѕѕɪσηѕ ᴛσ ᴘʟᴧʏ ᴡɪᴛʜ ғʀɪєηᴅѕ  
• ᴜѕє /help ғσʀ ᴅєᴛᴧɪʟєᴅ ɪηѕᴛʀᴜᴄᴛɪσηѕ ᴧηᴅ ᴄσᴍᴍᴧηᴅ ʟɪѕᴛ</blockquote>

ʀєᴧᴅʏ ᴛσ ᴛєѕᴛ ʏσᴜʀ ᴡσʀᴅ ѕᴋɪʟʟѕ? ʟєᴛ'ѕ ᴘʟᴧʏ!`;

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
