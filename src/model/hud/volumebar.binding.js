import { Binding }  from "domodel"

const COLOR_CURRENT = "#111"
const COLOR_HOVER = "hsla(0, 0% ,20%, 0.5)"

export default class extends Binding {

	repaint(data) {
		if (data.muted === true || data.volume === 0) {
			this.root.style.background = ""
		} else {
			this.root.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${data.volume * 100}%, transparent 0%)`
		}
	}

	onCreated() {

		const { player } = this.properties

		let _mousedown = false
		let _muted = false
		let _volume = 1

		this.listen(player, "video volumechange", data => {
			this.root.value = data.volume
			_volume = data.volume
			_muted = data.muted
			this.repaint(data)
		})

		this.listen(player, "video loadeddata", data => {
			this.root.value = data.volume
			_volume = data.volume
			_muted = data.muted
			this.repaint(data)
		})

		this.listen(player, "volume set", (offsetX) => {
			const percent = (offsetX * 100) / this.root.offsetWidth
			let volume = (this.root.max * percent) / 100
			if (volume > 1) {
				volume = 1
			} else if (volume < 0) {
				volume = 0
			}
			player.emit("video volume set", volume)
			if (volume > 0 && _muted === true) {
				player.emit("video mute set", false)
			}
		})

		this.root.addEventListener("click", (event) => {
			player.emit("volume set", event.offsetX)
		})

		this.root.addEventListener("mousedown", () => {
			_mousedown = true
		})

		this.root.addEventListener("mouseup", () => {
			_mousedown = false
		})

		this.root.addEventListener("mouseout", () => {
			this.repaint({ volume: _volume, muted: _muted })
		})

		this.root.addEventListener("mousemove", (event) => {
			if (_mousedown === true) {
				player.emit("volume set", event.offsetX) // TODO
			}

			const currentPercent = (_volume * 100) / 1
			const hoverPercent = (event.offsetX * 100) / this.root.offsetWidth

			if (_muted === true || _volume === 0) {
				this.root.style.background = `linear-gradient(90deg, ${COLOR_HOVER} ${hoverPercent}%, ${COLOR_HOVER} ${hoverPercent}%, transparent ${hoverPercent}%, transparent 100%`
			} else if (hoverPercent < currentPercent) {
				this.root.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${hoverPercent}%, ${COLOR_HOVER} ${hoverPercent}%, ${COLOR_HOVER} ${currentPercent}%, transparent ${currentPercent}%, transparent 100%`
			} else {
				this.root.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${currentPercent}%, ${COLOR_HOVER} ${currentPercent}%, ${COLOR_HOVER} ${hoverPercent}%, transparent ${hoverPercent}%, transparent 100%`
			}
		})

	}

}
