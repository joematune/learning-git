console.log('happy');

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;

function makePoints(num, minX, width, minY, height) {
    let points = '';
    for (i = 0; i <= num; i++) {
        let y = minY + Math.floor(Math.random() * height -5);
        let x = minX + Math.floor(Math.random() * width -5);
        points += `${x},${y} `
    }
    return points;
}

// get card bounding box

let box = document.querySelector('main').getBoundingClientRect();

// let points = makePoints(45, 0, 100*vw, 0, 100*vh); fill whole screen
let points = makePoints(45, box.x, box.width, box.y, box.height);
let polyline = document.querySelector('polyline');
polyline.setAttribute('points', points);

function showSVG(el) {
    // Prevents a flash of unstyled SVG
    el.style.display = "inline";
}
function setSVGSize(el) {
	var el = document.getElementById(el);
	el.style.width = window.innerWidth;
    el.style.height = window.innerHeight - 1;
    showSVG(el);
}
setSVGSize('polyline');

// GSAP work ////////////////////////////
gsap.set(polyline, {drawSVG: '0% 5%'})
let tl = gsap.timeline();
    tl.to(polyline, { duration: 10, ease: 'none', drawSVG: '95% 100%'});

document.addEventListener('click', e => {
    console.log(e.target.getBoundingClientRect());
})