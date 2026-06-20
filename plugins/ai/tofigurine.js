import te from '../../src/lib/ourin-error.js'
import { live3d } from '../../src/scraper/seaart.js'
const pluginConfig = {
    name: 'tofigure3',
    alias: ['figurine3', 'tofigure3', 'f', 'realis', 'realistis', 'k', 'a', 'r', 'z'],
    category: 'ai',
    description: 'Ubah foto menjadi keren/realistis',
    usage: '.realistic (reply/kirim gambar)',
    example: '.realistic',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 60,
    energi: 5,
    isEnabled: true
}

const PROMPT = `Using the real life model, Keep alive this face remains in photo don't change, Make a real world anime with live-action cosplay scene. with slightly long hair and all of her hair, with 4 friends and a friend wearing nice clothes random between men and women. The background is a random place at night or day, a real realistic random place and butterflies in colors between green - red - yellow - orange - white - blue - purple - pink that glow, and other visual effects like fog and aesthetic.`

async function handler(m, { sock }) {
    const isImage = m.isImage || (m.quoted && (m.quoted.isImage || m.quoted.type === 'imageMessage'))
    
    if (!isImage) {
        return m.reply(
            `🎭 *ᴄʀᴇᴀᴛᴇᴅ ʀᴇᴀʟɪꜰᴇ *\n\n` +
            `> Kirim/reply gambar untuk diubah ke figurine/action figure\n\n` +
            `\`${m.prefix}tofigure3\``
        )
    }
    
    m.react('🕕')
    
    try {
        let buffer
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download()
        } else if (m.isMedia) {
            buffer = await m.download()
        }
        
        if (!buffer) {
            m.react('❌')
            return m.reply(`❌ Gagal mendownload gambar`)
        }
        
        
        
        const result = await live3d(buffer, PROMPT)
        
        m.react('✅')
        
        await sock.sendMedia(m.chat, result.image, `❄️ CREATED IS DONE ❄️\n---\n❖ Creator: Heru\n❖ File Saved: 19/07/2015\n❖ Caption: Foto Telah diubah Menjadi KEREN!\n> LIMITED BY_LEAF-AI`, m, {
      type: "image",
      mimetype: "image/png",
      fileName: `HD-${Date.now()}.png`,
        })
        
    } catch (error) {
        m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }