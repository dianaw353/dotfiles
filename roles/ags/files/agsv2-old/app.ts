import { App } from "astal/gtk3";
import style from "./theme/dark/dark.scss";
import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notifications/NotificationPopups";
import Applauncher from "./widget/applauncher/Applauncher";

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
        
        const applaunchers = monitors.map(() => {
            const launcher = Applauncher();
            launcher.hide();
            return launcher;
        });

        return [...bars, ...notifications, ...applaunchers];
    }
});
