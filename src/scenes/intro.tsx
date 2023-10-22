import { WindowFrame } from "@components/WindowFrame/WindowFrame";
import { makeScene2D, Node, Txt, Video } from "@motion-canvas/2d";
import { createRef, createRefMap, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const refRoot = createRef<Node>();
  const refWindowFrames = createRefMap<WindowFrame>();
  const refVideos = createRefMap<Video>();

  view.add(
    <Node ref={refRoot}>
      <WindowFrame
        ref={refWindowFrames.video}
        opacity={0}
        title={"ObjectPoolingDemo.mp4"}
        icon={
          <Txt
            fill={"#e9ecef"}
            fontFamily={"Nerd Font Icon"}
            fontSize={16 * 1.75}
            lineHeight={0}
            text={"󰨜"}
          />
        }
      >
        <Video ref={refVideos.demo} src={"/videos/intro/demo.mp4"} />
      </WindowFrame>
    </Node>,
  );
  refVideos.demo().play();
  yield* refWindowFrames.video().opacity(1, 0.5);
  yield* waitFor(6);
  yield* refWindowFrames.video().opacity(0, 0.5);
  refVideos.demo().pause();
});
