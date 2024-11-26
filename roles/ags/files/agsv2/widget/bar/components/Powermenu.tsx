import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { execAsync } from "astal/process";

function hide() {
  App.get_window("powermenu")!.hide();
}

async function handleAction(action: string) {
  hide();

  try {
    let command: string;
    switch (action) {
      case "shutdown":
        command = "shutdown now";
        break;

      case "restart":
        command = "reboot";
        break;

      case "suspend":
        command = "systemctl suspend";
        break;

      case "logout":
        command = "systemctl logout";
        break;

      case "lock":
        command = "loginctl lock-session";
        break;

      default:
        return;
    }

    await execAsync(command);
  } catch (err) {
  }
}

export default function Powermenu() {
  const actions = [
    { action: "shutdown", icon: "system-shutdown-symbolic", label: "Shutdown" },
    { action: "restart", icon: "system-reboot-symbolic", label: "Reboot" },
    { action: "suspend", icon: "system-suspend-symbolic", label: "Sleep" },
    { action: "logout", icon: "system-log-out-symbolic", label: "Log Out" },
    { action: "lock", icon: "system-lock-screen-symbolic", label: "Lock" },
  ];

  return (
    <window
      name="powermenu"
      anchor={Astal.WindowAnchor.CENTER}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={App}
      onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
      }}
      onButtonPressEvent={(self, event: Gdk.EventButton) => {
        const [x, y] = event.get_position();
        const windowRect = self.get_allocation();

        if (x < windowRect.x || x > windowRect.x + windowRect.width || y < windowRect.y || y > windowRect.y + windowRect.height) {
          hide();
        }
      }}
      className="window"
    >
      <box className="powermenu-container">
        <box
          hexpand={false}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
        >
          <box orientation="horizontal" spacing={16} className="action-buttons">
            {actions.map(({ action, icon, label }) => (
              <box valign={Gtk.Align.CENTER} vertical className="action-button-master">
                <button
                  className="action-button"
                  onClicked={() => handleAction(action)}
                  aria-label={label}
                >
                  <box valign={Gtk.Align.CENTER} vertical className="action-container">
                    <icon className="action-icon" icon={icon} />
                  </box>
                </button>
                <label className="action-label" label={label} />
              </box>
            ))}
          </box>
        </box>
        <eventbox expand className="overlay" />
      </box>
    </window>
  );
}
