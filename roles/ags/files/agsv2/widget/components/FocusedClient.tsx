import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Gtk } from "astal/gtk3";
                        
export default function FocusedClient() {
    const hypr = Hyprland.get_default();
    const focused = bind(hypr, "focusedClient");

    return (
        <box className="Focused" visible={focused.as(Boolean)}>
            {focused.as(client => (
                client && <label label={bind(client, "title").as(String)} />
            ))}
        </box>
    );
}
