import { util } from "replugged";
import { React, toast, fluxHooks as FluxHooks } from "replugged/common";
import {
  Flex,
  SwitchItem,
  SelectItem,
  TextInput,
  Divider,
  Notice,
  Button,
} from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings, simpleFormats } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export const SimpleSettings = () => {
  type formatType = typeof simpleFormats;
  const [format, setFormat] = util.useSettingArray(
    SettingValues,
    "simpleFormat",
    defaultSettings.simpleFormat,
  );
  React.useEffect(() => {
    for (const key in simpleFormats[format as keyof formatType]) {
      SettingValues.set(
        key as keyof Types.Settings,
        simpleFormats[format as keyof formatType][key as keyof formatType["normal"]],
      );
    }
    Utils.updateVoiceConnection();
  }, [
    format,
    SettingValues.get("stereo", defaultSettings.stereo),
    SettingValues.get("priority", defaultSettings.priority),
  ]);
  return (
    <div style={{ padding: "10px" }}>
      <SelectItem
        value={format}
        onChange={setFormat}
        options={[
          { label: "Low", value: "low" },
          {
            label: "Normal",
            value: "normal",
          },
          {
            label: "Medium",
            value: "medium",
          },
          {
            label: "High",
            value: "high",
          },
          {
            label: "Ultra",
            value: "ultra",
          },
          {
            label: "Orgasm",
            value: "orgasm",
          },
        ]}
        note={`Channels: ${simpleFormats[format as keyof formatType].channels} | Sample Rate: ${
          simpleFormats[format as keyof formatType].rate
        } | Audio Bitrate: ${simpleFormats[format as keyof formatType].voiceBitrate} | Pac Size: ${
          simpleFormats[format as keyof formatType].pacsize
        } | Sample Frequency: ${simpleFormats[format as keyof formatType].freq}`}>
        Audio Format
      </SelectItem>

      <SwitchItem {...util.useSetting(SettingValues, "fec", defaultSettings.fec)}>
        FEC (Forward Error Correction)
      </SwitchItem>
      <Flex
        wrap={Flex.Wrap.WRAP}
        justify={Flex.Justify.AROUND}
        align={Flex.Align.CENTER}
        className="tentacle-option-flex">
        <SwitchItem {...util.useSetting(SettingValues, "stereo", defaultSettings.stereo)}>
          Stereo
        </SwitchItem>
        <SwitchItem {...util.useSetting(SettingValues, "priority", defaultSettings.priority)}>
          Priority
        </SwitchItem>
      </Flex>
    </div>
  );
};

