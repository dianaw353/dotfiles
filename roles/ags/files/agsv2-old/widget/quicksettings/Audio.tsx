import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable, GLib, bind } from "astal"
import Wp from "gi://AstalWp"

export default function Audio() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <box className="AudioSlider" css="min-width: 140px">
        <icon icon={bind(speaker, "volumeIcon")} />
        <slider
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}
