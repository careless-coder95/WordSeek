import { Composer, InlineKeyboard } from "grammy";

import { env } from "../config/env";
import { CommandsHelper } from "../util/commands-helper";
import { DISCUSSION_GROUP, UPDATES_CHANNEL } from "../config/constants";

const composer = new Composer();

type HelpSection = "howto" | "scores" | "group" | "other" | "admin";

export function formatActiveButton(label: string, active: boolean) {
  return active ? `« ${label} »` : label;
}

function getTimezoneLabel(): string {
  const tz = env.TIME_ZONE || "UTC";

  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortOffset",
    });

    const parts = formatter.formatToParts(now);
    const tzName = parts.find((p) => p.type === "timeZoneName")?.value;

    const [, cityRaw] = tz.split("/");
    const city = cityRaw?.replace(/_/g, " ") ?? tz;

    if (city && tzName) return `${city} ᴛɪᴍᴇ (${tzName})`;
    if (city) return `${city} ᴛɪᴍᴇ`;
    return tz;
  } catch {
    return tz;
  }
}

export function getMainHelpKeyboard(
  shouldShowAdmin: boolean,
  active: HelpSection = "howto",
) {
  const keyboard = new InlineKeyboard()
    .text(formatActiveButton("ʜᴏᴡ ᴛᴏ ᴘʟᴀʏ", active === "howto"), "help_howto")
    .style(active == "howto" ? "primary" : undefined)
    .text(
      formatActiveButton("ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ & sᴄᴏʀᴇs", active === "scores"),
      "help_scores",
    )
    .style(active == "scores" ? "primary" : undefined)
    .row()
    .text(
      formatActiveButton("ɢʀᴏᴜᴘ sᴇᴛᴛɪɴɢs", active === "group"),
      "help_group",
    )
    .style(active == "group" ? "primary" : undefined)
    .text(
      formatActiveButton("ᴏᴛʜᴇʀ ᴄᴏᴍᴍᴀɴᴅs", active === "other"),
      "help_other",
    )
    .style(active == "other" ? "primary" : undefined);

  if (shouldShowAdmin) {
    keyboard
      .row()
      .text(
        formatActiveButton("👑 ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅs", active === "admin"),
        "help_admin",
      )
      .style(active == "admin" ? "primary" : undefined);
  }

  keyboard
    .row()
    .url("📢 ᴜᴘᴅᴀᴛᴇs", UPDATES_CHANNEL)
    .url("💬 ᴅɪsᴄᴜssɪᴏɴ", DISCUSSION_GROUP);

  return keyboard;
}

export function getHowToPlayMessage() {
  const timezoneLabel = getTimezoneLabel();

  return `<b>▸ ʜᴏᴡ ᴛᴏ ᴘʟᴀʏ ᴡᴏʀᴅsᴇᴇᴋ</b>

<blockquote>1. sᴛᴀʀᴛ ᴀ ɢᴀᴍᴇ ᴜsɪɴɢ /new, /new4, /new5, ᴏʀ /new6
2. ɢᴜᴇss ᴛʜᴇ ʜɪᴅᴅᴇɴ ᴡᴏʀᴅ
3. ᴀғᴛᴇʀ ᴇᴀᴄʜ ɢᴜᴇss, ʏᴏᴜ'ʟʟ ɢᴇᴛ ᴄᴏʟᴏʀ ʜɪɴᴛs:
   🟩 ᴄᴏʀʀᴇᴄᴛ ʟᴇᴛᴛᴇʀ ɪɴ ᴛʜᴇ ʀɪɢʜᴛ sᴘᴏᴛ
   🟨 ᴄᴏʀʀᴇᴄᴛ ʟᴇᴛᴛᴇʀ ɪɴ ᴛʜᴇ ᴡʀᴏɴɢ sᴘᴏᴛ
   🟥 ʟᴇᴛᴛᴇʀ ɴᴏᴛ ɪɴ ᴛʜᴇ ᴡᴏʀᴅ
4. ғɪʀsᴛ ᴘᴇʀsᴏɴ ᴛᴏ ɢᴜᴇss ᴄᴏʀʀᴇᴄᴛʟʏ ᴡɪɴs!
5. ᴍᴀxɪᴍᴜᴍ 30 ɢᴜᴇssᴇs ᴘᴇʀ ɢᴀᴍᴇ</blockquote>

<b>ᴡᴏʀᴅ ʟᴇɴɢᴛʜ ᴍᴏᴅᴇs:</b>
<blockquote>• /new → sᴛᴀʀᴛ ᴅᴇғᴀᴜʟᴛ 5-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /new 4 → sᴛᴀʀᴛ sᴘᴇᴄɪғɪᴄ ʟᴇɴɢᴛʜ (4, 5, ᴏʀ 6)
• /new4 → sᴛᴀʀᴛ 4-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /new5 → sᴛᴀʀᴛ 5-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /new6 → sᴛᴀʀᴛ 6-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ</blockquote>

<b>ʙᴀsɪᴄ ᴄᴏᴍᴍᴀɴᴅs:</b>
• /new - sᴛᴀʀᴛ ᴀ ɴᴇᴡ ɢᴀᴍᴇ (ᴅᴇғᴀᴜʟᴛ 5 ʟᴇᴛᴛᴇʀs)
• /new4 - sᴛᴀʀᴛ ᴀ 4-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /new5 - sᴛᴀʀᴛ ᴀ 5-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /new6 - sᴛᴀʀᴛ ᴀ 6-ʟᴇᴛᴛᴇʀ ɢᴀᴍᴇ
• /end - ᴇɴᴅ ᴄᴜʀʀᴇɴᴛ ɢᴀᴍᴇ (ᴠᴏᴛɪɴɢ ᴏʀ ᴀᴅᴍɪɴ ᴏɴʟʏ)
• /help - sʜᴏᴡ ᴛʜɪs ʜᴇʟᴘ ᴍᴇɴᴜ
• /daily - ᴘʟᴀʏ ᴅᴀɪʟʏ ᴡᴏʀᴅsᴇᴇᴋ (ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ ᴏɴʟʏ)
• /pausedaily - ᴘᴀᴜsᴇ ᴅᴀɪʟʏ ᴍᴏᴅᴇ ᴀɴᴅ ɢᴏ ʙᴀᴄᴋ ᴛᴏ ɴᴏʀᴍᴀʟ ɢᴀᴍᴇs

<b>ᴅᴀɪʟʏ ᴍᴏᴅᴇ (ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ ᴏɴʟʏ):</b>
<blockquote>• sᴛᴀʀᴛ ᴀ ᴅᴀɪʟʏ ɢᴀᴍᴇ ᴜsɪɴɢ /daily ᴄᴏᴍᴍᴀɴᴅ
• ᴡᴏʀᴋs ʟɪᴋᴇ ɴᴇᴡ ʏᴏʀᴋ ᴛɪᴍᴇs ᴡᴏʀᴅʟᴇ: ᴏɴᴇ ғɪxᴇᴅ ᴡᴏʀᴅ ᴘᴇʀ ᴅᴀʏ
• ʏᴏᴜ ᴏɴʟʏ ɢᴇᴛ 6 ɢᴜᴇssᴇs ᴘᴇʀ ᴅᴀɪʟʏ ᴘᴜᴢᴢʟᴇ
• ᴀ ɴᴇᴡ ᴘᴜᴢᴢʟᴇ ᴜɴʟᴏᴄᴋs ᴇᴠᴇʀʏ ᴅᴀʏ ᴀᴛ 06:00 ɪɴ <code>${timezoneLabel}</code>
• ʏᴏᴜ ʙᴜɪʟᴅ ᴀ sᴛʀᴇᴀᴋ ʙʏ sᴏʟᴠɪɴɢ ᴛʜᴇ ᴅᴀɪʟʏ ᴘᴜᴢᴢʟᴇ ᴡɪᴛʜᴏᴜᴛ ғᴀɪʟɪɴɢ
• ʏᴏᴜ ᴄᴀɴɴᴏᴛ ᴘʟᴀʏ ɴᴏʀᴍᴀʟ ᴡᴏʀᴅsᴇᴇᴋ ᴀɴᴅ ᴅᴀɪʟʏ ᴀᴛ ᴛʜᴇ sᴀᴍᴇ ᴛɪᴍᴇ:
  - ɪғ ᴀ ɴᴏʀᴍᴀʟ ɢᴀᴍᴇ ɪs ʀᴜɴɴɪɴɢ, ᴇɴᴅ ɪᴛ ʙᴇғᴏʀᴇ ᴜsɪɴɢ /daily
  - ɪғ ᴅᴀɪʟʏ ɪs ᴀᴄᴛɪᴠᴇ, ᴜsᴇ /pausedaily ᴛᴏ ᴘʟᴀʏ ɴᴏʀᴍᴀʟ ᴡᴏʀᴅsᴇᴇᴋ ᴀɢᴀɪɴ</blockquote>`;
}


