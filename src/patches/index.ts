import { patchVoiceConnection } from "./VoiceConnection";
export const applyInjections = (): void => {
  void patchVoiceConnection();
};
