import { Variable, GLib, bind } from "astal";
import { Gtk } from "astal/gtk3";
import Network from "gi://AstalNetwork";
import { exec, execAsync } from "astal/process"

export default function NetworkButton() {
  const { wifi } = Network.get_default();

  const getWifiStatusLabel = () => {
    if (!wifi.enabled) {
      return "Connecting...";
    } else if (wifi.ssid) {
      return wifi.ssid; // Display the SSID if connected
    } else {
      return "Enabled"; // Display "Enabled" if Wi-Fi is on but not connected
    }
  };

  const toggleWifi = () => {
    if (wifi.enabled) {
      wifi.set_enabled(false); // Disable Wi-Fi
    } else {
      wifi.set_enabled(true); // Enable Wi-Fi
    }
  };

  const handleMainButtonClick = () => {
    toggleWifi();
    console.log(`Wi-Fi is now ${wifi.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleDropdownButtonClick = () => {
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
              label={getWifiStatusLabel()} // Use the status label function
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
