import { Binding }  from "domodel"

const COLOR_CURRENT = "#111"
const COLOR_BUFFERED = "#131313"
const COLOR_HOVER = "hsla(0, 0% ,20%, 0.5)"

export default class extends Binding {

	repaint() {
		const buffer = this.buffered
		for (let i = buffer.length; i--;) {
			if (this.currentTime >= buffer.start(i) && this.currentTime <= buffer.end(i)) {
				const percents = {
					currentTime: (this.currentTime * 100) / this.duration,
					bufferStart: (buffer.start(i) * 100) / this.duration,
					bufferEnd: (buffer.end(i) * 100) / this.duration
				}
				if (this.offsetX !== null) {
					percents.cursorTime = (this.offsetX * 100) / this.identifier.timeline.offsetWidth
					if (percents.cursorTime < percents.currentTime) {
						this.identifier.timeline.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${percents.cursorTime}%, ${COLOR_HOVER} ${percents.cursorTime}%, ${COLOR_HOVER} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.bufferEnd}%, transparent ${percents.bufferEnd}%, transparent 100%`
					} else {
						this.identifier.timeline.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.bufferEnd}%, ${COLOR_HOVER} ${percents.bufferEnd}%, ${COLOR_HOVER} ${percents.cursorTime}%, transparent ${percents.cursorTime}%, transparent 100%`
					}
				} else {
					this.identifier.timeline.style.background = `linear-gradient(90deg, ${COLOR_CURRENT}, ${COLOR_CURRENT} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.currentTime}%, ${COLOR_BUFFERED} ${percents.bufferEnd}%, transparent ${percents.bufferEnd}%, transparent 100%`
				}
				break
			}
		}
	}

	setTime(offsetX) {
		let percent = (offsetX * 100) / this.identifier.timeline.offsetWidth
		let time = (this.identifier.timeline.max * percent) / 100
		if (time > this.duration) {
			time = this.duration
		} else if (time < 0) {
			time = 0
		}
		this.properties.player.emit("video time set", time)
	}

	onCreated() {

		const { player } = this.properties

		let _mousedown = false

		this.offsetX = null
		this.currentTime = 0
		this.duration = 0
		this.buffered = 0

		this.listen(player, "video loadeddata", () => {
			this.repaint()
		})

		this.listen(player, "video timeupdate", data => {
			this.currentTime = data.currentTime
			this.identifier.timeline.value = data.currentTime
			this.repaint()
		})

		this.listen(player, "video durationchange", data => {
			this.duration = data.duration
			this.identifier.timeline.max = data.duration
			this.repaint()
		})

		this.listen(player, "video seeked", data => {
			this.buffered = data
		})

		this.identifier.timeline.addEventListener("click", (event) => {
			this.setTime(event.offsetX)
		})

		this.identifier.timeline.addEventListener("mousedown", () => {
			_mousedown = true
		})

		this.identifier.timeline.addEventListener("mouseout", () => {
			this.offsetX = null
			this.repaint()
		})

		this.identifier.timeline.addEventListener("mousemove", (event) => {
			if (_mousedown === true) {
				this.setTime(event.offsetX)
			}
			this.offsetX = event.offsetX
			this.repaint()
		})

		this.identifier.timeline.addEventListener("mouseup", () => {
			_mousedown = false
		})

	}

}
