import Polyline from './polyline.js';

const gray = `#efefef`;
const colors = [`#76c4ae`, `#9fc2ba`, `#bee9e4`, `#7ce0f9`, `#caeccf`,
                `#d3d2b5`, `#cabd80`, `#e1ceb1`, `#ddb0a0`, `#d86c70`]
function randomColor(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// Then we set the value in the --vw custom property to the root of the document
document.documentElement.style.setProperty('--vw', `${vw}px`);

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

// const joeMatune = new Polyline(45, 'box-city', padId(lineId), randomColor(colors));
const joeMatuneLine = new Polyline(45, 'joe-matune-card', `joe-matune-line`, randomColor(colors));
joeMatuneLine.makePolyline();
const learningGitLine = new Polyline(45, 'learning-git-card', `learning-git-line`, randomColor(colors));
learningGitLine.makePolyline();


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

const cards = document.querySelectorAll('.card');

// GSAP work ////////////////////////////
const animate = () => {
    gsap.set('polyline', {drawSVG: '0% 5%'})
    let tl = gsap.timeline({repeat: -1});
        tl.to('polyline', { duration: 10, ease: 'none', drawSVG: '95% 100%'});    
}
animate();
// addEventListeners ///////////////////
document.addEventListener('click', e => {
    if (e.target.id === `joe-matune-card`) {
        gsap.to('#joe-matune-line', {duration:0.3, stroke: randomColor(colors)});
    } else if (e.target.id === `learning-git-card`) {
        gsap.to('#learning-git-line', {duration:0.3, stroke: randomColor(colors)});
    }
})
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseover', e => {
        if (e.target.id === `joe-matune-card`) {
            gsap.to('#joe-matune-line', {duration: 0.3, stroke: randomColor(colors)});
            // gsap.to('#joe-matune-header', {duration: 0.3, color: `#121230`});
        } else if (e.target.id === `learning-git-card`) {
            gsap.to('#learning-git-line', {duration: 0.3, stroke: randomColor(colors)});
        }
    })
    cards[i].addEventListener('mouseout', e => {
        gsap.to('polyline', {duration: 0.3, stroke: gray});
        gsap.to('.card', {borderColor: gray,
                          color: gray});
        // gsap.to('h1', {duration: 0.1, color: gray});
    })
    // On mousemove evenets /////////////
    cards[i].addEventListener('mousemove', e => {
        let rando = randomColor(colors);
        gsap.to(`#${e.target.id}`, {borderColor: rando});
        gsap.to(`#${e.target.id}`, {color: rando});
        // gsap.to(`#${e.target.id}`, {duration: 0.1, boxShadow: `0.5rem 0.5rem 0px 0px ${rando}`});

    })
}