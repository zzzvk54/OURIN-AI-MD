import { getDatabase } from "../../src/lib/ourin-database.js";
import te from "../../src/lib/ourin-error.js";
import config from "../../config.js";

const pluginConfig = {
  name: "selfthisgc",
  alias: ["selfgc", "selfgroup", "kuncigc", "privategc", "offgc", "gcoff"],
  category: "group",
  description: "Aktifkan mode self hanya di grup ini",
  usage: ".selfgc",
  example: ".lockgc",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const selfGroups = db.setting("selfGroups") || [];
  const publicGroups = db.setting("publicGroups") || [];

  const isSelfGroup = selfGroups.includes(m.chat);

  if (isSelfGroup) {
    return m.reply(
      `ℹ️ *ɢʀᴜᴘ ɪɴɪ sᴜᴅᴀʜ ᴍᴏᴅᴇ sᴇʟꜰ/ᴏꜰꜰʟɪɴᴇ*\n\n` +
        `> Bot hanya merespon owner & bot sendiri\n\n` +
        `_Gunakan ${m.prefix}ongc untuk kembali online_`,
    );
  }

  if (!selfGroups.includes(m.chat)) {
    db.setting("selfGroups", [...selfGroups, m.chat]);
  }

  const updatedPublic = publicGroups.filter((id) => id !== m.chat);
  db.setting("publicGroups", updatedPublic);

  m.react("🔒");
  return m.reply(
    `🔒 *ᴍᴏᴅᴇ sᴇʟꜰ/ᴏꜰꜰʟɪɴᴇ ᴀᴋᴛɪꜰ*\n\n` +
      `> Bot di grup ini sekarang hanya merespon:\n` +
      `> • Owner bot\n` +
      `> • Bot sendiri (fromMe)\n\n` +
      `📋 *Grup lain tidak terpengaruh*\n\n` +
      `_Gunakan ${m.prefix}ongc untuk kembali online_`,
  );
}

export { pluginConfig as config, handler };
