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
        
Download Now Script 𝗢𝗨𝗥𝗜𝗡━𝗠𝗗 Fixed, Kunjungi link dibawah 👇🏻`,
        footer: "💬 Link ini nanti akan mengarahkan kamu ke web script OURIN 🌟",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🌟 OURIN AI 🌟",
                    url: "https://github.com/zzzvk54/OURIN-AI-MD",
                    merchant_url: "https://github.com/zzzvk54/OURIN-AI-MD"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }