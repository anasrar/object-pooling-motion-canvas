import { fontSize } from "@libs/font-size";
import { Circle, makeScene2D, Node, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  Color,
  createRef,
  createRefMap,
  linear,
  range,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const refRoot = createRef<Node>();
  const refPoolItems = createRefMap<Circle>();
  const refTxts = createRefMap<Txt>();

  view.add(
    <Node ref={refRoot} opacity={0}>
      <Txt
        ref={refTxts.create}
        offset={[-1, 1]}
        position={[-16 * 39, -16 * 6]}
        fill={"#dee2e6"}
        fontFamily={"JetBrainsMono VF"}
        fontWeight={700}
        fontSize={fontSize[6]}
      >
        Create
      </Txt>
      <Txt
        ref={refTxts.destroy}
        offset={[1, 1]}
        position={[16 * 39, -16 * 6]}
        fill={"#dee2e6"}
        fontFamily={"JetBrainsMono VF"}
        fontWeight={700}
        fontSize={fontSize[6]}
      >
        Destroy
      </Txt>
      <Rect
        layout
        size={[16 * 78, 16 * 8]}
        direction={"row"}
        justifyContent={"space-between"}
        gap={16 * 0.4}
        radius={16}
        lineWidth={6 * 2}
        stroke={"#495057"}
        shadowOffset={[0, 16 * 0.5]}
        shadowBlur={16 * 0.5}
        shadowColor={"rgba(0, 0, 0, 0.5)"}
        fill={"#495057"}
        clip
      >
        {range(3).map((i) => (
          <Rect
            size={16 * 8}
            grow={i === 1 ? 1 : 0}
            fill={i === 1 ? "#25262B" : "#141517"}
          />
        ))}
      </Rect>
      <Circle
        ref={refPoolItems.item0}
        position={[-16 * 35, 0]}
        size={0}
        fill={"#fcc419"}
      />
    </Node>,
  );

  yield* refRoot().opacity(1, 0.5);
  yield* all(refPoolItems.item0().size(16 * 4, 1));
  yield* waitUntil("explain-create");
  yield* refPoolItems.item0().position([16 * 35, 0], 2);
  yield* waitUntil("explain-destroy");
  yield* all(refPoolItems.item0().size(0, 1));
  yield* all(...refTxts.mapRefs((txt) => txt.opacity(0, 1)));
  refTxts.create().text("Show");
  refTxts.destroy().text("Hide");
  yield* all(...refTxts.mapRefs((txt) => txt.opacity(1, 1)));
  yield* waitUntil("explain-show-hide");
  refPoolItems.item0().position([-16 * 6, 16 * 16]);
  refPoolItems.item0().fill("#373a40");

  const refPoolRect = createRef<Rect>();

  refRoot().add(
    <>
      <Rect
        ref={refPoolRect}
        position={[0, 16 * 16]}
        layout
        direction={"row"}
        size={0}
        radius={16 * 1}
        lineWidth={6 * 2}
        stroke={"#495057"}
        shadowOffset={[0, 16 * 0.5]}
        shadowBlur={16 * 0.5}
        shadowColor={"rgba(0, 0, 0, 0.5)"}
        fill={"#495057"}
        clip
      >
        <Rect size={16 * 8} grow={1} fill={"#141517"} />
      </Rect>
      <Circle
        ref={refPoolItems.item1}
        position={[0, 16 * 16]}
        size={0}
        fill={"#373a40"}
      />
      <Circle
        ref={refPoolItems.item2}
        position={[16 * 6, 16 * 16]}
        size={0}
        fill={"#373a40"}
      />
      <Txt
        ref={refTxts.pool}
        offset={[0, -1]}
        position={[0, 16 * 22]}
        opacity={0}
        fill={"#dee2e6"}
        fontFamily={"JetBrainsMono VF"}
        fontWeight={700}
        fontSize={fontSize[6]}
      >
        Pool
      </Txt>
    </>,
  );
  refPoolRect().moveToBottom();

  yield* all(
    refPoolRect().size([16 * 20, 16 * 8], 1),
    refTxts.pool().opacity(1, 1),
  );

  yield* all(...refPoolItems.mapRefs((poolItem) => poolItem.size(16 * 4, 1)));
  yield* waitUntil("explain-create-hide");

  yield* all(
    refPoolItems.item1().position([-16 * 6, 16 * 16], 1),
    refPoolItems.item2().position([0, 16 * 16], 1),
    refPoolItems.item0().position([-16 * 35, 0], 1),
  );

  yield* refPoolItems
    .item0()
    .fill("#fcc419", 0.5, linear, Color.createLerp("oklab"));
  yield* waitUntil("explain-show");
  yield* refPoolItems.item0().position([16 * 35, 0], 2);
  yield* refPoolItems
    .item0()
    .fill("#373a40", 0.5, linear, Color.createLerp("oklab"));
  yield* waitUntil("explain-hide");
  yield* refPoolItems.item0().position([16 * 6, 16 * 16], 1);
  yield* waitUntil("why-pacing-end");
  yield* refRoot().opacity(0, 0.5);
});
