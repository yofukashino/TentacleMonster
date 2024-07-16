import Modules from "../lib/requiredModules";
import injectVoiceConnection from "./VoiceConnection";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules?.();
  injectVoiceConnection();
};

export default { applyInjections };
