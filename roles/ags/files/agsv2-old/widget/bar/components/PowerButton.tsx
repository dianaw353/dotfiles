import { Astal, Gtk, Gdk } from "astal/gtk3";
import Powermenu from "./Powermenu"; // Import the Powermenu component

export default function PowerButton() {
    return (
        <button
            className="PowerButton"
            onClicked={() => {
                const powermenu = new Powermenu(); // Create a new Powermenu instance
                powermenu.show(); // Show the Powermenu window
            }}
        >
            <icon icon="system-shutdown-symbolic" />
        </button>
    );
}

