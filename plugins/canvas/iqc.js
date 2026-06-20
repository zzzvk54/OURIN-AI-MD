import te from "../../src/lib/ourin-error.js";
import moment from "moment-timezone";
import { generateIQC } from "iqc-canvas";

const pluginConfig = {
  name: "iqc",
  alias: ["iqchat", "iphonechat"],
  category: "canvas",
  description: "Membuat gambar chat iPhone style",
  usage: ".iqc <text>",
  example: ".iqc Hai cantik",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");
  if (!text) {
    return m.reply(
      `📱 *ɪǫᴄ ᴄʜᴀᴛ*\n\n> Masukkan teks untuk chat\n\n\`Contoh: ${m.prefix}iqc Hai cantik\``,
    );
  }

  m.react("🕕");

  try {
    const now = new Date();
    const time = moment(now).tz("Asia/Jakarta").format("HH.mm");

    const result = await generateIQC(text, time, {
      baterai: [true, "56"],
      operator: true,
      timebar: true,
      wifi: true,
    });

    if (!result.success) throw new Error("Gagal membuat IQC");

    m.react("✅");
    await sock.sendMedia(m.chat, result.image, `❄️ CREATED IS DONE ❄️\n---\n❖ Creator: Franklin\n❖ File Saved: 19/07/2024\n❖ Caption: Berhasil Mengambil Tangkapan Layar IPHONE!\n> LIMITED BY LEAF-AI`, m, {
      type: "image",
      mimetype: "image/png",
      fileName: `HD-${Date.now()}.png`,
    });
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
