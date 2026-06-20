import te from "../../src/lib/ourin-error.js";
import winkEnhance from "../../src/scraper/wink.js";

const pluginConfig = {
  name: "wink2",
  alias: ["winkenhance2", "winkhd2", "wenhance2"],
  category: "tools",
  description: "Meningkatkan kualitas foto menjadi Ultra HD dengan Wink AI",
  usage: ".wink2 (reply foto)",
  example: ".wink2",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 120,
  energi: 5,
  isEnabled: true,
};

async function handler(m, { sock }) {
  let isImageMessage = m.isImage || (m.quoted && m.quoted.type === "imageMessage");
  let isDocumentMessage = (m.type === "documentMessage" && m.message?.documentMessage?.mimetype?.startsWith("image")) || (m.quoted && m.quoted.type === "documentMessage" && m.quoted.message?.documentMessage?.mimetype?.startsWith("image"));

  if (!isImageMessage && !isDocumentMessage) {
    return m.reply(
      `✨ *ᴡɪɴᴋ ᴠɪᴅᴇᴏ ᴇɴʜᴀɴᴄᴇʀ*\n\n` +
        `> Bikin foto buram jadi *Ultra HD* pakai AI Wink!\n\n` +
        `*Cara pakai:*\n` +
        `> Kirim/reply foto lalu caption \`${m.prefix}wink\`\n\n` +
        `⚠️ _Fitur Premium, proses estimasi 1-5 menit tergantung durasi foto_`,
    );
  }

  await m.react("🕕");

  try {
    const imageBuffer = (await m?.quoted?.download?.()) || (await m.download?.());

    if (!imageBuffer || imageBuffer.length === 0) {
      await m.react("❌");
      return m.reply(`❌ *GAGAL*\n\nFotonya gagal diunduh, coba kirim ulang ya!`);
    }

    if (imageBuffer.length > 50 * 1024 * 1024) {
      await m.react("❌");
      return m.reply(`❌ *FILE TERLALU BESAR*\n\nMaksimal ukuran foto cuma *50MB* ya!`);
    }

    await m.reply(
      `🎬 *ᴘʀᴏsᴇs ᴡɪɴᴋ ᴇɴʜᴀɴᴄᴇ ᴅɪᴍᴜʟᴀɪ*\n\n` +
        `> Foto lagi diproses AI Wink biar jadi *Ultra HD* ✨\n` +
        `> Estimasi *1-5 menit*, mohon sabar ya!`,
    );

    const result = await winkEnhance(imageBuffer, {
      filename: `wink-${Date.now()}.png`,
    });

    await sock.sendMedia(m.chat, result.resultUrl, `✨ *ᴡɪɴᴋ ᴇɴʜᴀɴᴄᴇ sᴇʟᴇsᴀɪ!*\n\n> Ini dia hasilnya, udah jadi *Ultra HD* kan? 😍`, m, {
      type: "image",
      mimetype: "image/png",
      fileName: `WINK-HD-${Date.now()}.png`,
    });

    await m.react("✅");
  } catch (err) {
    console.log(err);
    await m.react("❌");
    await m.reply(`❌ Proses Wink enhance gagal! Coba lagi nanti ya 😭`);
  }
}

export { pluginConfig as config, handler };
