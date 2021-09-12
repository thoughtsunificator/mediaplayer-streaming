import { Binding }  from "domodel"

export default class extends Binding {

	hide() {
		clearTimeout(this.hideTimeout)
		if (this.paused === false) {
			this.root.classList.add("hidden")
		}
	}

	show() {
		clearTimeout(this.hideTimeout)
		this.root.classList.remove("hidden")
		this.hideTimeout = setTimeout(() => this.hide(), 3000)
	}

	onCreated() {

		const { player } = this.properties

		let _mouseover = false

		this.hideTimeout = null
		this.paused = false

		this.listen(player, "hud hide", () => {
			this.hide()
		})

		this.listen(player, "hud show", () => {
			this.show()
		})

		this.listen(player, "video volumechange", data => {
			if (data.muted === true || data.volume === 0) {
				this.identifier.mute.textContent = "🔇"
			} else if (data.volume < 1 / 3) {
				this.identifier.mute.textContent = "🔈"
			} else if (data.volume < 1 / 2) {
				this.identifier.mute.textContent = "🔉"
			} else {
				this.identifier.mute.textContent = "🔊"
			}
		})

		this.listen(player, "video pause", () => {
			this.paused = true
			this.identifier.play.textContent = "▶️"
			this.show()
		})

		this.listen(player, "video play", () => {
			this.paused = false
			this.identifier.play.textContent = "⏸️"
			if (_mouseover === false) {
				this.hide()
			}
		})

		this.root.addEventListener("mouseover", () => {
			_mouseover = true
			this.show()
		})

		this.root.addEventListener("mouseout", () => {
			_mouseover = false
			if (this.paused === false) {
				this.hide()
			}
		})

		this.identifier.fullscreen.addEventListener("click", () => {
			player.emit("fullscreen toggle")
		})

		this.identifier.play.addEventListener("click", () => {
			player.emit("video playback toggle")
		})

		this.identifier.mute.addEventListener("click", () => {
			player.emit("video volume toggle")
		})

		this.identifier.screenshot.addEventListener("click", () => {
			player.emit("screenshot")
		})

	}

}
