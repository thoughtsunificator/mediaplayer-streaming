import TimeModel from "./hud/time.js"
import TimeBinding from "./hud/time.binding.js"

import SeekbarModel from "./hud/seekbar.js"
import SeekbarBinding from "./hud/seekbar.binding.js"

import VolumebarModel from "./hud/volumebar.js"
import VolumebarBinding from "./hud/volumebar.binding.js"

export default {
	tagName: "div",
	className: "video_hud",
	children: [
		{
			tagName: "button",
			textContent: "▶️",
			identifier: "play",
			title: "Play/Pause"
		},
		{
			model: SeekbarModel,
			binding: SeekbarBinding
		},
		{
			model: TimeModel({ text: "00:00 / 00:00" }),
			binding: TimeBinding
		},
		{
			tagName: "button",
			identifier: "mute",
			textContent: "🔊",
			title: "Toggle volume"
		},
		{
			model: VolumebarModel,
			binding: VolumebarBinding
		},
		{
			tagName: "button",
			identifier: "screenshot",
			textContent: "📷",
			title: "Take a screenshot"
		},
		{
			tagName: "button",
			textContent: "🖵",
			identifier: "fullscreen",
			title: "Toggle fullscreen"
		}
	]
}
