import { Notification } from "@components/Notification/Notification";
import { WindowFrame } from "@components/WindowFrame/WindowFrame";
import {
  Circle,
  Img,
  makeScene2D,
  Node,
  Path,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  CodeBlock,
  insert,
  remove,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import {
  all,
  chain,
  Color,
  createRef,
  createRefArray,
  createRefMap,
  delay,
  linear,
  range,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const refRoot = createRef<Node>();
  const refRootNotification = createRef<Node>();
  const refNotifications = createRefArray<Notification>();
  const refRootGodot = createRef<Node>();
  const refGodotPaths = createRefMap<Path>();
  const refWindows = createRefMap<WindowFrame>();
  const refFocusLines = createRefMap<Rect>();
  const refCodeBlocks = createRefMap<CodeBlock>();

  view.add(
    <Node ref={refRoot}>
      <Node ref={refRootNotification} position={[-928, -508]} />
      <Node ref={refRootGodot}>
        <Path
          ref={refGodotPaths.teeth}
          scale={0.6}
          end={0}
          lineWidth={6}
          stroke={"#ffffff"}
          data={`
        M 407.24 161.152 S 405.888 152.852 405.097 152.927 L 254.485 167.458 A 24.48 24.48 0 0 0 232.353 190.182 L 228.215 249.487 L 111.695 257.8 L 103.77 204.052 C 102.005 192.097 91.565 183.085 79.48 183.085 H -79.48 C -91.56 183.085 -102 192.097 -103.765 204.052 L -111.695 257.8 L -228.215 249.487 L -232.352 190.182 A 24.48 24.48 0 0 0 -254.485 167.454 L -405.171 152.927 C -405.949 152.852 -406.52 161.16 -407.298 161.16 L -407.502 193.754 L -279.885 214.334 L -275.705 274.167 C -274.86 286.28 -265.087 296.075 -252.965 296.945 L -92.492 308.392 A 26.39 26.39 0 0 0 -90.686 308.459 C -78.626 308.459 -68.204 299.442 -66.439 287.487 L -58.284 232.183 H 58.29 L 66.444 287.487 C 68.205 299.438 78.641 308.454 90.717 308.454 C 91.307 308.454 91.899 308.434 92.477 308.392 L 252.971 296.945 C 265.088 296.075 274.866 286.28 275.711 274.167 L 279.887 214.334 L 407.45 193.662 Z
        `}
        />
        <Path
          ref={refGodotPaths.head}
          scale={0.6}
          end={0}
          lineWidth={6}
          stroke={"#478cbf"}
          data={`
        M -407.301 -84.613 V 161.152 C -406.851 161.156 -406.402 161.172 -405.957 161.214 L -255.287 175.742 A 16.223 16.223 0 0 1 -240.659 190.765 L -236.014 257.275 L -104.584 266.653 L -95.53 205.267 A 16.222 16.222 0 0 1 -79.479 191.41 H 79.483 C 87.529 191.41 94.356 197.308 95.53 205.267 L 104.584 266.653 L 236.018 257.275 L 240.659 190.765 A 16.23 16.23 0 0 1 255.287 175.742 L 405.898 161.214 C 406.344 161.173 406.789 161.156 407.238 161.152 V 141.542 L 407.301 141.522 V -84.614 C 428.518 -111.323 448.608 -140.784 464 -165.572 C 440.477 -205.617 411.655 -241.402 380.848 -274.558 C 352.276 -260.176 324.523 -243.884 298.311 -226.546 C 285.195 -239.584 270.421 -250.248 255.911 -261.396 C 241.654 -272.847 225.586 -281.243 210.347 -291.026 C 214.884 -324.813 217.128 -358.076 218.031 -392.793 C 178.711 -412.582 136.781 -425.703 94.368 -435.126 C 77.435 -406.666 61.95 -375.846 48.463 -345.718 C 32.47 -348.39 16.403 -349.381 0.314 -349.572 V -349.597 C 0.202 -349.597 0.098 -349.572 0.002 -349.572 C -0.098 -349.572 -0.202 -349.597 -0.302 -349.597 V -349.572 C -16.419 -349.381 -32.475 -348.39 -48.472 -345.718 C -61.95 -375.847 -77.427 -406.667 -94.385 -435.126 C -136.777 -425.702 -178.711 -412.582 -218.027 -392.793 C -217.128 -358.076 -214.884 -324.813 -210.335 -291.025 C -225.603 -281.243 -241.65 -272.847 -255.911 -261.395 C -270.401 -250.248 -285.199 -239.584 -298.32 -226.546 C -324.532 -243.884 -352.276 -260.176 -380.856 -274.558 C -411.663 -241.402 -440.469 -205.616 -464 -165.57 C -445.507 -136.542 -425.67 -107.365 -407.301 -84.612 Z
        M 272.071 206.723 L 267.405 273.587 C 266.843 281.646 260.433 288.061 252.374 288.639 L 91.884 300.09 C 91.494 300.12 91.102 300.132 90.714 300.132 C 82.739 300.132 75.858 294.279 74.68 286.271 L 65.477 223.856 H -65.475 L -74.678 286.271 C -75.915 294.671 -83.424 300.711 -91.882 300.091 L -252.372 288.639 C -260.431 288.061 -266.841 281.646 -267.402 273.587 L -272.069 206.723 L -407.549 193.661 C -407.487 208.221 -407.3 224.173 -407.3 227.349 C -407.3 370.434 -225.79 439.209 -0.276 440 H 0.278 C 225.792 439.21 407.24 370.434 407.24 227.349 C 407.24 224.115 407.435 208.23 407.502 193.661 Z
        `}
        />
        <Path
          ref={refGodotPaths.face}
          scale={0.6}
          end={0}
          lineWidth={6}
          stroke={"#fff"}
          data={`
        M -122.785 15.151 C -122.785 65.319 -163.433 105.959 -213.585 105.959 C -263.71 105.959 -304.371 65.319 -304.371 15.151 C -304.371 -34.983 -263.711 -75.602 -213.584 -75.602 C -163.434 -75.602 -122.785 -34.983 -122.785 15.151
        M 122.787 15.151 C 122.787 65.319 163.435 105.959 213.594 105.959 C 263.716 105.959 304.373 65.319 304.373 15.151 C 304.373 -34.983 263.716 -75.602 213.594 -75.602 C 163.435 -75.602 122.787 -34.983 122.787 15.151
        M -0.007 114.22 C -16.149 114.22 -29.232 102.323 -29.232 87.658 V 4.068 C -29.232 -10.584 -16.149 -22.492 -0.007 -22.492 S 29.248 -10.584 29.248 4.068 V 87.658 C 29.248 102.323 16.136 114.22 -0.007 114.22
        `}
        />
        <Path
          ref={refGodotPaths.pupil}
          scale={0.6}
          end={0}
          lineWidth={6}
          stroke={"#414042"}
          data={`
        M -144.633 20.537 C -144.633 53.813 -171.603 80.783 -204.903 80.783 C -238.188 80.783 -265.174 53.813 -265.174 20.537 S -238.188 -39.733 -204.904 -39.733 C -171.603 -39.733 -144.634 -12.739 -144.634 20.537
        M 144.64 20.537 C 144.64 53.813 171.602 80.783 204.878 80.783 C 238.187 80.783 265.148 53.813 265.148 20.537 S 238.187 -39.733 204.878 -39.733 C 171.602 -39.733 144.641 -12.739 144.641 20.537
        `}
        />
      </Node>
    </Node>,
  );
  yield* all(
    ...refGodotPaths.mapRefs((path) => delay(1, path.fill(path.stroke(), 1))),
    ...refGodotPaths.mapRefs((path) => delay(1, path.lineWidth(0, 1))),
    ...refGodotPaths.mapRefs((path) => path.end(1, 1)),
  );
  yield* waitUntil("explain-godot");

  refRootNotification().add(
    <Notification
      ref={refNotifications}
      opacity={0}
      offset={[-1, -1]}
      icon={"󰊢"}
      title={"Git Repository"}
    >
      <Rect layout padding={16 * 0.5} radius={16 * 0.4} fill={"#141517"}>
        <Txt
          fill={"#C1C2C5"}
          fontFamily={"JetBrainsMono VF"}
          fontWeight={600}
          fontSize={16 * 1.4}
          text={"github.com/anasrar/godot-object-pooling"}
        />
      </Rect>
    </Notification>,
  );
  yield* all(...refNotifications.map((notif) => notif.opacity(1, 0.5)));
  yield* waitUntil("explain-godot-git-repository");
  yield* all(
    refRootGodot().opacity(0, 0.5),
    ...refNotifications.map((notif) => notif.opacity(0, 0.5)),
  );
  refRootGodot().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.newScenePool}
      opacity={0}
      title={"New Scene"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/new-scene-pool.png"} />
    </WindowFrame>,
  );
  yield* refWindows.newScenePool().opacity(1, 0.5);
  yield* waitUntil("explain-new-scene-pool");
  yield* refWindows.newScenePool().opacity(0, 0.5);

  refWindows.newScenePool().remove();
  refRoot().add(
    <WindowFrame
      ref={refWindows.sceneTreePool}
      opacity={0}
      title={"Scene"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/scene-tree-pool.png"} />
    </WindowFrame>,
  );
  yield* refWindows.sceneTreePool().opacity(1, 0.5);
  refRoot().add(
    <Rect
      ref={refFocusLines.attachScriptPool}
      position={[142, -136]}
      size={50}
      opacity={0}
      radius={16 * 0.5}
      lineWidth={4}
      stroke={"#fa5252"}
      end={0}
      lineCap={"round"}
    />,
  );
  yield* all(
    refFocusLines.attachScriptPool().opacity(1, 0.25),
    refFocusLines.attachScriptPool().end(1, 0.5),
  );
  yield* waitUntil("explain-attach-script-pool");
  yield* all(
    delay(0.25, refFocusLines.attachScriptPool().opacity(0, 0.25)),
    refFocusLines.attachScriptPool().end(0, 0.5),
    refWindows.sceneTreePool().opacity(0, 0.5),
  );
  refFocusLines.attachScriptPool().remove();
  refWindows.sceneTreePool().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.newScriptPool}
      opacity={0}
      title={"New Script"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/new-script-pool.png"} />
    </WindowFrame>,
  );
  yield* refWindows.newScriptPool().opacity(1, 0.5);
  yield* waitUntil("explain-new-script-pool");
  yield* refWindows.newScriptPool().opacity(0, 0.5);
  refWindows.newScriptPool().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.codePool}
      layout={false}
      opacity={0}
      padding={16}
      title={"Pool.cs"}
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
      <Node cache>
        <Rect width={1232} height={632} fill={"#fff"} />
        <CodeBlock
          ref={refCodeBlocks.pool}
          compositeOperation={"source-in"}
          offset={[-1, -1]}
          position={[-600, -300]}
          width={1200}
          fontFamily={"JetBrainsMono VF"}
          fontWeight={600}
          fontSize={16 * 1.5}
          lineHeight={16 * 2.5}
          language="csharp"
          code={`using Godot;
using System;

public partial class Pool : Node2D
{
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(double delta)
    {
    }
}`}
        />
      </Node>
    </WindowFrame>,
  );
  refWindows.codePool().inner().size([1232, 632]);
  yield* refWindows.codePool().opacity(1, 0.5);

  yield* refCodeBlocks.pool().edit(1.5, false)`using Godot;
${remove(`using System;
`)}
public partial class Pool : Node2D
{
    ${remove(
      `// Called when the node enters the scene tree for the first time.
    `,
    )}public override void _Ready()
    {
    }${remove(`

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(double delta)
    {
    }`)}
}`;
  yield* waitUntil("explain-code-pool-clean-up");

  yield* refCodeBlocks.pool().edit(1.5, true)`using Godot;
${insert(`
public interface IPoolItem
{
    public bool Active { get; set; }
}
`)}
public partial class Pool : Node2D
{
    public override void _Ready()
    {
    }
}`;
  yield* waitUntil("explain-code-pool-interface");

  yield* refCodeBlocks.pool().edit(1.5, true)`using Godot;

public interface IPoolItem
{
    public bool Active { get; set; }
}

public partial class Pool : Node2D
{${insert(`
    [Export(PropertyHint.Range, "1,100,1,or_greater")]
    public int InitialSpawn = 10;
    [Export]
    public PackedScene Item { get; set; }
