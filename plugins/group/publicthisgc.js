import { getDatabase } from "../../src/lib/ourin-database.js";
import te from "../../src/lib/ourin-error.js";
import config from "../../config.js";

const pluginConfig = {
  name: "publicthisgc",
  alias: ["publicgc", "publicgraup", "gcpublic", "ongc", "gcon"],
  category: "group",
  description: "Aktifkan mode public hanya di grup ini",
  usage: ".publicgc",
  example: ".unlockgc",
  isOwner: false,
  isPremium: true,
  isGroup: true,
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
  const isPublicGroup = publicGroups.includes(m.chat);

  if (isPublicGroup && !isSelfGroup) {
    return m.reply(
      `ℹ️ *ɢʀᴜᴘ ɪɴɪ sᴜᴅᴀʜ ᴍᴏᴅᴇ ᴘᴜʙʟɪᴄ/ᴏɴʟɪɴᴇ*\n\n` +
        `> Bot merespon semua member di grup ini\n\n` +
        `_Gunakan ${m.prefix}offgc untuk kembali offline_`,
    );
  }

  const updatedSelf = selfGroups.filter((id) => id !== m.chat);
  db.setting("selfGroups", updatedSelf);

  if (!publicGroups.includes(m.chat)) {
    db.setting("publicGroups", [...publicGroups, m.chat]);
  }

  m.react("🌐");
  return m.reply(
    `🌐 *ᴍᴏᴅᴇ ᴘᴜʙʟɪᴄ ᴅɪᴀᴋᴛɪꜰᴋᴀsɪ*\n\n` +
      `> Bot sekarang merespon semua member di grup ini\n` +
      `> Override mode global aktif untuk grup ini\n\n` +
      `📋 *Grup lain tidak terpengaruh*\n\n` +
      `_Gunakan ${m.prefix}offgc untuk kembali offline_`,
  );
}

export { pluginConfig as config, handler };
