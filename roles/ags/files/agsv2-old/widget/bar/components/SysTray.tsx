import { App } from "astal/gtk3";
import { bind } from "astal";
import { Gdk } from "astal/gtk3";
import Tray from "gi://AstalTray";

export default function SysTray() {
    const tray = Tray.get_default()

    return (
        <box className="SysTray">
            {bind(tray, "items").as(items => {
                // Filter out items with invalid gIcons
                const validItems = items.filter(item => {
                    const gicon = item?.gicon;
                    if (!gicon) {
                        console.warn(`Invalid gIcon for item:`, item);
                        return false;
                    }
                    return true;
                });

                return validItems.map(item => {
                    if (item.iconThemePath) App.add_icons(item.iconThemePath);
                    const gicon = bind(item, "gicon");

                    return (
                        <menubutton
                            tooltipMarkup={bind(item, "tooltipMarkup")}
                            usePopover={false}
                            actionGroup={bind(item, "action-group").as(ag => ["dbusmenu", ag])}
                            menuModel={bind(item, "menu-model")}>
                            <icon gicon={gicon} />
                        </menubutton>
                    );
                });
            })}
        </box>
    );
}