`)}
    public override void _Ready()
    {
    }
}`;
  yield* waitUntil("explain-code-pool-export-variable-0");

  refRoot().add(
    <WindowFrame
      ref={refWindows.exportProperties}
      opacity={0}
      title={"Inspector"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/export-properties-pool.png"} />
    </WindowFrame>,
  );
  yield* refWindows.exportProperties().opacity(1, 0.5);
  refRoot().add(
    <Rect
      ref={refFocusLines.exportProperties}
      position={[-9, 68]}
      size={[400, 180]}
      opacity={0}
      radius={16 * 0.5}
      lineWidth={4}
      stroke={"#fa5252"}
      end={0}
      lineCap={"round"}
    />,
  );
  yield* all(
    refFocusLines.exportProperties().opacity(1, 0.25),
    refFocusLines.exportProperties().end(1, 0.5),
  );
  yield* waitUntil("explain-code-pool-export-variable-1");
  yield* all(
    delay(0.25, refFocusLines.exportProperties().opacity(0, 0.25)),
    refFocusLines.exportProperties().end(0, 0.5),
    refWindows.exportProperties().opacity(0, 0.5),
  );
  refFocusLines.exportProperties().remove();
  refWindows.exportProperties().remove();

  yield* refCodeBlocks.pool().y(refCodeBlocks.pool().y() - 550, 1);
  yield* refCodeBlocks.pool().edit(1.5, true)`using Godot;

public interface IPoolItem
{
    public bool Active { get; set; }
}

public partial class Pool : Node2D
{
    [Export(PropertyHint.Range, "1,100,1,or_greater")]
    public int InitialSpawn = 10;
    [Export]
    public PackedScene Item { get; set; }

    public override void _Ready()
    {${insert(`
        for (int i = 0; i < InitialSpawn; i++)
        {
            Node2D item = Item.Instantiate<Node2D>();
            AddChild(item, true);
        }`)}
    }
}`;
  yield* refWindows.codePool().y(-100, 1);
  const refRootPool = createRef<Node>();
  const refPoolRect = createRef<Rect>();
  const refPoolItems = createRefArray<Circle>();
  refRoot().add(
    <Node ref={refRootPool}>
      <Rect
        ref={refPoolRect}
        position={[0, 16 * 24]}
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
      {range(11).map((i) => (
        <Circle
          ref={refPoolItems}
          position={[16 * 6 * i - 432, 16 * 24]}
          size={0}
          fill={"#373a40"}
        />
      ))}
    </Node>,
  );
  yield* all(
    refPoolRect().size([16 * 62, 16 * 8], 1),
    ...refPoolItems.map((item, i) =>
      delay(1, item.size(i === 10 ? 0 : 16 * 4, 0.5)),
    ),
  );
  yield* waitUntil("explain-code-pool-initial-spawn");

  yield* refCodeBlocks.pool().y(refCodeBlocks.pool().y() - 230, 1);
  yield* refCodeBlocks.pool().edit(1.5, true)`using Godot;

public interface IPoolItem
{
    public bool Active { get; set; }
}

public partial class Pool : Node2D
{
    [Export(PropertyHint.Range, "1,100,1,or_greater")]
    public int InitialSpawn = 10;
    [Export]
    public PackedScene Item { get; set; }

    public override void _Ready()
    {
        for (int i = 0; i < InitialSpawn; i++)
        {
            Node2D item = Item.Instantiate<Node2D>();
            AddChild(item, true);
        }
    }${insert(`

    public Node2D GetItem()
    {
        Node2D item = GetChild<Node2D>(0);
        IPoolItem check = item as IPoolItem;
        if (check.Active)
        {
            Node2D newItem = Item.Instantiate<Node2D>();
            AddChild(newItem, true);
            return newItem;
        }
        return item;
    }`)}
}`;
  yield* waitFor(3);
  yield* refPoolItems[0].fill(
    "#fcc419",
    0.5,
    linear,
    Color.createLerp("oklab"),
  );
  yield* waitFor(3);
  yield* all(
    refPoolRect().size([16 * 68, 16 * 8], 1),
    ...refPoolItems.map((item) => item.x(item.x() - 16 * 3, 1)),
    refPoolItems[10].size(16 * 4, 1),
  );
  yield* waitUntil("explain-code-pool-get-item");
  yield* all(
    refWindows.codePool().opacity(0, 0.5),
    refRootPool().opacity(0, 0.5),
  );
  refWindows.codePool().remove();

  view.add(
    <WindowFrame
      ref={refWindows.newSceneBullet}
      opacity={0}
      title={"New Scene"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/new-scene-bullet.png"} />
    </WindowFrame>,
  );
  yield* refWindows.newSceneBullet().opacity(1, 0.5);
  yield* waitUntil("explain-new-scene-bullet");
  yield* refWindows.newSceneBullet().opacity(0, 0.5);
  refWindows.newSceneBullet().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.sceneTreeBullet}
      opacity={0}
      title={"Scene"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/scene-tree-bullet.png"} />
    </WindowFrame>,
  );
  yield* refWindows.sceneTreeBullet().opacity(1, 0.5);
  refRoot().add(
    <Rect
      ref={refFocusLines.attachScriptBullet}
      position={[142, -136]}
      size={50}
      opacity={0}
      radius={16 * 0.5}
      lineWidth={4}
      stroke={"#fa5252"}
      end={0}
      lineCap={"round"}
    />,
  );
  yield* all(
    refFocusLines.attachScriptBullet().opacity(1, 0.25),
    refFocusLines.attachScriptBullet().end(1, 0.5),
  );
  yield* waitUntil("explain-attach-script-bullet");
  yield* all(
    delay(0.25, refFocusLines.attachScriptBullet().opacity(0, 0.25)),
    refFocusLines.attachScriptBullet().end(0, 0.5),
    refWindows.sceneTreeBullet().opacity(0, 0.5),
  );
  refFocusLines.attachScriptBullet().remove();
  refWindows.sceneTreeBullet().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.newScriptBullet}
      opacity={0}
      title={"New Script"}
      icon={
        <Txt
          fill={"#e9ecef"}
          fontFamily={"Nerd Font Icon"}
          fontSize={16 * 1.75}
          lineHeight={0}
          text={""}
        />
      }
    >
      <Img src={"/images/godot/new-script-bullet.png"} />
    </WindowFrame>,
  );
  yield* refWindows.newScriptBullet().opacity(1, 0.5);
  yield* waitUntil("explain-new-script-bullet");
  yield* refWindows.newScriptBullet().opacity(0, 0.5);
  refWindows.newScriptBullet().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.codeBullet}
      layout={false}
      opacity={0}
      padding={16}
      title={"Bullet.cs"}
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
      <Node cache>
        <Rect width={1232} height={632} fill={"#fff"} />
        <CodeBlock
          ref={refCodeBlocks.bullet}
          compositeOperation={"source-in"}
          offset={[-1, -1]}
          position={[-600, -300]}
          width={1200}
          fontFamily={"JetBrainsMono VF"}
          fontWeight={600}
          fontSize={16 * 1.5}
          lineHeight={16 * 2.5}
          language="csharp"
          code={`using Godot;
using System;

public partial class Bullet : Area2D
{
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(double delta)
    {
    }
}`}
        />
      </Node>
    </WindowFrame>,
  );
  refWindows.codeBullet().inner().size([1232, 632]);
  yield* refWindows.codeBullet().opacity(1, 0.5);

  yield* refCodeBlocks.bullet().edit(1.5, false)`using Godot;
${remove(`using System;
`)}
public partial class Bullet : Area2D
{
    ${remove(
      `// Called when the node enters the scene tree for the first time.
    `,
    )}public override void _Ready()
    {
    }${remove(`

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(double delta)
    {
    }`)}
}`;
  yield* waitUntil("explain-code-bullet-clean-up");

  yield* refCodeBlocks.bullet().edit(1.5, true)`using Godot;

public partial class Bullet : Area2D${insert(", IPoolItem")}
{${insert(`
    public bool Active { get; set; } = false;
