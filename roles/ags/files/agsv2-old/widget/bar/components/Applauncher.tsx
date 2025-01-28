import { Gtk, App } from "astal/gtk3";
import Applauncher from "./../../applauncher/Applauncher";

export default function AppsButton() {
    const AppLauncher = () => {
        const monitors = App.get_monitors();

        const applaunchers = monitors.map(() => {
            const launcher = Applauncher();
            launcher.hide();
            return launcher;
        });

        if (applaunchers.length > 0) {
            applaunchers[0].show();
        }
    };

    return (
        <box>
            <button
                className="AppsButton"
                onClicked={AppLauncher}>
                <box>
                    <icon icon="archlinux-logo" />
                    <label label="Apps" />
                </box>
            </button>
        </box>
    );
}
