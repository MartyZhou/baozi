export class BarVChart extends HTMLElement {
    constructor() {
        super();
    }

    createdCallback() {
    }

    attachedCallback() {
        let leftMarginRatio = 0.2;
        let rightMarginRatio = 0.1;
        let topMarginRatio = 0.2;
        let bottomMarginRatio = 0.1;
        this.data = JSON.parse(this.dataset['data']);
        let parent = this.parentElement;
        let width = parent.clientWidth;
        let height = parent.clientHeight;

        
        let valueSpan = height * (1 - topMarginRatio - bottomMarginRatio);
        let barWidth = width * (1 - leftMarginRatio - rightMarginRatio) / this.data.length;
        let maxMinObject = this.getSpanUnitBase();
        let valueSpanUnitBase = maxMinObject.max - maxMinObject.min;

        let axisXStartY = height * (1 - bottomMarginRatio);
        if(maxMinObject.min < 0){
            axisXStartY = axisXStartY + valueSpan * maxMinObject.min / valueSpanUnitBase;
        }

        let axisX = `<line x1="${width * leftMarginRatio}" y1="${axisXStartY}" x2="${width * (1 - rightMarginRatio)}" y2="${axisXStartY}" style="stroke:black;stroke-width:1" />`;
        let axisY = `<line x1="${width * leftMarginRatio}" y1="${height * topMarginRatio}" x2="${width * leftMarginRatio}" y2="${height * (1 - bottomMarginRatio)}" style="stroke:black;stroke-width:1" />`;

        let bars = [];

        for (let i = 0; i < this.data.length; i++) {
            let barValue = Math.abs(valueSpan * this.data[i] / valueSpanUnitBase);
            let startY = axisXStartY;
            if (this.data[i] > 0) {
                startY = startY - barValue;
            }

            let bar = `<rect x="${width * leftMarginRatio + barWidth * 0.2 + barWidth * i}" y="${startY}" width="${barWidth * 0.6}" height="${barValue}" style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />`;
            bars[i] = bar;
        }

        this.innerHTML = `
        <svg height="${height}" width="${width}">
        ${bars}
        ${axisX}
        ${axisY}
        </svg>
        `;
    }

    getSpanUnitBase() {
        let min = 0;
        let max = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] < min) {
                min = this.data[i];
            }

            if (this.data[i] > max) {
                max = this.data[i];
            }
        }

        return {max: max, min: min};
    }
}