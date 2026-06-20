import axios from 'axios'
import config from '../../config.js'
import { uploadTo0x0 } from '../../src/lib/ourin-tmpfiles.js'
import te from '../../src/lib/ourin-error.js'
const pluginConfig = {
    name: 'fakeff2',
    alias: ['freefirewarx2', 'ffwarx2', 'ffsolo2'],
    category: 'canvas',
    description: 'Membuat gambar ff',
    usage: '.freefire solo2 <text>',
    example: '.freefire solo2 Hai cantik',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const nama = m.text
    if(!nama) {
        return m.reply(`*FF RANDOM SOLO - SQUAD2*\n\n> Contoh: ${m.prefix}freefiresolo2 nama kamu`)
    }
    m.react('🕕')
    
    try {
        await sock.sendMedia(m.chat, `https://api.ourin.my.id/api/fake-free-fire-2?text=${encodeURIComponent(nama)}&bg=random`, null, m, {
            type: 'image',
        })
        
        m.react('✅')
        
    } catch (error) {
        m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }