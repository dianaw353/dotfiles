import Brightness from "./utils/BrightnessService";
import { Variable, GLib, bind } from "astal";
import { Gtk } from "astal/gtk3";

export default function BrightnessSlider() {
    const brightness = Brightness.get_default();

    return (
        <box className="BrightnessSlider" css="min-width: 140px" orientation="horizontal" spacing={8}>
            <icon icon="display-brightness-symbolic" />
            <slider
                value={bind(brightness, "screen")}
                onDragged={({ value }) => brightness.screen = value}
                hexpand
            />
        </box>
    );
}
