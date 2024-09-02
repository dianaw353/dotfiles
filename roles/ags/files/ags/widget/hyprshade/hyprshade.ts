import PopupWindow from "widget/PopupWindow";
import icons from "lib/icons";

function Hyprshade() {
    const handleAccept = ({ text }) => {
        if (text) {
            
        }
        entry.get_child(0).text = "";
    };

    const handleChange = ({ text }) => {
        
    };

    const entry = Widget.Entry({
        hexpand: true,
        primary_icon_name: icons.ui.search,
        on_accept: handleAccept,
        on_change: handleChange,
    });

    function focus() {
        entry.text = "";
        entry.set_position(-1);
        entry.select_region(0, -1);
        entry.grab_focus();
    }

    const layout = Widget.Box({
        vertical: true,
        css: "padding: 1px; margin-top: 120px;",
        className: "hyprshade",
        setup: self => self.hook(App, (_, win, visible) => {
            if (win !== "hyprshade")
                return;

            if (visible) {
                focus();
            }
        }),
        children: [
            Widget.Box({
                vertical: true,
                hexpand: true,
                children: [
                    entry,
                    Widget.Separator(),
                ],
            }),
        ],
    });

    return layout;
}

export default () => PopupWindow({
    name: "hyprshade",
    layout: "top",
    child: Hyprshade(),
});
