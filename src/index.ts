import { Injector, Logger, settings } from "replugged";
import "./style.css";
import { defaultSettings } from "./lib/consts";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("TentacleMonster", "#b380ff");
export const SettingValues = await settings.init(
  "dev.yofukashino.TentacleMonster",
  defaultSettings,
);
import Injections from "./injections/index";

export const start = (): void => {
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { default as _addPanelButton } from "./Components/PanelButton";
