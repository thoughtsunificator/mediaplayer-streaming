# mediaplayer-streaming [![Build Status](https://travis-ci.com/thoughtsunificator/mediaplayer-streaming.svg?branch=master)](https://travis-ci.com/thoughtsunificator/mediaplayer-streaming)

Streaming component for [mediaplayer](https://github.com/thoughtsunificator/mediaplayer).

## Getting started

### Prerequisites

- [domodel](https://github.com/thoughtsunificator/domodel)

### Installing

- ``npm install @thoughtsunificator/mediaplayer-core``

### Usage

```javascript
import { Core }  from "domodel"
import { Player, PlayerBinding, PlayerModel } from "@thoughtsunificator/mediaplayer-core"
import { StreamingModel, StreamingBinding } from "@thoughtsunificator/mediaplayer-streaming"

import HOTKEYS from "data/hotkeys.js"

window.addEventListener("load", async function() {

	const player = new Player()

	Core.run(PlayerModel, {
		parentNode: document.body,
		binding: new PlayerBinding({
			player,
			hotkeys: HOTKEYS,
			model: StreamingModel,
			binding: new StreamingBinding({ player })
		})
	})

	player.emit("media url set", "./resource/trailer.mp4")

})

```

### Events

| Name                      | Target      
| --------------------------|---------------------
| media url set             | Player
| hud show                  | Player
| hud hide                  | Player   
| video volumechange        | Player        
| video play                | Player     
| video pause               | Player
| video playback toggle     | Player
| video volume toggle       | Player
| screenshot                | Player
| video time set            | Player
| video skip backward       | Player
| video skip forward        | Player
| video speed increase      | Player
| video speed decrease      | Player
| video volume toggle       | Player
| video volume set          | Player
| video mute set            | Player
| video durationchange      | Player
| video loadeddata          | Player
| video progress            | Player
| video loadeddata          | Player
| video seeked              | Player
| video timeupdate          | Player
| video volumechange        | Player

### Demo

See [https://github.com/thoughtsunificator/mediaplayer-streaming-demo](https://github.com/thoughtsunificator/mediaplayer-streaming-demo).
