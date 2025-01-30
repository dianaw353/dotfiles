import { Variable, bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Gtk } from "astal/gtk3";

export default function Workspaces() {
    const hypr = Hyprland.get_default();

    return (
        <box className="Workspaces">
            {bind(hypr, "workspaces").as(wss => wss
                .sort((a, b) => a.id - b.id)
                .map(ws => (
                    <button
                        className={bind(hypr, "focusedWorkspace").as(fw =>
                            ws === fw ? "focused" : "inactive")}
                        onClicked={() => ws.focus()}>
                        <box className="WorkspaceCircle" />
                    </button>
                ))
            )}
        </box>
    );
}
