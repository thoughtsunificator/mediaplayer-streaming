export default {
	tagName: "div",
	className: "seekbar",
	children: [
		{
			tagName: "input",
			identifier: "timeline",
			type: "range",
			value: 0,
			min: 0,
			step: "any"
		}
	]
}
