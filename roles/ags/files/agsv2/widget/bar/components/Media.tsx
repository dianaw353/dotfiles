import { bind } from "astal"
import Mpris from "gi://AstalMpris"

export default function Media() {
    const mpris = Mpris.get_default()

    return (
        <box className="Media">
            {bind(mpris, "players").as(ps => ps[0] ? (
                <box orientation="horizontal" spacing={5}>
                    <icon icon="folder-music-symbolic" />
                    <label label={bind(ps[0], "title").as(() =>
                        `${ps[0].title} - ${ps[0].artist}`
                    )} />
                </box>
            ) : (
                ""
            ))}
        </box>
    )
}
