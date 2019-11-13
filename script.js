console.log('happy');

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;

let line = document.querySelector('line');
line.setAttribute('x1',10*vw);
line.setAttribute('x2',10*vw);
line.setAttribute('y1',10*vh);
line.setAttribute('y2',90*vh);

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
setSVGSize('line');

// GSAP work ////////////////////////////

let tl = gsap.timeline();
    tl.to(line, { duration: 1, x: 90 })
      .to(line, { duration: 3, y: 50 })
      .to(line, { duration: 1, drawSVG: 0 })