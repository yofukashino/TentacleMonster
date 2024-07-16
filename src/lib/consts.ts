export const defaultSettings = {
  simple: true,
  simpleFormat: "normal",
  channels: 2,
  rate: 64000,
  voiceBitrate: 96,
  pacsize: 960,
  freq: 48000,
  attenuationFactor: 1,
  attenuation: false,
  customChannels: true,
  customFreq: true,
  customPacsize: true,
  customRate: true,
  customVoiceBitrate: false,
  priority: false,
  stereo: false,
  fec: false,
};

export const simpleFormats = {
  low: {
    channels: 1,
    rate: 32000,
    voiceBitrate: 92,
    pacsize: 450,
    freq: 24000,
    attenuationFactor: 1,
    attenuation: false,
    customChannels: true,
    customFreq: true,
    customPacsize: true,
    customRate: true,
    customVoiceBitrate: true,
  },
  normal: {
    channels: 2,
    rate: 64000,
    voiceBitrate: 96,
    pacsize: 960,
    freq: 48000,
    customChannels: false,
    customFreq: false,
    customPacsize: false,
    customRate: false,
    customVoiceBitrate: false,
    attenuationFactor: 1,
    attenuation: false,
  },
  medium: {
    channels: 4,
    rate: 92000,
    voiceBitrate: 128,
    pacsize: 1024,
    freq: 64000,
    customChannels: true,
    customFreq: true,
    customPacsize: true,
    customRate: true,
    customVoiceBitrate: true,
    attenuationFactor: 1,
    attenuation: true,
  },
  high: {
    channels: 4,
    rate: 92000,
    voiceBitrate: 256,
    pacsize: 1512,
    freq: 96000,
    customChannels: true,
    customFreq: true,
    customPacsize: true,
    customRate: true,
    customVoiceBitrate: true,
    attenuationFactor: 10,
    attenuation: false,
  },
  ultra: {
    channels: 6,
    rate: 128000,
    voiceBitrate: 512,
    pacsize: 2048,
    freq: 128000,
    customChannels: true,
    customFreq: true,
    customPacsize: true,
    customRate: true,
    customVoiceBitrate: true,
    attenuationFactor: 25,
    attenuation: true,
  },
  orgasm: {
    channels: 8,
    rate: 683000,
    voiceBitrate: 1512000,
    pacsize: 5128,
    freq: 195800,
    attenuationFactor: 75,
    attenuation: true,
    customChannels: true,
    customFreq: true,
    customPacsize: true,
    customRate: true,
    customVoiceBitrate: true,
  },
} as const;
