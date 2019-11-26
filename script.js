const colors = [`#76c4ae`, `#9fc2ba`, `#bee9e4`, `#7ce0f9`, `#caeccf`,
                `#d3d2b5`, `#cabd80`, `#e1ceb1`, `#ddb0a0`, `#d86c70`]
function randomColor(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// SVG showing & sizing /////////////////

var vw = window.innerWidth / 100;
var vh = window.innerHeight / 100;

let lineId = 000;
function padId(id) {
    id++;
    if (id.toString().length < 3) {
        return id.toString().padStart(3, '0');
    } else {
        return id.toString();
    }
}

// function makePoint(minX, width, minY, height) {
//     let y = minY + Math.floor(Math.random() * height -5);
//     let x = minX + Math.floor(Math.random() * width -5);
//     return `${x},${y} `
// }
// Der anfang ist die ende und der ende ist der anfang.
// function makePointLoop(num, minX, width, minY, height) {
//     let anfangEnde = makePoint(minX, width, minY, height);
//     let points = '';
//     for (let i = 0; i <= num; i++) {
//         points += makePoint(minX, width, minY, height);
//     }
//     return anfangEnde + points + anfangEnde;
// }
// get card bounding box
// let box = document.getElementById('box-city').getBoundingClientRect();
// let points = makePointLoop(45, box.x, box.width, box.y, box.height);
// let polyline = document.createElementNS('http://www.w3.org/2000/svg',
//                                         'polyline');
// polyline.setAttribute('id', padId(lineId));
// polyline.setAttribute('points', points);
// document.querySelector('svg').appendChild(polyline);

class Polyline {
    constructor(num, boundingBox, id) {
        this.num = num;
        this.box = document.getElementById(boundingBox).getBoundingClientRect();
        this.id = id;
    }
    makePoint(minX, width, minY, height) {
        let y = minY + Math.floor(Math.random() * height -5);
        let x = minX + Math.floor(Math.random() * width -5);
        return `${x},${y} `
    }
    makePointLoop(num, minX, width, minY, height) {
        let anfangEnde = this.makePoint(minX, width, minY, height);
        let points = '';
        for (let i = 0; i <= num; i++) {
            points += this.makePoint(minX, width, minY, height);
        }
        return anfangEnde + points + anfangEnde;
    }
    makePolyline() {
        let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        let { num, box, id } = this;
        poly.setAttribute('id', id);
        poly.setAttribute('points', this.makePointLoop(num,  box.x, box.width, box.y, box.height));
        document.querySelector('svg').appendChild(poly);
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