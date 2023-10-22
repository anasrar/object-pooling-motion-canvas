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
                  { color: "#F06595", offset: 0 },
                  { color: "#fcc419", offset: 1 },
                ],
                from: [0, 0],
                to: [-400, 50],
              })
            }
            fontFamily={"Inter VF"}
            fontWeight={700}
            fontSize={fontSize[8]}
          >
            Link
          </Txt>
          <Layout layout direction={"column"} gap={16 * 1.25}>
            <Item
              name="Motion Canvas Project"
              url="github.com/anasrar/object-pooling-motion-canvas"
            />
            <Item
              name="Godot Project"
              url="github.com/anasrar/godot-object-pooling"
            />
          </Layout>
        </Layout>
      </Layout>
    </Node>,
  );
  yield* refRoot().opacity(1, 0.5);
  yield* waitFor(9);
  yield* refRoot().opacity(0, 0.5);
});
