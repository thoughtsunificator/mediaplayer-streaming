export const pad = function(number, length) {
	let paddedNumber = ""
	for (let i = 0; i < length - number.toString().length; i++) {
		paddedNumber = paddedNumber.concat("0")
	}
	paddedNumber = paddedNumber.concat(number)
	return paddedNumber
}

export const secondsToHours = function(seconds) {
	seconds = seconds || 0
	let hours = Math.floor(seconds / 3600)
	seconds = seconds % 3600
	let minutes = Math.floor(seconds / 60)
	seconds = Math.floor(seconds % 60)
	return (hours > 0 ? (pad(hours, 2) + ":") : "").concat(pad(minutes, 2)).concat(":" + pad(seconds, 2))
}
