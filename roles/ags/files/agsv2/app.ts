import { App } from "astal/gtk3"
import style from "./theme/style.scss"
import Bar from "./widget/bar/Bar"

App.start({
    css: style,
    instanceName: "js",
    requestHandler(request, res) {
        print(request)
        res("ok")
    },
    main: () => App.get_monitors().map(Bar),
})
