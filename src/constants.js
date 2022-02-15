module.exports = {
  baseURL: 'http://192.168.1.135:9000/api',
  permissions: {
    textChannels: [
      { name: 'Ver canal', id: "VIEW_CHANNEL" },
      { name: 'Gestionar canal', id: "MANAGE_CHANNELS" },
      { name: 'Enviar mensajes', id: "SEND_MESSAGES" },
      { name: 'Enviar mensajes de texto a voz', id: "SEND_TTS_MESSAGES" },
      { name: 'Gestionar mensajes', id: "MANAGE_MESSAGES" },
      { name: 'Insertar enlaces', id: "EMBED_LINKS" },
      { name: 'Adjuntar archivos', id: "ATTACH_FILES" },
      { name: 'Leer el historial de mensajes', id: "READ_MESSAGE_HISTORY" },
      { name: 'Usar emojis externos', id: "USE_EXTERNAL_STICKERS" },
      { name: 'Mencionar @everyone, @here y todos los roles', id: 'MENTION_EVERYONE' }
    ],
    voiceChannels: [
      { name: 'Ver canal', id: "VIEW_CHANNEL" },
      { name: 'Gestionar canal', id: "MANAGE_CHANNELS" },
      { name: 'Conectar', id: "CONNECT" },
      { name: 'Hablar', id: "SPEAK" },
      { name: 'Video', id: "STREAM" },
      { name: 'Silenciar miembros', id: "MUTE_MEMBERS" },
      { name: 'Ensordecer miembros', id: "DEAFEN_MEMBERS" },
      { name: 'Mover miembros', id: "MOVE_MEMBERS" },
      { name: 'Usar actividad de voz', id: "USE_VAD" },
      { name: 'Prioridad de palabra', id: "PRIORITY_SPEAKER" }
    ]
  },
}