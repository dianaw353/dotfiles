import RegularWindow from "widget/RegularWindow"
import layout from "./layout"
import icons from "lib/icons"
import options from "options"

const current = Variable(layout[0].attribute.name)

const Header = () => Widget.Box({
    class_name: "header",
    children: [
        Widget.Button({
            class_name: "reset",
            on_clicked: options.reset,
            hpack: "start",
            vpack: "start",
            child: Widget.Icon(icons.ui.refresh),
            tooltip_text: "Reset",
        }),
    ],
})

const Sidebar = () => Widget.Box({
    class_name: "sidebar",
    vertical: true,
    children: layout.map(({ attribute: { name, icon } }) => Widget.Button({
        xalign: 0,
        class_name: current.bind().as(v => `${v === name ? "active" : ""}`),
        on_clicked: () => current.value = name,
        child: Widget.Box([
            Widget.Icon(icon),
            Widget.Label(name),
        ]),
    })),
})

const PagesStack = () => Widget.Stack({
    transition: "slide_left_right",
    children: layout.reduce((obj, page) => ({ ...obj, [page.attribute.name]: page }), {}),
    shown: current.bind() as never,
})

export default () => RegularWindow({
    name: "settings-dialog",
    class_name: "settings-dialog",
    title: "Settings",
    setup(win) {
        win.on("delete-event", () => {
            win.hide()
            return true
        })
        win.set_default_size(800, 600)
    },
    child: Widget.Box({
        vertical: true,
        children: [
            Header(),
            Widget.Box({
                vertical: false,
                children: [
                    Sidebar(),
                    Widget.Box({
                        vertical: true,
                        children: [
                            PagesStack(),
                        ],
                    }),
                ],
            }),
        ],
    }),
})
