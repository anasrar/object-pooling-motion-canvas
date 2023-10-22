import { Circle, Layout, PossibleCanvasStyle, Txt } from "@motion-canvas/2d";
import { Node, NodeProps, Rect } from "@motion-canvas/2d/lib/components";
import {
  CanvasStyleSignal,
  canvasStyleSignal,
  initial,
  signal,
} from "@motion-canvas/2d/lib/decorators";
import { spacingSignal } from "@motion-canvas/2d/lib/decorators/spacingSignal";
import {
  createRef,
  PossibleSpacing,
  range,
  SpacingSignal,
} from "@motion-canvas/core";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";

export interface WindowFrameProps extends NodeProps {
  layout?: SignalValue<boolean>;
  padding?: SignalValue<PossibleSpacing>;
  fill?: SignalValue<PossibleCanvasStyle>;
  title?: SignalValue<string>;
  icon?: Node;
}

export class WindowFrame extends Node {
  @initial(true)
  @signal()
  public declare readonly layout: SimpleSignal<boolean, this>;

  @spacingSignal("padding")
  public declare readonly padding: SpacingSignal<this>;

  @initial("#101113")
  @canvasStyleSignal()
  public declare readonly fill: CanvasStyleSignal<this>;

  @initial("title")
  @signal()
  public declare readonly title: SimpleSignal<string, this>;

  public readonly icon = createRef<Node>();
  public readonly inner = createRef<Rect>();

  public constructor(props?: WindowFrameProps) {
    const { children, icon, ...rest } = props;
    super({
      ...rest,
    });
    this.icon(icon);

    this.add(
      <Rect
        layout
        direction={"column"}
        gap={16 * 0.375}
        radius={16 * 0.75}
        clip
        lineWidth={6 * 2}
        stroke={"#495057"}
        shadowOffset={[0, 16 * 0.5]}
        shadowBlur={16 * 0.5}
        shadowColor={"rgba(0, 0, 0, 0.5)"}
        fill={"#495057"}
      >
        <Rect
          layout
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={16}
          padding={16}
          fill={"#212529"}
        >
          <Layout layout direction={"row"} alignItems={"center"} gap={16}>
            {icon}
            <Rect
              padding={[16 * 0.25, 16 * 0.75]}
              radius={16 * 0.5}
              fill={"#141517"}
            >
              <Txt
                fill={"#e9ecef"}
                fontFamily={"JetBrainsMono VF"}
                fontWeight={750}
                fontSize={16 * 1.5}
                text={this.title}
              />
            </Rect>
          </Layout>
          <Layout layout direction={"row"} gap={16}>
            {range(3).map(() => (
              <Circle width={16 * 1.75} height={16 * 1.75} fill={"#495057"} />
            ))}
          </Layout>
        </Rect>
        <Rect ref={this.inner} padding={this.padding} fill={this.fill}>
          {this.layout() ? children : null}
        </Rect>
      </Rect>,
    );

    if (!this.layout()) {
      this.add(<Node position={this.inner().position}>{children}</Node>);
    }
  }
}
