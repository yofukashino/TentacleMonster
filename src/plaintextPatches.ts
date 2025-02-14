import Types from "./types";

export default [
  {
    find: "this.handleCloseVoicePanelIntroduction",
    replacements: [
      {
        match: /children:\[(\w+\?this\.renderNoiseCancellation\(\))/,
        replace: (_, noiseCanel) =>
          `children:[replugged.plugins.getExports("dev.yofukashino.TentacleMonster")?._addPanelButton?.(),${noiseCanel}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