export const AdvancedSettings = () => {
  const [attenuation, setAttenuation] = util.useSettingArray(
    SettingValues,
    "attenuationFactor",
    defaultSettings.attenuationFactor,
  );

  const [channels, setChannels] = util.useSettingArray(
    SettingValues,
    "channels",
    defaultSettings.channels,
  );

  const [rate, setRate] = util.useSettingArray(SettingValues, "rate", defaultSettings.rate);

  const [freq, setFreq] = util.useSettingArray(SettingValues, "freq", defaultSettings.freq);

  const [pacsize, setPacsize] = util.useSettingArray(
    SettingValues,
    "pacsize",
    defaultSettings.pacsize,
  );

  const [voiceBirate, setVoiceBirate] = util.useSettingArray(
    SettingValues,
    "voiceBitrate",
    defaultSettings.voiceBitrate,
  );
  React.useEffect(() => {
    Utils.updateVoiceConnection();
  }, [
    SettingValues.get("attenuation", defaultSettings.attenuation),
    attenuation,
    SettingValues.get("customChannels", defaultSettings.customChannels),
    channels,
    SettingValues.get("customRate", defaultSettings.customRate),
    rate,
    SettingValues.get("customFreq", defaultSettings.customFreq),
    freq,
    SettingValues.get("customPacsize", defaultSettings.customPacsize),
    pacsize,
    SettingValues.get("customVoiceBitrate", defaultSettings.customVoiceBitrate),
    voiceBirate,
    SettingValues.get("stereo", defaultSettings.stereo),
    SettingValues.get("priority", defaultSettings.priority),
  ]);
  return (
    <div style={{ padding: "10px" }}>
      <Flex
        wrap={Flex.Wrap.WRAP}
        justify={Flex.Justify.AROUND}
        align={Flex.Align.CENTER}
        className="tentacle-option-flex"
        style={{ paddingBottom: "25px" }}>
        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(SettingValues, "attenuation", defaultSettings.attenuation)}>
            Attenuation Factor
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("attenuation", defaultSettings.attenuation)}
            placeholder="Attenuation Factor"
            value={`${attenuation}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setAttenuation(Number(val || "0"));
            }}
          />
        </Flex>

        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(SettingValues, "customChannels", defaultSettings.customChannels)}>
            Channels
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("customChannels", defaultSettings.customChannels)}
            placeholder="Number of Channels"
            value={`${channels}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setChannels(Number(val || "0"));
            }}
          />
        </Flex>

        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(SettingValues, "customRate", defaultSettings.customRate)}>
            Sample Rate
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("customRate", defaultSettings.customRate)}
            placeholder="Sample Rate"
            value={`${rate}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setRate(Number(val || "0"));
            }}
          />
        </Flex>

        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(SettingValues, "customFreq", defaultSettings.customFreq)}>
            Sample Frequency
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("customFreq", defaultSettings.customFreq)}
            placeholder="Sample Frequency"
            value={`${freq}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setFreq(Number(val || "0"));
            }}
          />
        </Flex>

        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(SettingValues, "customPacsize", defaultSettings.customPacsize)}>
            Pac Size
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("customPacsize", defaultSettings.customPacsize)}
            placeholder="Pac Size"
            value={`${pacsize}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setPacsize(Number(val || "0"));
            }}
          />
        </Flex>

        <Flex direction={Flex.Direction.VERTICAL} style={{ paddingTop: "10px" }}>
          <SwitchItem
            hideBorder={true}
            {...util.useSetting(
              SettingValues,
              "customVoiceBitrate",
              defaultSettings.customVoiceBitrate,
            )}>
            Audio Birate
          </SwitchItem>
          <TextInput
            disabled={!SettingValues.get("customVoiceBitrate", defaultSettings.customVoiceBitrate)}
            placeholder="Pac Size"
            value={`${voiceBirate}`}
            onChange={(val) => {
              if (isNaN(Number(val || "0"))) {
                toast.toast("Must be a number!", toast.Kind.FAILURE);
                return;
              }
              setVoiceBirate(Number(val || "0"));
            }}
          />
        </Flex>
      </Flex>
      <Divider style={{ paddingBottom: "25px" }} />
      <SwitchItem {...util.useSetting(SettingValues, "fec", defaultSettings.fec)}>
        FEC (Forward Error Correction)
      </SwitchItem>
      <Flex
        wrap={Flex.Wrap.WRAP}
        justify={Flex.Justify.AROUND}
        align={Flex.Align.CENTER}
        className="tentacle-option-flex">
        <SwitchItem {...util.useSetting(SettingValues, "stereo", defaultSettings.stereo)}>
          Stereo
        </SwitchItem>
        <SwitchItem {...util.useSetting(SettingValues, "priority", defaultSettings.priority)}>
          Priority
        </SwitchItem>
      </Flex>
    </div>
  );
};

export default (props: Record<string, unknown>) => {
  const showNotice = FluxHooks.useStateFromStores([Modules.MediaEngineStore!], () =>
    Boolean(
      Modules.MediaEngineStore?.getNoiseCancellation() ||
        Modules.MediaEngineStore?.getEchoCancellation(),
    ),
  );
  const [simple, setSimple] = util.useSettingArray(SettingValues, "simple", defaultSettings.simple);

  return (
    <div
      {...props}
      className={["tentacle-popout", simple ? "simple" : "advanced"].filter(Boolean).join(" ")}
      key={`${simple}`}>
      {showNotice && (
        <Notice messageType={Notice.HelpMessageTypes.WARNING}>
          Please disable
          <span style={{ fontWeight: "bold" }}>Krisp</span> and
          <span style={{ fontWeight: "bold" }}>Echo Cancellation</span>, otherwise some features
          might not work as intended.
          <Button
            style={{ marginTop: "10px", marginBottom: "10px", padding: "5px" }}
            color={Button.Colors.TRANSPARENT}
            size={Button.Sizes.MAX}
            onClick={() => {
              Modules.VoiceUtils?.setEchoCancellation(false);
              Modules.VoiceUtils?.setNoiseCancellation(false);
            }}>
            Disable Now
          </Button>
        </Notice>
      )}
      {simple ? <SimpleSettings /> : <AdvancedSettings />}
      <div style={{ paddingTop: "12px", width: "100%" }}>
        <div>
          <SwitchItem className="tentacle-simple-switch" value={simple} onChange={setSimple}>
            Simple Mode
          </SwitchItem>
        </div>
      </div>
    </div>
  );
};