export function getScoresMessage() {
  return `<b>▸ Leaderboard & Scores</b>

<b>Quick Examples:</b>
<blockquote><code>/leaderboard</code> - Group, today (default 5-letter)
<code>/leaderboard 4</code> - 4-letter leaderboard (group, today)
<code>/leaderboard global week 6</code> - Global rankings this week (6-letter mode)
<code>/leaderboard month</code> - This group's monthly leaderboard

<code>/score</code> - Your score (group, today, 5-letter by default)
<code>/score 6</code> - Your 6-letter stats
<code>/score @username global all 4</code> - Full 4-letter global history for a user
<code>/score 123456789 month</code> - Monthly stats for a user</blockquote>

<b>Leaderboard Command</b>
<blockquote><b>Syntax:</b> <code>/leaderboard [scope] [period] [length]</code>

All parameters are optional and can be used in any order.

<b>Scope:</b>
• <code>group</code> (default) - Current group only
• <code>global</code> - All groups combined

<b>Period:</b>
• <code>today</code> (default)
• <code>week</code>
• <code>month</code>
• <code>year</code>
• <code>all</code>

<b>Length:</b>
• <code>4</code> - 4-letter mode
• <code>5</code> - 5-letter mode (default)
• <code>6</code> - 6-letter mode</blockquote>

<b>Score Command</b>
<blockquote><b>Syntax:</b> <code>/score [target] [scope] [period] [length]</code>

All parameters are optional and can be used in any order.

<b>Target (optional):</b>
• Leave empty for your own score
• <code>@username</code> - Look up by username
• <code>user_id</code> - Look up by Telegram user ID

<b>Scope, period & length:</b>
Same as <code>/leaderboard</code></blockquote>`;
}



