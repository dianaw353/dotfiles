// import { App } from "astal/gtk3"
// import { Variable, bind } from "astal"
// import { Gdk } from "astal/gtk3"
// import Tray from "gi://AstalTray"

// export default function SysTray() {
//     const tray = Tray.get_default()

//     return <box>
//         {bind(tray, "items").as(items => items.map(item => {
//             if (item.iconThemePath)
//                 App.add_icons(item.iconThemePath)

//             const menu = item.create_menu()

//             return <button
//                 tooltipMarkup={bind(item, "tooltipMarkup")}
//                 onDestroy={() => menu?.destroy()}
//                 onClickRelease={self => {
//                     menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
//                 }}>
//                 <icon gIcon={bind(item, "gicon")} />
//             </button>
//         }))}
//     </box>
// }


// import { App } from "astal/gtk3";
// import { bind } from "astal";
// import { Gdk } from "astal/gtk3";
// import Tray from "gi://AstalTray";

// export default function SysTray() {
//     const tray = Tray.get_default();

//     return (
//         <box>
//             {bind(tray, "items").as(items => {
//                 // Filter out items with invalid gIcons
//                 const validItems = items.filter(item => {
//                     const gicon = item?.gicon;
//                     if (!gicon) {
//                         console.warn(`Invalid gIcon for item:`, item);
//                         return false;
//                     }
//                     return true;
//                 });

//                 return validItems.map(item => {
//                     if (item.iconThemePath) App.add_icons(item.iconThemePath);

//                     const menu = item.create_menu();
//                     const gicon = bind(item, "gicon"); // gIcon is guaranteed valid here

//                     return (
//                         <button
//                             tooltipMarkup={bind(item, "tooltipMarkup")}
//                             onDestroy={() => menu?.destroy()}
//                             onClickRelease={self => {
//                                 menu?.popup_at_widget(
//                                     self,
//                                     Gdk.Gravity.SOUTH,
//                                     Gdk.Gravity.NORTH,
//                                     null
//                                 );
//                             }}
//                         >
//                             <icon gIcon={gicon} />
//                         </button>
//                     );
//                 });
//             })}
//         </box>
//     );
// }

import { App } from "astal/gtk3";
import { bind } from "astal";
import { Gdk } from "astal/gtk3";
import Tray from "gi://AstalTray";

export default function SysTray() {
    const tray = Tray.get_default();

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

                    const menu = item.create_menu();
                    const gicon = bind(item, "gicon"); // gIcon is guaranteed valid here

                    return (
                        <button
                            tooltipMarkup={bind(item, "tooltipMarkup")}
                            onDestroy={() => menu?.destroy()}
                            onClickRelease={self => {
                                menu?.popup_at_widget(
                                    self,
                                    Gdk.Gravity.SOUTH,
                                    Gdk.Gravity.NORTH,
                                    null
                                );
                            }}
                        >
                            <icon gIcon={gicon} />
                        </button>
                    );
                });
            })}
        </box>
    );
}
