import { getAssetBuffer } from "../../src/lib/ourin-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "owner",
    alias: ["creator", "dev", "developer"],
    category: "main",
    description: "Menampilkan Nomor Owner",
    usage: ".owner",
    example: ".owner",
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
        
Jika Kamu Butuh kontak... boleh save No Owner nya "𝗢𝗨𝗥𝗜𝗡", kamu bisa Hub Lewat Tautan dibawah 👇🏻`,
        footer: "💬 Link ini nanti akan mengarahkan kamu ke nomornya langsung",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Click Here",
                    url: "https://wa.me/6283117591571?text=Save+No+saya+Bro",
                    merchant_url: "https://wa.me/6283117591571?text=Save+No+saya+Bro"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }