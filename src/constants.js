module.exports = {
  baseURL: 'http://localhost:9000/api',
  permissions: {
    textChannels: [
      "VIEW_CHANNEL",
      "MANAGE_CHANNELS",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "USE_EXTERNAL_STICKERS"
    ],
    voiceChannels: [
      "VIEW_CHANNEL",
      "MANAGE_CHANNELS",
      "CONNECT",
      "SPEAK",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "MOVE_MEMBERS",
      "USE_VAD",
      "PRIORITY_SPEAKER"
    ]
  },
}