import { PluginInjector } from "../index";

import { UltimateUserStore, VoiceConnection, VoiceUtils } from "../lib/requiredModules";

import * as Types from "../types";

export const patchVoiceConnection = (): void => {
  PluginInjector.after(VoiceConnection!.prototype, "connect", (_args, res) => {
    res.setCanHavePriority(UltimateUserStore.getCurrentUser().id, true);
    PluginInjector.before(res.conn, "setTransportOptions", (args: [Types.TransportArg]) => {
      args[0].attenuation = true;
      args[0].attenuateWhileSpeakingSelf = false;
      args[0].attenuateWhileSpeakingOthers = true;
      args[0].attenuationFactor = 75;
      args[0].prioritySpeakerDucking = 75;

      if (args[0].audioEncoder) {
        args[0].audioEncoder.channels = 8;
        args[0].audioEncoder.freq = 195800;
        args[0].audioEncoder.rate = 683000;
      }
      if (args[0].fec) {
        args[0].fec = false;
      }
      if (args[0].encodingVoiceBitRate) {
        args[0].encodingVoiceBitRate = 1512000;
      }
      VoiceUtils!.setInputVolume(Infinity);
      return res;
    });
    return res;
  });
};
