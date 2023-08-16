import { common, webpack } from "replugged";
import * as Types from "../types";
export const { users: UltimateUserStore } = common;
export const ElectronModule = webpack.getByProps<Types.ElectronModule>("setBadge");
export const VoiceConnection =
  webpack.getBySource<Types.DefaultTypes.AnyFunction>("getCodecCapabilities");
export const VoiceUtils = webpack.getByProps<{ setInputVolume: Types.DefaultTypes.AnyFunction }>(
  "setInputVolume",
);
