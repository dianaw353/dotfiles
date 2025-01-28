import Audio from "./Audio";
import QS from "../../quicksettings/QuickSettings";
import BatteryLevel from "./BatteryLevel";
import Wifi from "./Wifi";

export default function QSButton(){
    return (
        <button className="QSButton"
            onClicked={() => {
                const qsmenu = new QS();
                qsmenu.show();
            }}
        >
            <box>
                <Wifi />
                <Audio />
                <BatteryLevel />
            </box>
        </button>
    );
}