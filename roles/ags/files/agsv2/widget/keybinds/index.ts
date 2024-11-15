import PopupWindow from "../PopupWindow";
import Header from "./Header";
import data from "./data/shortcuts";

function Keybinds() {
    const [column1, column2, column3] = data;

    const renderColumn = (columnData) => (
        Widget.Box({
            vertical: true,
            className: 'column-list',
            children: columnData.map((category) => Widget.Box({
                vertical: true,
                className: 'catagory-group',
                children: [
                    Widget.Label({
                        xalign: 0,
                        className: 'catagory-label',
                        css: 'font-size: 1.5em;',
                        label: `${category.icon}  ${category.name}`
                    }),
                    Widget.Box({
                        vertical: false,
                        children: [
                            Widget.Box({
                                vertical: true,
                                homogeneous: true,
                                children: category.binds.map((keybinds) => Widget.Box({
                                    vertical: false,
                                    className: 'catagory-row',
                                    children: [
                                        Widget.Label({
                                            label: `${keybinds.keys.join(' ')} `,
                                            className: `${['OR', '+'].includes(keybinds.keys[0]) ? 'cheatsheet-key-notkey' : 'cheatsheet-key cheatsheet-color-' + category.id}`,
                                        })
                                    ]
                                }))
                            }),
                            Widget.Box({
                                vertical: true,
                                homogeneous: true,
                                children: category.binds.map((keybinds) => Widget.Label({
                                    xalign: 0,
                                    label: keybinds.action,
                                    className: 'catagory-row', 
                                }))
                            })
                        ]
                    })
                ]
            }))
        })
    );

    return Widget.Box({
        vertical: true,
        className: "keybinds",
        children: [
            Header,
            Widget.Box({
                vertical: false,
                className: "keybinds-list",
                children: [
                    renderColumn(column1),
                    renderColumn(column2),
                    renderColumn(column3)
                ]
            })
        ]
    });
}

export default () => PopupWindow({
    name: 'keybinds',
    layout: 'center',
    child: Keybinds()
});
