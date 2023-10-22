import { fontSize } from "@libs/font-size";
import { Gradient, Layout, makeScene2D, Node, Txt } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

const Item = ({ name, url }: { name: string; url: string }) => {
  return (
    <Layout layout direction={"column"} gap={16 * 0.5}>
      <Txt
        fill={"#ced4da"}
        fontFamily={"Inter VF"}
        fontWeight={600}
        fontSize={fontSize[6]}
      >
        {name}
      </Txt>
      <Txt
        fill={"#868e96"}
        fontFamily={"Inter VF"}
        fontWeight={500}
        fontSize={fontSize[5]}
      >
        {url}
      </Txt>
    </Layout>
  );
};

export default makeScene2D(function* (view) {
  const refRoot = createRef<Node>();

  view.add(
    <Node ref={refRoot} opacity={0}>
      <Layout
        offsetX={-1}
        position={[16 * -52, 0]}
        layout
        direction={"column"}
        gap={16 * 2.5}
      >
        <Layout layout direction={"column"} gap={16 * 1.5}>
          <Txt
            fill={
              new Gradient({
                type: "linear",
                stops: [
                  { color: "#cc5de8", offset: 0 },
                  { color: "#ff6b6b", offset: 1 },
                ],
                from: [-800, -300],
                to: [-400, -300],
              })
            }
            fontFamily={"Inter VF"}
            fontWeight={700}
            fontSize={fontSize[8]}
          >
            Music
          </Txt>
          <Layout layout direction={"column"} gap={16 * 1.25}>
            <Item
              name="Holizna - Hooptie With The Windows Down - CC0"
              url="freemusicarchive.org/music/holiznacc0/city-slacker/hooptie-with-the-windows-down/"
            />
          </Layout>
        </Layout>
        <Layout layout direction={"column"} gap={16 * 1.5}>
          <Txt
            fill={
              new Gradient({
                type: "linear",
                stops: [
                  { color: "#94d82d", offset: 0 },
                  { color: "#22b8cf", offset: 1 },
                ],
                from: [-800, -300],
                to: [-400, -300],
              })
            }
            fontFamily={"Inter VF"}
            fontWeight={700}
            fontSize={fontSize[8]}
          >
            Font
          </Txt>
          <Layout layout direction={"column"} gap={16 * 1.25}>
            <Item name="Inter" url="rsms.me/inter/" />
            <Item name="JetBrains Mono" url="www.jetbrains.com/lp/mono/" />
            <Item name="Nerd Fonts" url="www.nerdfonts.com" />
          </Layout>
        </Layout>
      </Layout>
    </Node>,
  );
  yield* refRoot().opacity(1, 0.5);
  yield* waitFor(9.5);
});