`)}
    public override void _Ready()
    {
    }
}`;
  yield* waitUntil("explain-code-bullet-interface");

  yield* refCodeBlocks.bullet().edit(1.5, true)`using Godot;

public partial class Bullet : Area2D, IPoolItem
{
    public bool Active { get; set; } = false;

    public override void _Ready()
    {${insert(`
        Visible = false;
        Monitoring = false;
        Monitorable = false;
        SetProcess(false);`)}
    }
}`;
  yield* waitUntil("explain-code-bullet-initial-hide");

  yield* refCodeBlocks.bullet().y(refCodeBlocks.bullet().y() - 440, 1);
  yield* refCodeBlocks.bullet().edit(1.5, true)`using Godot;

public partial class Bullet : Area2D, IPoolItem
{
    public bool Active { get; set; } = false;

    public override void _Ready()
    {
        Visible = false;
        Monitoring = false;
        Monitorable = false;
        SetProcess(false);
    }${insert(`

    public void Spawn(float angle)
    {
        Active = true;
        Visible = true;
        Monitoring = true;
        Monitorable = true;
        SetProcess(true);
        GetParent().MoveChild(this, -1);

        // ...
    }`)}
}`;
  yield* refWindows.codeBullet().y(-100, 1);
  refRootPool().moveToTop();
  refPoolRect().size(0);
  refPoolItems.forEach((item) => item.size(0));
  refRootPool().opacity(1);
  yield* all(
    refPoolRect().size([16 * 68, 16 * 8], 1),
    ...refPoolItems.map((item) => delay(1, item.size(16 * 4, 0.5))),
  );
  yield* waitFor(3);
  yield* all(
    refPoolItems[0].y(16 * 16, 1),
    ...refPoolItems.slice(1).map((item) => item.x(item.x() - 16 * 6, 1)),
  );
  yield* chain(
    refPoolItems[0].x(-refPoolItems[0].x(), 1),
    refPoolItems[0].y(16 * 24, 1),
  );
  yield* waitUntil("explain-code-bullet-spawn");

  yield* refCodeBlocks.bullet().y(refCodeBlocks.bullet().y() - 470, 1);
  yield* refCodeBlocks.bullet().edit(1.5, true)`using Godot;

public partial class Bullet : Area2D, IPoolItem
{
    public bool Active { get; set; } = false;

    public override void _Ready()
    {
        Visible = false;
        Monitoring = false;
        Monitorable = false;
        SetProcess(false);
    }

    public void Spawn(float angle)
    {
        Active = true;
        Visible = true;
        Monitoring = true;
        Monitorable = true;
        SetProcess(true);
        GetParent().MoveChild(this, -1);

        // ...
    }${insert(`

    public void Destroy()
    {
        Active = false;
        Visible = false;
        SetDeferred(Area2D.PropertyName.Monitoring, false);
        SetDeferred(Area2D.PropertyName.Monitorable, false);
        SetProcess(false);
        GetParent().MoveChild(this, 0);
    }`)}
}`;
  yield* waitFor(4);
  yield* all(
    refPoolItems[0].y(16 * 16, 1),
    ...refPoolItems.slice(1).map((item) => item.x(item.x() + 16 * 6, 1)),
  );
  yield* chain(
    refPoolItems[0].x(-refPoolItems[0].x(), 1),
    refPoolItems[0].y(16 * 24, 1),
  );
  yield* waitUntil("explain-code-bullet-destroy");
  yield* all(
    refWindows.codeBullet().opacity(0, 0.5),
    refRootPool().opacity(0, 0.5),
  );
  refWindows.codeBullet().remove();
  refRootPool().remove();

  refRoot().add(
    <>
      <WindowFrame
        ref={refWindows.sceneTreeBattleField}
        opacity={0}
        position={[-300, 0]}
        title={"Scene"}
        icon={
          <Txt
            fill={"#e9ecef"}
            fontFamily={"Nerd Font Icon"}
            fontSize={16 * 1.75}
            lineHeight={0}
            text={""}
          />
        }
      >
        <Img src={"/images/godot/scene-tree-battle-field.png"} />
      </WindowFrame>
      <WindowFrame
        ref={refWindows.propertiesBullet}
        opacity={0}
        position={[300, 0]}
        title={"Inspector"}
        icon={
          <Txt
            fill={"#e9ecef"}
            fontFamily={"Nerd Font Icon"}
            fontSize={16 * 1.75}
            lineHeight={0}
            text={""}
          />
        }
      >
        <Img src={"/images/godot/properties-bullet.png"} />
      </WindowFrame>
    </>,
  );
  yield* all(
    refWindows.sceneTreeBattleField().opacity(1, 0.5),
    refWindows.propertiesBullet().opacity(1, 0.5),
  );
  yield* waitUntil("explain-godot-usage-0");
  yield* all(
    refWindows.sceneTreeBattleField().opacity(0, 0.5),
    refWindows.propertiesBullet().opacity(0, 0.5),
  );
  refWindows.sceneTreeBattleField().remove();
  refWindows.propertiesBullet().remove();

  refRoot().add(
    <WindowFrame
      ref={refWindows.codePlayer}
      opacity={0}
      padding={16}
      title={"Player.cs"}
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
        offset={[-1, -1]}
        position={[-600, -300]}
        width={1200}
        fontFamily={"JetBrainsMono VF"}
        fontWeight={600}
        fontSize={16 * 1.5}
        lineHeight={16 * 2.5}
        language="csharp"
        code={`using Godot;

public partial class Player : CharacterBody2D
{
    [Export]
    public NodePath PathPoolBullets;

    public override void _PhysicsProcess(double delta)
    {
        if (Input.IsActionPressed("fire_bullet") && CanFireBullet)
        {
            Pool PoolBullets = GetNode<Pool>(PathPoolBullets);

            Bullet bullet = PoolBullets.GetItem() as Bullet;
            bullet.Spawn(Rotation);
        }
    }
}`}
      />
    </WindowFrame>,
  );
  yield* refWindows.codePlayer().opacity(1, 0.5);
  yield* waitUntil("explain-godot-usage-1");
  yield* refWindows.codePlayer().opacity(0, 0.5);
  refWindows.codePlayer().remove();
});
