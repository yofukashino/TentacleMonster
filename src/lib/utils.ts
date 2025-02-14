import { users as UltimateUserStore } from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "./consts";
import Modules from "./requiredModules";
import Types from "../types";

export const updateVoiceConnection = (): void => {
  const connection = Array.from(
    Modules.MediaEngineStore!.getMediaEngine().connections.values(),
  ).find((c) => c.context === "default")!;
  if (!connection) return;

  if (SettingValues.get("priority", defaultSettings.priority))
    connection.setCanHavePriority(UltimateUserStore.getCurrentUser().id, true);

  const options = {} as Types.TransportArg;

  if (SettingValues.get("attenuation", defaultSettings.attenuation)) {
    options.attenuation = true;
    options.attenuateWhileSpeakingSelf = false;
    options.attenuateWhileSpeakingOthers = true;
    options.attenuationFactor = SettingValues.get(
      "attenuationFactor",
      defaultSettings.attenuationFactor,
    );
  }

  if (SettingValues.get("priority", defaultSettings.priority)) options.prioritySpeakerDucking = 95;

  options.audioEncoder = {
    channels: SettingValues.get("customChannels", defaultSettings.customChannels)
      ? SettingValues.get("channels", defaultSettings.channels)
      : defaultSettings.channels,
    freq: SettingValues.get("customFreq", defaultSettings.customFreq)
      ? SettingValues.get("freq", defaultSettings.freq)
      : defaultSettings.freq,
    rate: SettingValues.get("customRate", defaultSettings.customRate)
      ? SettingValues.get("rate", defaultSettings.rate)
      : defaultSettings.rate,
    pacsize: SettingValues.get("customPacsize", defaultSettings.customPacsize)
      ? SettingValues.get("pacsize", defaultSettings.pacsize)
      : defaultSettings.pacsize,
    params: SettingValues.get("stereo", defaultSettings.stereo) ? { stereo: "2" } : { mono: "2" },
  };

  options.audioDecoders = [
    {
      channels: defaultSettings.channels,
      freq: defaultSettings.freq,
      rate: defaultSettings.rate,
      pacsize: defaultSettings.pacsize,
      params: SettingValues.get("monoDecoding", defaultSettings.monoDecoding)
        ? { mono: "2" }
        : { stereo: "2" },
    },
  ];

  options.fec = SettingValues.get("fec", defaultSettings.fec);

  options.encodingVoiceBitRate = SettingValues.get(
    "customVoiceBitrate",
    defaultSettings.customVoiceBitrate,
  )
    ? SettingValues.get("voiceBitrate", defaultSettings.voiceBitrate)
    : defaultSettings.voiceBitrate;

  connection.conn.setTransportOptions(options, true);
};

export default { updateVoiceConnection };
