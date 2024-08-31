import PopupWindow from "../PopupWindow";
import Header from "./Header";
// import Data from ".data/shortcuts" // To Do Pull keybind data

function Keybinds() {
    return Widget.Box(
        { 
            vertical: true,
            className: "keybinds"
        },
        Header
        // Data
    );
}

export default () => PopupWindow({
    name: "keybinds",
    layout: "center",
    child: Keybinds()
});
