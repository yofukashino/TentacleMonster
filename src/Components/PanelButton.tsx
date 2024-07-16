import { plugins } from "replugged";
import { components, React } from "replugged/common";
import Modules from "../lib/requiredModules";
import Icons from "./Icons";
import MicSettings from "./MicSettings";
import Types from "../types";

export const PanelButton = React.memo((): React.ReactElement => {
  const { Popout } = components as Types.DiscordComponents;
  return (
    <Popout
      renderPopout={(props) => Modules.MediaEngineStore && <MicSettings {...props} />}
      position="top"
      animation={Popout.Animation.FADE}>
      {({ onClick }: { onClick: Types.DefaultTypes.AnyFunction }) => {
        return (
          Modules.PanelButton && (
            <Modules.PanelButton
              icon={() => <Icons.intensity width="18" height="18" />}
              tooltipText="Change Tentacle Intensity"
              onClick={onClick}
            />
          )
        );
      }}
    </Popout>
  );
});

export default () =>
  !plugins.getDisabled()?.includes("dev.yofukashino.TentacleMonster") && <PanelButton />;
