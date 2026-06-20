import { AIRich } from "../../src/lib/ourin-builder.js"
import { performance } from "perf_hooks"
import os from "os"
import { getAssetBuffer } from "../../src/lib/ourin-asset-manager.js"
import config from "../../config.js"
import te from "../../src/lib/ourin-error.js"

const pluginConfig = {
  name: "ping",
  alias: ["speed2", "p2", "latency2", "sys2", "status2", "ping2"],
  category: "main",
  description: "Cek performa dan status sistem bot secara real-time",
  usage: ".ping",
  example: ".ping2",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
}

const fmtUp = (s) => {
  s = Number(s)
  const d = Math.floor(s / 86400),
    h = Math.floor((s % 86400) / 3600),
    m = Math.floor((s % 3600) / 60),
    sc = Math.floor(s % 60)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${sc}s`
  return `${m}m ${sc}s`
}

const fmtSize = (b) => {
  if (!b || b === 0) return "0 B"
  const u = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(b) / Math.log(1024))
  return (b / Math.pow(1024, i)).toFixed(2) + " " + u[i]
}

async function handler(m, { sock }) {
  try {
    const tStart = performance.now()

    const botName = config.bot?.name || "Ourin-AI"

    // CPU Info
    const cpus = os.cpus()
    const cpuModel = cpus[0]?.model || "Unknown CPU"
    const cpuSpeed = cpus[0]?.speed || 0
    const cpuCores = cpus.length

    // Memory Info
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    const memPct = ((usedMem / totalMem) * 100).toFixed(1)

    // Node Info
    const memoryUsage = process.memoryUsage()

    // Uptime
    const uptimeBot = fmtUp(process.uptime())
    const uptimeOS = fmtUp(os.uptime())

    // OS Load
    const loadAvg = os.loadavg()
    const load1m = loadAvg[0].toFixed(2)
    const load5m = loadAvg[1].toFixed(2)
    const load15m = loadAvg[2].toFixed(2)

    const builder = new AIRich(sock)

    builder.addProduct({
      title: "Ping",
      brand: config.bot.name,
      price: 'Informasi tentang spesifikasi sistem',
      sale_price: '',
      product_url: config.info.website,
      icon_url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/additional_image_1.png",
      image_url: "https://gimita.id/ourin.png"
    })

    const tEnd = performance.now()
    const execTime = (tEnd - tStart).toFixed(2)

    const serverDetails =
      `🏓 *Time Record!* (${execTime}ms)\n\n` +
      `Berikut adalah detail spesifikasi dan performa server secara lengkap:\n\n` +

      `🖥️ *INFORMASI SISTEM*\n` +
      `> ◦ *OS:* ${os.type()} (${os.release()})\n` +
      `> ◦ *Platform:* ${os.platform()} (${os.arch()})\n` +
      `> ◦ *Hostname:* ${os.hostname()}\n` +
      `> ◦ *NodeJS:* ${process.version}\n` +
      `> ◦ *Engine V8:* ${process.versions.v8}\n\n` +

      `💻 *INFORMASI CPU*\n` +
      `> ◦ *Model:* ${cpuModel.trim()}\n` +
      `> ◦ *Cores:* ${cpuCores} Core(s)\n` +
      `> ◦ *Speed:* ${cpuSpeed} MHz\n` +
      `> ◦ *Load Avg:* ${load1m} (1m), ${load5m} (5m), ${load15m} (15m)\n\n` +

      `🧠 *PENGGUNAAN MEMORI*\n` +
      `> ◦ *Total RAM:* ${fmtSize(totalMem)}\n` +
      `> ◦ *Dipakai:* ${fmtSize(usedMem)} (${memPct}%)\n` +
      `> ◦ *Sisa Bebas:* ${fmtSize(freeMem)}\n\n` +

      `📦 *MEMORI NODEJS*\n` +
      `> ◦ *RSS:* ${fmtSize(memoryUsage.rss)}\n` +
      `> ◦ *Heap Total:* ${fmtSize(memoryUsage.heapTotal)}\n` +
      `> ◦ *Heap Used:* ${fmtSize(memoryUsage.heapUsed)}\n` +
      `> ◦ *External:* ${fmtSize(memoryUsage.external)}\n\n` +

      `⏱️ *WAKTU AKTIF (UPTIME)*\n` +
      `> ◦ *Uptime Server:* ${uptimeOS}\n` +
      `> ◦ *Uptime Bot:* ${uptimeBot}\n\n` +

      `Sistem berjalan stabil dan menyelesaikan kalkulasi dalam waktu eksekusi *${execTime}ms*.`

    builder.addText(serverDetails)

    await builder.send(m.chat, { quoted: m })
    await m.react("✅")
  } catch (error) {
    console.log(error)
    await m.react("☢")
    m.reply(te(m.prefix, m.command, m.pushName))
  }
}

export { pluginConfig as config, handler }
