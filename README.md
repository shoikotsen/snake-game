# Snake

A modern take on the classic Snake game, built with HTML, CSS and vanilla JavaScript on a single canvas. The snake and the mouse are drawn in code, so there are no image files to load.

**Play it:** https://shoikotsen.github.io/snake-game/

## Features

- **Smooth, lifelike snake:** it glides between squares, curves around corners, slithers side to side, flicks a forked tongue and bulges after a meal
- **Mouse as food:** a mouse that twitches its ears, wiggles its tail and bobs while it waits
- **Four modes:**
  - Classic: walls are deadly
  - Wrap-around: leave one side, come back on the other
  - Obstacles: 10 random blocks on the board
  - Hunt: the mouse scurries away from you, and each catch is worth 15
- **Three difficulties:** Easy, Normal and Hard. The snake also speeds up every 5 mice, with a level counter
- **Bonuses:** a golden mouse worth +50 that runs off after 8 seconds, and a blue crystal that slows time for 6 seconds
- **Scores:** a best score for each mode and difficulty, plus a local top-5 list
- **Controls:** arrow keys or WASD, Space or P to pause, R to restart, swipe on phones, and on-screen arrow buttons on touch devices
- Pauses when you switch tabs, sound effects with a mute toggle, dark mode, and a mobile-friendly layout

## Run locally

Download the repository and open `index.html` in a browser. No build tools or server needed.

## Tech stack

HTML5 Canvas, CSS3, JavaScript (vanilla), Web Audio API, `localStorage`

## Notes

- Game rules run on a 20 by 20 grid. Movement is only smoothed in how it is drawn, so collisions stay exact.
- Scores are saved in your browser only.

## Author

Shoikot Sen, Computer Science student at the University of South Florida.
GitHub: [@shoikotsen](https://github.com/shoikotsen)
