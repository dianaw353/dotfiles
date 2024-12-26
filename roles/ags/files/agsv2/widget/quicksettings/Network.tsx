import { Variable, GLib, bind } from "astal";
import { Gtk } from "astal/gtk3";
import { exec, execAsync } from "astal/process";
import Network from "gi://AstalNetwork";

export default function NetworkButton() {
  const { wifi } = Network.get_default();

  const handleMainButtonClick = () => {
    // Logic for the main button click
    console.log("Main button clicked!");
  };

  const handleDropdownButtonClick = () => {
    // Logic for the dropdown button click
    exec("wezterm -e sh -c 'printf \"\\033]0;Network Manager TUI\\007\"; nmtui'")
    console.log("Dropdown button clicked!");
  };

  return (
    <box orientation="vertical" spacing={5} valign={Gtk.Align.CENTER}>
      <box orientation="horizontal" spacing={0}>
        <button onClick={handleMainButtonClick}>
          <box orientation="vertical" spacing={5}>
            <icon
              className="Wifi"
              icon={bind(wifi, "iconName")}
            />
            <label
              className="ssid"
              label={bind(wifi, "ssid").as(String)}
            />
          </box>
        </button>
        <button onClick={handleDropdownButtonClick}>
          <icon
            className="down"
            icon="preferences-system-symbolic"
          />
        </button>
      </box>
    </box>
  );
}
