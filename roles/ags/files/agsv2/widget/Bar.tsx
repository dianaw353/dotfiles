import { Astal, Gtk, Gdk } from "astal/gtk3"

import Workspaces from "./components/Workspaces"
import SysTray from "./components/SysTray"
import Wifi from "./components/Wifi"
import AudioSlider from "./components/AudioSlider"
import BatteryLevel from "./components/BatteryLevel"
import Media from "./components/Media"
import FocusedClient from "./components/FocusedClient";
import Time from "./components/Time";

export default function Bar(monitor: Gdk.Monitor) {
    const anchor = Astal.WindowAnchor.TOP
        | Astal.WindowAnchor.LEFT
        | Astal.WindowAnchor.RIGHT

    return <window
        className="Bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={anchor}>
        <centerbox>
            <box hexpand halign={Gtk.Align.START}>
                <Workspaces />
                <FocusedClient />
            </box>
            <box>
                <Media />
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <SysTray />
                <Wifi />
                <AudioSlider />
                <BatteryLevel />
                <Time />
            </box>
        </centerbox>
    </window>
}
