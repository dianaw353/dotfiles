import { Astal, Gtk, Gdk } from "astal/gtk3"
import PowerButton from "./components/PowerButton";
import Workspaces from "./components/Workspaces"
import SysTray from "./components/SysTray"
import QSButton from "./components/QSButton"
import Media from "./components/Media"
import FocusedClient from "./components/FocusedClient";
import Time from "./components/Time";
import AppLauncher from "./components/Applauncher";

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
                <AppLauncher />
                <Workspaces />
                <FocusedClient />
            </box>
            <box>
                <Time />
                <Media />
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <SysTray />
                <QSButton />
                <PowerButton />
            </box>
        </centerbox>
    </window>
}

