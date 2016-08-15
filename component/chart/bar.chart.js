export class BarChart extends HTMLElement {
    constructor() {
        super();
    }

    createdCallback() {
    }

    attachedCallback() {
        let chartType = this.dataset['type'];
        chartType = chartType || 'row';

        let scaleAxisMarginRatioA = 0.1;
        let scaleAxisMarginRatioB = 0.2;
        let labelAxisMarginRatioA = 0.1;
        let labelAxisMarginRatioB = 0.2;

        this.data = JSON.parse(this.dataset['data']);
        let parent = this.parentElement;

        let totalScaleLength;
        let totalLabelLength;

        let axisP_A;
        let axisP_B;
        let scaleName;
        let labelName;

        if (chartType === 'row') {
            totalScaleLength = parent.clientWidth;
            totalLabelLength = parent.clientHeight;
            axisP_A = 'x';
            axisP_B = 'y';
            scaleName = 'width';
            labelName = 'height';

        } else if (chartType === 'bar') {
            totalScaleLength = parent.clientHeight;
            totalLabelLength = parent.clientWidth;
            axisP_A = 'y';
            axisP_B = 'x';
            scaleName = 'height';
            labelName = 'width';
        }

        let valueSpan = totalScaleLength * (1 - scaleAxisMarginRatioA - scaleAxisMarginRatioB);
        let labelLength = totalLabelLength * (1 - labelAxisMarginRatioA - labelAxisMarginRatioB) / this.data.length;
        let maxMinObject = this.getSpanUnitBase();
        let valueSpanUnitBase = maxMinObject.max - maxMinObject.min;

        let labelAxisStart;
        let scaleAxisStart;
        if (chartType === 'row') {
            labelAxisStart = totalScaleLength * scaleAxisMarginRatioA;
            scaleAxisStart = totalLabelLength * (1 - labelAxisMarginRatioB);
        } else if (chartType === 'bar') {
            labelAxisStart = totalScaleLength * (1 - scaleAxisMarginRatioB);
            scaleAxisStart = totalLabelLength * scaleAxisMarginRatioA
        }
        if (maxMinObject.min < 0) {
            if (chartType === 'row') {
                labelAxisStart = labelAxisStart - valueSpan * maxMinObject.min / valueSpanUnitBase;
            } else if (chartType === 'bar') {
                labelAxisStart = labelAxisStart + valueSpan * maxMinObject.min / valueSpanUnitBase;
            }
        }

        let labelAxis = `<line ${axisP_A}1="${labelAxisStart}" ${axisP_B}1="${totalLabelLength * labelAxisMarginRatioA}" ${axisP_A}2="${labelAxisStart}" ${axisP_B}2="${totalLabelLength * (1 - labelAxisMarginRatioB)}" style="stroke:black;stroke-width:1" />`;
        let scaleAxis = `<line ${axisP_A}1="${totalScaleLength * scaleAxisMarginRatioA}" ${axisP_B}1="${scaleAxisStart}" ${axisP_A}2="${totalScaleLength * (1 - scaleAxisMarginRatioB)}" ${axisP_B}2="${scaleAxisStart}" style="stroke:black;stroke-width:1" />`;

        let bars = [];

        for (let i = 0; i < this.data.length; i++) {
            let start = labelAxisStart;
            let barValue = Math.abs(valueSpan * this.data[i] / valueSpanUnitBase);

            if (chartType === 'row') {
                if (this.data[i] < 0) {
                    start = start - barValue;
                }
            } else if (chartType === 'bar') {
                if (this.data[i] > 0) {
                    start = start - barValue;
                }
            }

            let bar = `<rect ${axisP_A}="${start}" ${axisP_B}="${totalLabelLength * labelAxisMarginRatioA + labelLength * 0.2 + labelLength * i}" ${scaleName}="${barValue}" ${labelName}="${labelLength * 0.6}" style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />`;
            bars[i] = bar;
        }

        this.innerHTML = `
        <svg ${labelName}="${totalLabelLength}" ${scaleName}="${totalScaleLength}">
        ${bars}
        ${labelAxis}
        ${scaleAxis}
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

        return { max: max, min: min };
    }
}