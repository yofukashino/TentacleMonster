import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.VoiceConnection ??= await webpack
    .waitForModule<Types.DefaultTypes.AnyFunction>(
      webpack.filters.bySource("getCodecCapabilities"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find VoiceConnection Module");
    });

  Modules.PanelButton ??= await webpack
    .waitForModule<Types.PanelButton>(webpack.filters.bySource("Masks.PANEL_BUTTON"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find PanelButton Module");
    });

  Modules.VoiceUtils ??= await webpack
    .waitForProps<{
      setInputVolume: Types.DefaultTypes.AnyFunction;
      setEchoCancellation: Types.DefaultTypes.AnyFunction;
      setNoiseCancellation: Types.DefaultTypes.AnyFunction;
    }>(["setInputVolume"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find VoiceUtils Module");
    });

  Modules.MediaEngineStore = webpack.getByStoreName<Types.MediaEngineStore>("MediaEngineStore");
};

export default Modules;
