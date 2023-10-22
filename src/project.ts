import { makeProject } from "@motion-canvas/core";

import "./fonts/Inter/Inter.css";
import "./fonts/JetBrainsMono/JetBrainsMono.css";
import "./fonts/NerdFonts/NerdFonts.css";

//import example from "./scenes/example?scene";
import intro from "./scenes/intro?scene";
import why from "./scenes/why?scene";
import minimalCode from "./scenes/minimal-code?scene";
import godot from "./scenes/godot?scene";
import link from "./scenes/link?scene";
import attribution from "./scenes/attribution?scene";

// import voice from "./audio/voice.wav";

export default makeProject({
  scenes: [intro, why, minimalCode, godot, link, attribution],
  // audio: voice,
});