export function getGroupSettingsMessage() {
  return `<b>▸ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ & sᴄᴏʀᴇs</b>

<b>ǫᴜɪᴄᴋ ᴇxᴀᴍᴘʟᴇs:</b>
<blockquote><code>/leaderboard</code> - ɢʀᴏᴜᴘ, ᴛᴏᴅᴀʏ (ᴅᴇғᴀᴜʟᴛ 5-ʟᴇᴛᴛᴇʀ)
<code>/leaderboard 4</code> - 4-ʟᴇᴛᴛᴇʀ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ (ɢʀᴏᴜᴘ, ᴛᴏᴅᴀʏ)
<code>/leaderboard global week 6</code> - ɢʟᴏʙᴀʟ ʀᴀɴᴋɪɴɢs ᴛʜɪs ᴡᴇᴇᴋ (6-ʟᴇᴛᴛᴇʀ ᴍᴏᴅᴇ)
<code>/leaderboard month</code> - ᴛʜɪs ɢʀᴏᴜᴘ's ᴍᴏɴᴛʜʟʏ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ

<code>/score</code> - ʏᴏᴜʀ sᴄᴏʀᴇ (ɢʀᴏᴜᴘ, ᴛᴏᴅᴀʏ, 5-ʟᴇᴛᴛᴇʀ ʙʏ ᴅᴇғᴀᴜʟᴛ)
<code>/score 6</code> - ʏᴏᴜʀ 6-ʟᴇᴛᴛᴇʀ sᴛᴀᴛs
<code>/score @username global all 4</code> - ғᴜʟʟ 4-ʟᴇᴛᴛᴇʀ ɢʟᴏʙᴀʟ ʜɪsᴛᴏʀʏ ғᴏʀ ᴀ ᴜsᴇʀ
<code>/score 123456789 month</code> - ᴍᴏɴᴛʜʟʏ sᴛᴀᴛs ғᴏʀ ᴀ ᴜsᴇʀ</blockquote>

<b>ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ ᴄᴏᴍᴍᴀɴᴅ</b>
<blockquote><b>sʏɴᴛᴀx:</b> <code>/leaderboard [scope] [period] [length]</code>

ᴀʟʟ ᴘᴀʀᴀᴍᴇᴛᴇʀs ᴀʀᴇ ᴏᴘᴛɪᴏɴᴀʟ ᴀɴᴅ ᴄᴀɴ ʙᴇ ᴜsᴇᴅ ɪɴ ᴀɴʏ ᴏʀᴅᴇʀ.

<b>sᴄᴏᴘᴇ:</b>
• <code>group</code> (ᴅᴇғᴀᴜʟᴛ) - ᴄᴜʀʀᴇɴᴛ ɢʀᴏᴜᴘ ᴏɴʟʏ
• <code>global</code> - ᴀʟʟ ɢʀᴏᴜᴘs ᴄᴏᴍʙɪɴᴇᴅ

<b>ᴘᴇʀɪᴏᴅ:</b>
• <code>today</code> (ᴅᴇғᴀᴜʟᴛ)
• <code>week</code>
• <code>month</code>
• <code>year</code>
• <code>all</code>

<b>ʟᴇɴɢᴛʜ:</b>
• <code>4</code> - 4-ʟᴇᴛᴛᴇʀ ᴍᴏᴅᴇ
• <code>5</code> - 5-ʟᴇᴛᴛᴇʀ ᴍᴏᴅᴇ (ᴅᴇғᴀᴜʟᴛ)
• <code>6</code> - 6-ʟᴇᴛᴛᴇʀ ᴍᴏᴅᴇ</blockquote>

<b>sᴄᴏʀᴇ ᴄᴏᴍᴍᴀɴᴅ</b>
<blockquote><b>sʏɴᴛᴀx:</b> <code>/score [target] [scope] [period] [length]</code>

ᴀʟʟ ᴘᴀʀᴀᴍᴇᴛᴇʀs ᴀʀᴇ ᴏᴘᴛɪᴏɴᴀʟ ᴀɴᴅ ᴄᴀɴ ʙᴇ ᴜsᴇᴅ ɪɴ ᴀɴʏ ᴏʀᴅᴇʀ.

<b>ᴛᴀʀɢᴇᴛ (ᴏᴘᴛɪᴏɴᴀʟ):</b>
• ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ ғᴏʀ ʏᴏᴜʀ ᴏᴡɴ sᴄᴏʀᴇ
• <code>@username</code> - ʟᴏᴏᴋ ᴜᴘ ʙʏ ᴜsᴇʀɴᴀᴍᴇ
• <code>user_id</code> - ʟᴏᴏᴋ ᴜᴘ ʙʏ ᴛᴇʟᴇɢʀᴀᴍ ᴜsᴇʀ ɪᴅ

<b>sᴄᴏᴘᴇ, ᴘᴇʀɪᴏᴅ & ʟᴇɴɢᴛʜ:</b>
sᴀᴍᴇ ᴀs <code>/leaderboard</code></blockquote>`;


export function getOtherCommandsMessage() {
  return `<b>▸ ᴏᴛʜᴇʀ ᴄᴏᴍᴍᴀɴᴅs</b>

<blockquote><b>/id</b> - ɢᴇᴛ ᴍᴇssᴀɢᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ
ʀᴇᴘʟʏ ᴛᴏ ᴀɴʏ ᴍᴇssᴀɢᴇ ᴛᴏ sᴇᴇ:
• ᴍᴇssᴀɢᴇ ɪᴅ ᴀɴᴅ ᴅᴀᴛᴇ
• ᴜsᴇʀ ɪɴғᴏʀᴍᴀᴛɪᴏɴ
• ᴄʜᴀᴛ ɪɴғᴏʀᴍᴀᴛɪᴏɴ
• ғᴏʀᴡᴀʀᴅ ɪɴғᴏʀᴍᴀᴛɪᴏɴ (ɪғ ғᴏʀᴡᴀʀᴅᴇᴅ)
• ғɪʟᴇ ɪᴅs ғᴏʀ ᴍᴇᴅɪᴀ

<b>ᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ɪɴ ᴄᴀsᴇ ᴏғ ᴀ ɢʀᴏᴜᴘ</b></blockquote>`;
}

export function getAdminCommandsMessage() {
  return `<b>▸ ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅs (ʙᴏᴛ ᴏᴡɴᴇʀ ᴏɴʟʏ)</b>

<blockquote><b>/ban [user_id]</b>
ʙᴀɴ ᴀ ᴜsᴇʀ ғʀᴏᴍ ᴜsɪɴɢ ᴛʜᴇ ʙᴏᴛ ɢʟᴏʙᴀʟʏ

<b>/unban [user_id]</b>
ᴜɴʙᴀɴ ᴀ ᴘʀᴇᴠɪᴏᴜsʟʏ ʙᴀɴɴᴇᴅ ᴜsᴇʀ

<b>/stats</b>
ᴠɪᴇᴡ ʙᴏᴛ sᴛᴀᴛɪsᴛɪᴄs ɪɴᴄʟᴜᴅɪɴɢ:
• ᴛᴏᴛᴀʟ ᴜsᴇʀs ᴀɴᴅ ɢʀᴏᴜᴘs
• ᴍᴇᴍᴏʀʏ ᴀɴᴅ ᴄᴘᴜ ᴜsᴀɢᴇ
• ᴠᴘs ʟᴏᴀᴅ ᴀɴᴅ ʙᴏᴛ's ᴘᴇʀғᴏʀᴍᴀɴᴄᴇ

<b>/transfer &lt;from_user&gt; &lt;to_user&gt;</b>
ᴛʀᴀɴsғᴇʀ sᴄᴏʀᴇs ʙᴇᴛᴡᴇᴇɴ ᴜsᴇʀs

<b>/broadcast</b>
ʙʀᴏᴀᴅᴄᴀsᴛ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ᴀʟʟ ʙʀᴏᴀᴅᴄᴀsᴛᴀʙʟᴇ ᴄʜᴀᴛs (ɢʀᴏᴜᴘs ᴀɴᴅ ᴜsᴇʀs)
ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴡɪᴛʜ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ

<b>/track &lt;chat_id&gt;</b>
sᴛᴀʀᴛ ᴛʀᴀᴄᴋɪɴɢ ᴀ ᴄʜᴀᴛ ᴀɴᴅ sᴇɴᴅ ᴀʟʟ ᴍᴇssᴀɢᴇs ғʀᴏᴍ ᴛʜᴀᴛ ᴄʜᴀᴛ
ᴜsᴇ ɪᴛ ᴏɴʟʏ ғᴏʀ ᴅᴇᴛᴇᴄᴛɪɴɢ ᴄʜᴇᴀᴛᴇʀs

<b>/untrack &lt;chat_id&gt;</b>
sᴛᴏᴘ ᴛʀᴀᴄᴋɪɴɢ ᴀ ᴘʀᴇᴠɪᴏᴜsʟʏ ᴛʀᴀᴄᴋᴇᴅ ᴄʜᴀᴛ

<b>/tracklist</b>
sʜᴏᴡ ᴀʟʟ ᴄᴜʀʀᴇɴᴛʟʏ ᴛʀᴀᴄᴋᴇᴅ ᴄʜᴀᴛs</blockquote>`;
}


composer.command("help", async (ctx) => {
  if (!ctx.from) return;

  const shouldShowAdmin =
    env.ADMIN_USERS.includes(ctx.from.id) && ctx.chat.type === "private";
  const keyboard = getMainHelpKeyboard(shouldShowAdmin, "howto");

  await ctx.reply(getHowToPlayMessage(), {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

CommandsHelper.addNewCommand(
  "help",
  "ɢᴇᴛ ʜᴇʟᴘ ᴏɴ ʜᴏᴡ ᴛᴏ ᴘʟᴀʏ ᴀɴᴅ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ",
);

export const helpCommand = composer;
