import { getDatabase } from "../../src/lib/ourin-database.js";
import { addExpWithLevelCheck } from "../../src/lib/ourin-level.js";
import config from "../../config.js";

const pluginConfig = {
  name: "daily",
  alias: ["harian", "claim"],
  category: "user",
  description: "Klaim hadiah harian",
  usage: ".daily",
  example: ".daily",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 0,
  energi: 0,
  isEnabled: true,
};

function msToTime(duration) {
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const seconds = Math.floor((duration / 1000) % 60);
  return `${hours} jam ${minutes} menit ${seconds} detik`;
}

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);
  const isPremium = config.isPremium?.(m.sender) || false;

  if (!user.rpg) user.rpg = {};

  const COOLDOWN = 86400000;
  const lastClaim = user.rpg.lastDaily || 0;
  const now = Date.now();

  if (now - lastClaim < COOLDOWN) {
    const remaining = COOLDOWN - (now - lastClaim);
    return m.reply(`Sabar kak, jatah absen harian kamu udah diambil! 😂\n\nTunggu Waktu nya *${msToTime(remaining)}* Lagi ya buat ambil jatah besok. `);
  }

  const expReward = isPremium ? 2500000 : 250000;
  const moneyReward = isPremium ? 5000000 : 500000;
  const energiReward = isPremium ? 10000 : 150;

  user.rpg.lastDaily = now;
  user.koin = (user.koin || 0) + moneyReward;
  user.energi = (user.energi || 0) + energiReward;

  const levelResult = await addExpWithLevelCheck(sock, m, db, user, expReward);
  db.save();

  await m.react("🎁");

  let txt = `Selamat! Anda Telah Mengambil Reward Harian! 🎉✨\n\n`;
  txt += `Ini bagian Kamu buat hari ini:\n`;
  txt += `💸 Koin: *+Rp ${moneyReward.toLocaleString("id-ID")}*\n`;
  txt += `📈 EXP: *+${expReward.toLocaleString("id-ID")}*\n`;
  txt += `⚡ Energi: *+${energiReward}*\n\n`;
  
  if (isPremium) {
    txt += `👑 Selamat untuk bonus member premium! `;
  } else {
    txt += `Mau Bonus Lebih? *Upgrade ke Premium* 💎`;
  }

  m.reply(txt);
}

export { pluginConfig as config, handler };
