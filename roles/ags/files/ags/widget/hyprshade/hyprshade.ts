import PopupWindow from "widget/PopupWindow";
import icons from "lib/icons";

function Hyprshade() {
    const handleAccept = ({ text }) => {
        if (text) {
            console.log(`Search text: ${text}`);
        }
        entry.get_child(0).text = "";
    };

    const handleChange = ({ text }) => {
        console.log(`Search text changed: ${text}`);
    };

    const entry = Widget.Box({
        vertical: true,
        hexpand: true,
        children: [
            Widget.Entry({
                hexpand: true,
                primary_icon_name: icons.ui.search,
                on_accept: handleAccept,
                on_change: handleChange,
            }),
            Widget.Separator(),
        ],
    });

    return Widget.Box({
        vertical: true,
        css: "padding: 1px; margin: 5pt;",
        className: "hyprshade",
        children: [entry],
    });
}

export default () => PopupWindow({
    name: "hyprshade",
    layout: "top",
    child: Hyprshade(),
});

