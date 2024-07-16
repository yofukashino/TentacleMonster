import { users as UltimateUserStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  PluginInjector.after(Modules?.VoiceConnection!.prototype, "connect", (_args, res) => {
    if (SettingValues.get("priority", defaultSettings.priority))
      res.setCanHavePriority(UltimateUserStore.getCurrentUser().id, true);
    const originalTransportOptions = res.conn.setTransportOptions.bind(res.conn);
    res.conn.setTransportOptions = (options: Types.TransportArg, original: boolean) => {
      if (original) {
        return originalTransportOptions(options);
      }

      if (SettingValues.get("attenuation", defaultSettings.attenuation)) {
        options.attenuation = true;
        options.attenuateWhileSpeakingSelf = false;
        options.attenuateWhileSpeakingOthers = true;
        options.attenuationFactor = SettingValues.get(
          "attenuationFactor",
          defaultSettings.attenuationFactor,
        );
      }
      if (SettingValues.get("priority", defaultSettings.priority))
        options.prioritySpeakerDucking = 95;

      if (options.audioEncoder) {
        if (SettingValues.get("customChannels", defaultSettings.customChannels))
          options.audioEncoder.channels = SettingValues.get("channels", defaultSettings.channels);
        if (SettingValues.get("customFreq", defaultSettings.customFreq))
          options.audioEncoder.freq = SettingValues.get("freq", defaultSettings.freq);
        if (SettingValues.get("customRate", defaultSettings.customRate))
          options.audioEncoder.rate = SettingValues.get("rate", defaultSettings.rate);
        if (SettingValues.get("customPacsize", defaultSettings.customPacsize))
          options.audioEncoder.pacsize = SettingValues.get("pacsize", defaultSettings.pacsize);
        if (SettingValues.get("stereo", defaultSettings.stereo))
          options.audioEncoder.params = {
            stereo: "2",
          };
      }

      options.fec = SettingValues.get("fec", defaultSettings.fec);

      if (
        options.encodingVoiceBitRate &&
        SettingValues.get("customVoiceBitrate", defaultSettings.customVoiceBitrate)
      ) {
        options.encodingVoiceBitRate = SettingValues.get(
          "voiceBitrate",
          defaultSettings.voiceBitrate,
        );
      }
      Modules?.VoiceUtils!.setInputVolume(100);
      return originalTransportOptions(options);
    };
    return res;
  });
};
