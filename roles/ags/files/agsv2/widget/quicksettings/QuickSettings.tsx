import { App, Astal, Gdk, Gtk } from "astal/gtk3"

function hide() {
  App.get_window("quicksettings")!.hide();
}

export default function QS() {
  return(
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
    >
      <box className="powermenu-container"
        hexpand={false}
        heightRequest={500} widthRequest={500} 
        comment="We'll be filling the contents of this thing later...">
          <eventbox onClick={hide} />
      </box>
    </window>
  );
}