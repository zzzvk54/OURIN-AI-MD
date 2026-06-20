import { getAssetBuffer } from "../../src/lib/ourin-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "sc",
    alias: ["script"],
    category: "main",
    description: "Link script bot wa terbaru",
    usage: ".sc",
    example: ".sc",
    isPremium: false,
    isOwner: false,
    isBanned: false,
    isAdmin: false,
    cooldown: 10,
    energi: 0,
    isBotAdmin: false,
    isEnabled: true
}

async function handler(m, { sock }) {
    return await sock.sendMessage(m.chat, {
        image: getAssetBuffer("ourin"),
        caption: `🌾 Halo kak *${m.pushName}*
        
Jika anda Ingin Membeli Script 𝗢𝗨𝗥𝗜𝗡━𝗠𝗗 No ERROR + PREM bisa Kunjungi saluran OURIN dibawah 👇🏻`,
        footer: "💬 Link ini nanti akan mengarahkan kamu ke INFO OURIN 🌟",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🌟 OURIN CHANNEL 🌟",
                    url: "https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t",
                    merchant_url: "https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }