import { bind } from "astal";
import Wp from "gi://AstalWp";

export default function Audio() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!;

    return (
        <box className="Audio">
            <icon icon={bind(speaker, "volumeIcon")} />
        </box>
    );
}
