import { makeScene2D, Node, Txt } from "@motion-canvas/2d";
import { all, createRef, createRefMap, waitUntil } from "@motion-canvas/core";
import { CodeBlock, lines } from "@motion-canvas/2d/lib/components/CodeBlock";
import { WindowFrame } from "@components/WindowFrame/WindowFrame";

export default makeScene2D(function* (view) {
  const refRoot = createRef<Node>();
  const refWindowFrames = createRefMap<WindowFrame>();
  const refCodeBlocks = createRefMap<CodeBlock>();

  view.add(
    <Node ref={refRoot} opacity={0}>
      <WindowFrame
        ref={refWindowFrames.poolItem}
        padding={16}
        title={"PoolItem.ts"}
        icon={
          <Txt
            fill={"#e9ecef"}
            fontFamily={"Nerd Font Icon"}
            fontSize={16 * 1.75}
            lineHeight={0}
            text={""}
          />
        }
      >
        <CodeBlock
          width={580}
          fontFamily={"JetBrainsMono VF"}
          fontWeight={600}
          fontSize={16 * 1.5}
          lineHeight={16 * 2.5}
          language="ts"
          code={`class PoolItem {
  public active = false;

  spawn(){
    this.active = true;
  }

  destroy(){
    this.active = false;
  }
}`}
        />
      </WindowFrame>
    </Node>,
  );

  yield* refRoot().opacity(1, 0.5);
  yield* waitUntil("explain-code-pool-item");
  refRoot().add(
    <WindowFrame
      ref={refWindowFrames.pool}
      opacity={0}
      padding={16}
      title={"Pool.ts"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <CodeBlock
        ref={refCodeBlocks.pool}
        width={580}
        fontFamily={"JetBrainsMono VF"}
        fontWeight={600}
        fontSize={16 * 1.5}
        lineHeight={16 * 2.5}
        language="ts"
        code={`class Pool {
  public items: PoolItem[] = [];
  
  constructor(initial: number) {
    for(let i = 0; i < initial; i++){
      this.items.push(new PoolItem());
    }
  }
  
  getItem(): PoolItem {
    for(const item in this.items){
      if(!item.active){
        return item;
      }
    }
    const newItem = new PoolItem();
    this.items.push(newItem);
    return newItem;
  }
}`}
      />
    </WindowFrame>,
  );
  yield* all(
    refWindowFrames.poolItem().position([-16 * 27, 0], 1),
    refWindowFrames.pool().position([16 * 27, 0], 1),
    refWindowFrames.pool().opacity(1, 1.5),
  );
  yield* waitUntil("minimal-code-pacing-0");
  yield* refCodeBlocks.pool().selection(lines(1, 8), 1);
  yield* waitUntil("explain-code-pool-constructor");
  yield* refCodeBlocks.pool().selection(lines(9, 18), 1);
  yield* waitUntil("explain-code-pool-get-item");
  yield* waitUntil("minimal-code-pacing-end");
  yield* refRoot().opacity(0, 0.5);
});
