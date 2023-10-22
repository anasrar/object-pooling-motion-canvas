import {
  canvasStyleSignal,
  CanvasStyleSignal,
  initial,
  interpolation,
  PossibleCanvasStyle,
  signal,
} from "@motion-canvas/2d";
import {
  Layout,
  LayoutProps,
  Rect,
  Txt,
} from "@motion-canvas/2d/lib/components";
import { SignalValue, SimpleSignal, textLerp } from "@motion-canvas/core";

export interface NotificationProps extends LayoutProps {
  color?: SignalValue<PossibleCanvasStyle>;
  icon?: SignalValue<string>;
  title?: SignalValue<string>;
}

export class Notification extends Layout {
  @initial("#4dabf7")
  @canvasStyleSignal()
  public declare readonly color: CanvasStyleSignal<this>;

  @initial("󰋽")
  @interpolation(textLerp)
  @signal()
  public declare readonly icon: SimpleSignal<string, this>;

  @initial("Title")
  @interpolation(textLerp)
  @signal()
  public declare readonly title: SimpleSignal<string, this>;

  public constructor(props?: NotificationProps) {
    const { children, ...rest } = props;
    super({
      layout: true,
      ...rest,
    });

    this.add(
      <Rect
        layout
        direction={"row"}
        gap={16}
        minWidth={400}
        clip
        padding={16 * 0.5}
        radius={16 * 0.75}
        shadowOffset={[0, 16 * 0.5]}
        shadowBlur={16 * 0.5}
        shadowColor={"rgba(0, 0, 0, 0.5)"}
        fill={"#25262B"}
      >
        <Rect width={16 * 0.5} radius={16 * 0.5} fill={this.color} />
        <Layout
          layout
          direction={"column"}
          gap={16 * 0.5}
          grow={1}
          paddingRight={16 * 0.25}
        >
          <Layout layout direction={"row"} alignItems={"end"} gap={16 * 0.75}>
            <Txt
              fill={this.color}
              fontFamily={"Nerd Font Icon"}
              fontSize={16 * 1.75}
              text={this.icon}
            />
            <Txt
              fill={this.color}
              fontFamily={"Inter VF"}
              fontWeight={700}
              fontSize={16 * 1.4}
              text={this.title}
            />
          </Layout>
          {children}
        </Layout>
      </Rect>,
    );
  }
}
