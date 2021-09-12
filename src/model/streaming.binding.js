import { Binding }  from "domodel"

import HOTKEYS from "../../data/hotkeys.js"

import VideoModel from "./video.js"
import HudModel from "./hud.js"

import VideoBinding from "./video.binding.js"
import HudBinding from "./hud.binding.js"

export default class extends Binding {

	onCreated() {

		const { player, hotkeys } = this.properties

		let _paused = false
		let _mouseover = false
		let _lastX
		let _lastY

		this.listen(player, "video pause", () => {
			_paused = true
		})

		this.listen(player, "video play", () => {
			_paused = false
		})

		this.listen(player, "hud hide", () => {
			if (_paused === false) {
				this.root.classList.add("hide-cursor")
			}
		})

		this.listen(player, "hud show", () => {
			this.root.classList.remove("hide-cursor")
		})

		this.listen(player, "video seeked", () => {
			this.root.className = "media"
		})

		this.listen(player, "video seeking", () => {
			this.root.className = "media buffering"
		})

		this.root.addEventListener("mousemove", function(event) {
			if (_mouseover === false && _paused === false && (typeof _lastX === "undefined" || (_lastX !== event.x || _lastY !== event.y))) {
				player.emit("hud show")
			}
			_lastY = event.y
			_lastX = event.x
		})

		player.emit("hotkeys add", { ...HOTKEYS, ...hotkeys })

		this.run(VideoModel, { parentNode: this.root, binding: new VideoBinding({ player }) })
		this.run(HudModel, { parentNode: this.root, binding: new HudBinding({ player }) })

	}

}
