import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { execAsync } from "astal/process";
import BatteryLevel from "../bar/components/BatteryLevel";
import Audio from "./Audio";

function hide() {
  App.get_window("quicksettings")!.hide();
}

async function handleAction(action: string){
  try {
    let command: string;
    switch (action) {
      case "shutdown":
        command = "shutdown now";
        break;
      case "logout":
        command = "systemctl logout";
        break;
      default:
        return;
    }
    await execAsync(command);
  } catch (err) {
  }
}

export default function QS() {
  const actions = [
    { action: "logout", icon: "system-log-out-symbolic" },
    { action: "shutdown", icon: "system-shutdown-symbolic" },
  ];
  
  return (
    <window
      name="quicksettings"
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={App}
      onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
      }}
      className="quicksettings"
      marginTop={70}
      marginRight={20}
    >
      <box className="quicksettings-container"
        hexpand={false}
        comment="We'll be filling the contents of this thing later...">
        
        <box orientation="vertical" spacing={16} className="mini-qsbuttons-master" vertical>
          <box orientation="horizontal" spacing={16} className="mini-qsbuttons">
            <button valign={Gtk.Align.LEFT} vertical>
              <BatteryLevel />
            </button>
          <box orientation="vertical" widthRequest={350} />
            {actions.map(({ action, icon }) => (
              <button
                className="action-mini-qsbutton"
                onClicked={() => handleAction(action)}
                valign={Gtk.Align.CENTER}
                vertical
              >
                <icon className="action-qsicon" icon={icon} />
              </button>
            ))}
          </box>
          
          <box orientation="horizontal" spacing={16} className="slider-container" halign={Gtk.Align.CENTER} widthRequest={470}>
            <Audio />
          </box>
        </box>
        
        <eventbox onClick={hide} />
      </box>
    </window>
  );
}
