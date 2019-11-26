export default class Polyline {
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
        // Der anfang ist die ende und der ende ist der anfang.
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