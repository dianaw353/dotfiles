import { App, Astal, Gtk, Gdk } from "astal/gtk3";

function hide() {
  App.get_window("powermenu")!.hide();
}

export default function Powermenu() {
  const actions = [
    {
      action: "shutdown",
      icon: "system-shutdown-symbolic",
      label: "Shutdown",
      onClicked: () => {
        console.log("Shutting down...");
        hide();
      },
    },
    {
      action: "restart",
      icon: "system-reboot-symbolic",
      label: "Reboot",
      onClicked: () => {
        console.log("Restarting...");
        hide();
      },
    },
    {
      action: "suspend",
      icon: "system-suspend-symbolic",
      label: "Sleep",
      onClicked: () => {
        console.log("Suspending...");
        hide();
      },
    },
    {
      action: "logout",
      icon: "system-log-out-symbolic",
      label: "Log Out",
      onClicked: () => {
        console.log("Logging out...");
        hide();
      },
    },
    {
      action: "lock",
      icon: "system-lock-screen-symbolic",
      label: "Lock",
      onClicked: () => {
        console.log("Locking screen...");
        hide();
      },
    },
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
      className="window"
    >
      <box className="powermenu-container">
        <box
          hexpand={false}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
        >
          <box orientation="horizontal" spacing={16} className="action-buttons">
            {actions.map((action) => (
              <button className="action-button" onClicked={action.onClicked}>
                <box className="action-content">
                  <icon className="action-icon" icon={action.icon} />
                  <label className="action-label" label={action.label} />
                </box>
              </button>
            ))}
          </box>
        </box>
        <eventbox expand onClick={hide} className="overlay" />
      </box>
    </window>
  );
}

