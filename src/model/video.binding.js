import { Binding }  from "domodel"

export default class extends Binding {

	onCreated() {

		const { player } = this.properties

		this.listen(player, "screenshot", () => {
			const canvas = document.createElement("canvas")
			canvas.width = this.root.videoWidth
			canvas.height = this.root.videoHeight
			const ctx = canvas.getContext("2d")
			ctx.drawImage(this.root, 0, 0, canvas.width, canvas.height)
			const dataURI = canvas.toDataURL("image/png")
			const link = document.createElement("a")
			link.href = dataURI
			const date = new Date()
			link.download = `screenshot-mediaplayer-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.png`
			link.click()
		})

		this.listen(player, "video time set", data => {
			this.root.currentTime = data
		})

		this.listen(player, "video skip backward", () => {
			if (this.root.currentTime - 10 >= 0) {
				this.root.currentTime -= this.root.duration / 10
			} else {
				this.root.currentTime = 0
			}
		})

		this.listen(player, "video skip forward", () => {
			if (this.root.currentTime + (this.root.duration / 10) <= this.root.duration) {
				this.root.currentTime += this.root.duration / 10
			} else {
				this.root.currentTime = this.root.duration
			}
		})

		this.listen(player, "video speed increase", () => {
			this.root.playbackRate += 0.5
		})

		this.listen(player, "video speed decrease", () => {
			this.root.playbackRate -= 0.5
		})

		this.listen(player, "media url set", data => {
			this.root.src = data
		})

		this.listen(player, "video playback toggle", () => {
			if (this.root.paused === true) {
				this.root.play()
			} else {
				this.root.pause()
			}
		})

		this.listen(player, "video volume toggle", () => {
			this.root.muted = !this.root.muted
		})

		this.listen(player, "video volume set", data => {
			this.root.volume = data
		})

		this.listen(player, "video mute set", data => {
			this.root.muted = data
		})

		this.root.addEventListener("click", () => {
			player.emit("video playback toggle")
		})

		this.root.addEventListener("ended", () => {
			player.emit("media next")
		})

		this.root.addEventListener("error", (event) => {
			console.log(event)
		})

		this.root.addEventListener("dblclick", () => {
			player.emit("fullscreen toggle")
		})

		this.root.addEventListener("durationchange", () => {
			console.log("durationchange")
			player.emit("video durationchange", { duration: this.root.duration, currentTime: this.root.currentTime })
		})

		this.root.addEventListener("loadeddata", () => {
			console.log("loadeddata")
			player.emit("video loadeddata", { duration: this.root.duration, volume: this.root.volume, muted: this.root.muted, src: this.root.src, currentTime: this.root.currentTime })
		})

		this.root.addEventListener("loadedmetadata", () => {
			console.log("loadedmetadata")
			player.emit("hud show")
		})

		this.root.addEventListener("loadstart", () => {
			console.log("loadstart")
		})

		this.root.addEventListener("pause", () => {
			player.emit("video pause")
		})

		this.root.addEventListener("play", () => {
			player.emit("video play")
		})

		this.root.addEventListener("progress", () => {
			player.emit("video progress")
		})

		this.root.addEventListener("seeked", () => {
			player.emit("video seeked", this.root.buffered)
		})

		this.root.addEventListener("seeking", () => {
			player.emit("video seeking")
		})

		this.root.addEventListener("timeupdate", () => {
			player.emit("video timeupdate", {
				currentTime: this.root.currentTime,
				duration: this.root.duration
			})
		})

		this.root.addEventListener("volumechange", () => {
			player.emit("video volumechange", {
				volume: this.root.volume,
				muted: this.root.muted
			})
		})

	}

}
