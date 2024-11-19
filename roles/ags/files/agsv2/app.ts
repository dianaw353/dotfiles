import { App } from "astal/gtk3";
import style from "./theme/style.scss";
import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notifications/NotificationPopups";

App.start({
    css: style,
    instanceName: "js",
    requestHandler(request, res) {
        print(request);
        res("ok");
    },
    main: () => {
        const monitors = App.get_monitors();
        const bars = monitors.map(Bar);
        const notifications = monitors.map(NotificationPopups);
        
        return [...bars, ...notifications];
    }
});
