// https://openprocessing.org/sketch/1228302

const ratio = 1.414;
const canvasWidth = 620;
const canvasHeight = canvasWidth * ratio;

let colors = [
	"#abcd5e",
	"#29ac9f",
	"#14976b",
	"#b3dce0",
	"#62b6de",
	"#2b67af",
	"#ffd400",
	"#f589a3",
	"#f0502a",
	"#fc8405",
];

const getRandom = (max) => {
	return Math.floor(fxrand() * max) || 1;
};

const getRandomArbitrary = (min, max) => {
	return Math.floor(fxrand() * (max - min) + min);
};

const getRandomArbitraryFixed = (min, max) => {
	return Number((fxrand() * (max - min) + min).toFixed(2));
};

const getRandomColor = (colors) => {
	const min = 0;
	const max = colors.length;
	const i = getRandomArbitrary(min, max);
	return colors[i];
};

const shuffleColors = () => {
	return colors.sort(() => fxrand() - 0.5);
};

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	noStroke();
	blendMode(BLEND);
	background(0);
}

function draw() {
	noLoop();
	let points = [];

	let count = getRandomArbitrary(1, 1000);

	for (let i = 0; i < count; i++) {
		let minSize = getRandomArbitrary(1, 25);
		let maxSize = getRandomArbitrary(100, 500);
		let distance = getRandomArbitraryFixed(0.5, 0.75);

		let x = getRandom(width);
		let y = getRandom(height);
		let s = getRandomArbitrary(minSize, maxSize); // size

		let add = true;
		for (let j = 0; j < points.length; j++) {
			let p = points[j];

			if (dist(x, y, p.x, p.y) < (s + p.z) * distance) {
				add = false;
				break;
			}
		}
		if (add) {
			points.push(createVector(x, y, s));
		}
	}

	for (let i = 0; i < points.length; i++) {
		let p = points[i];
		fill(getRandomColor(colors));
		if (p.z > 60) {
			let num = int(getRandomArbitrary(4, 12));
			noStroke();
			shuffleColors();
			for (let i = 0; i < num; i++) {
				let dd = map(i, 0, num, p.z, 0);
				fill(colors[i % 5]);
				circle(p.x, p.y, dd);
			}
		} else {
			circle(p.x, p.y, p.z);
		}
	}
}
