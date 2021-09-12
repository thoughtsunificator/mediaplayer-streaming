import { Binding }  from "domodel"
import { secondsToHours } from "../../../lib/util.js"

export default class extends Binding {

	onCreated() {

		const { player } = this.properties

		this.listen(player, "video timeupdate", data => {
			this.root.textContent = `${secondsToHours(data.currentTime)} / ${secondsToHours(data.duration)}`
		})

		this.listen(player, "video durationchange", data => {
			this.root.textContent = `${secondsToHours(data.currentTime)} / ${secondsToHours(data.duration)}`
		})

	}

}
