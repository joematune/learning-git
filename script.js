import Polyline from './polyline.js';

const colors = [`#76c4ae`, `#9fc2ba`, `#bee9e4`, `#7ce0f9`, `#caeccf`,
                `#d3d2b5`, `#cabd80`, `#e1ceb1`, `#ddb0a0`, `#d86c70`]
function randomColor(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;

// parseInt() included due to 'use strict;' mode disallowing octals
let lineId = parseInt('000', 10);
function padId(id) {
    id++;
    if (id.toString().length < 3) {
        return id.toString().padStart(3, '0');
    } else {
        return id.toString();
    }
}

const learningGitCard = new Polyline(45, 'box-city', padId(lineId));
learningGitCard.makePolyline();

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
setSVGSize('polylines');

const main = document.querySelector('main'); 

// GSAP work ////////////////////////////
gsap.set('polyline', {drawSVG: '0% 5%'})
let tl = gsap.timeline({repeat: -1});
    tl.to('polyline', { duration: 10, ease: 'none', drawSVG: '95% 100%'});

// addEventListeners ///////////////////
document.addEventListener('click', e => {
    if (e.target.classList['value'].includes('learning')) {
        document.querySelectorAll('polyline').forEach(el => {
            el.style.stroke = randomColor(colors);
        });
        learningGitCard.makePolyline();
    }
})
main.addEventListener('mouseover', e => {
    gsap.to(main, {duration:0.3, scale: 1.05});
})
main.addEventListener('mouseout', e => {
    gsap.to(main, {duration:0.3, scale: 1});
    gsap.to('polyline', {duration:0.3, stroke: `#efefef`});
    gsap.to(document.body, {borderColor: `#efefef`});
})
main.addEventListener('mousemove', e => {
    let tl = gsap.timeline();
    tl.to(document.body, {borderColor: randomColor(colors)});
})