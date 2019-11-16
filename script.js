console.log('happy');

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;

function makePoints(num) {
    let points = '';
    for (i = 0; i <= num; i++) {
        let y = Math.floor(Math.random() * 100*vh);
        let x = Math.floor(Math.random() * 100*vw);
        points += `${x},${y} `
    }
    return points;
}

let points = makePoints(45);
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
gsap.set(polyline, {drawSVG: '0% 2%'})
let tl = gsap.timeline();
    tl.to(polyline, { duration: 12, ease: 'none', drawSVG: '98% 100%'});

document.addEventListener('click', e => {
    console.log(e.target);
})