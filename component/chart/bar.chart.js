import {AxisBaseChart} from './axis.base.chart';

export class BarChart extends AxisBaseChart {
    constructor() {
        super();
    }

    /* createdCallback() {
    }

    attachedCallback() {
        this.configChart();
        this.innerHTML = this.createChart();
    }
    
    configChart(){
        this.chartConfig = {};
        this.axisConfig = {};
        this.structureValues = {};
        
        this.chartConfig.chartType = this.dataset['type'];
        this.data = JSON.parse(this.dataset['data']);
        
        this.chartConfig.chartType = this.chartConfig.chartType || 'row';

        this.axisConfig.scaleAxisMarginRatioA = 0.15;
        this.axisConfig.scaleAxisMarginRatioB = 0.25;
        this.axisConfig.labelAxisMarginRatioA = 0.35;
        this.axisConfig.labelAxisMarginRatioB = 0.25;
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
    
    calculateStructureValue(){
        let parent = this.parentElement;

        if (this.chartConfig.chartType === 'row') {
            this.structureValues.totalScaleLength = parent.clientWidth;
            this.structureValues.totalLabelLength = parent.clientHeight;
            this.structureValues.axisP_A = 'x';
            this.structureValues.axisP_B = 'y';
            this.structureValues.scaleName = 'width';
            this.structureValues.labelName = 'height';
        } else if (this.chartConfig.chartType === 'bar') {
            this.structureValues.totalScaleLength = parent.clientHeight;
            this.structureValues.totalLabelLength = parent.clientWidth;
            this.structureValues.axisP_A = 'y';
            this.structureValues.axisP_B = 'x';
            this.structureValues.scaleName = 'height';
            this.structureValues.labelName = 'width';
        }
        
        this.structureValues.valueSpan = this.structureValues.totalScaleLength * (1 - this.axisConfig.scaleAxisMarginRatioA - this.axisConfig.scaleAxisMarginRatioB);
        this.structureValues.labelLength = this.structureValues.totalLabelLength * (1 - this.axisConfig.labelAxisMarginRatioA - this.axisConfig.labelAxisMarginRatioB) / this.data.length;
        this.structureValues.maxMinObject = this.getSpanUnitBase();
        this.structureValues.valueSpanUnitBase = this.structureValues.maxMinObject.max - this.structureValues.maxMinObject.min;
        
        if (this.chartConfig.chartType === 'row') {
            this.structureValues.labelAxisStart = this.structureValues.totalScaleLength * this.axisConfig.scaleAxisMarginRatioA;
            this.structureValues.scaleAxisStart = this.structureValues.totalLabelLength * (1 - this.axisConfig.labelAxisMarginRatioB);
        } else if (this.chartConfig.chartType === 'bar') {
            this.structureValues.labelAxisStart = this.structureValues.totalScaleLength * (1 - this.axisConfig.scaleAxisMarginRatioB);
            this.structureValues.scaleAxisStart = this.structureValues.totalLabelLength * this.axisConfig.labelAxisMarginRatioA;
        }
        if (this.structureValues.maxMinObject.min < 0) {
            if (this.chartConfig.chartType === 'row') {
                this.structureValues.labelAxisStart = this.structureValues.labelAxisStart - this.structureValues.valueSpan * this.structureValues.maxMinObject.min / this.structureValues.valueSpanUnitBase;
            } else if (this.chartConfig.chartType === 'bar') {
                this.structureValues.labelAxisStart = this.structureValues.labelAxisStart + this.structureValues.valueSpan * this.structureValues.maxMinObject.min / this.structureValues.valueSpanUnitBase;
            }
        }
    }
    
    createAxis(){
        let labelAxis = `
        <line 
        ${this.structureValues.axisP_A}1="${this.structureValues.labelAxisStart}" 
        ${this.structureValues.axisP_B}1="${this.structureValues.totalLabelLength * this.axisConfig.labelAxisMarginRatioA}" 
        ${this.structureValues.axisP_A}2="${this.structureValues.labelAxisStart}" 
        ${this.structureValues.axisP_B}2="${this.structureValues.totalLabelLength * (1 - this.axisConfig.labelAxisMarginRatioB)}" 
        style="stroke:black;stroke-width:1" />
        `;
        
        let scaleAxis = `
        <line 
        ${this.structureValues.axisP_A}1="${this.structureValues.totalScaleLength * this.axisConfig.scaleAxisMarginRatioA}" 
        ${this.structureValues.axisP_B}1="${this.structureValues.scaleAxisStart}" 
        ${this.structureValues.axisP_A}2="${this.structureValues.totalScaleLength * (1 - this.axisConfig.scaleAxisMarginRatioB)}" 
        ${this.structureValues.axisP_B}2="${this.structureValues.scaleAxisStart}" 
        style="stroke:black;stroke-width:1" />
        `;

        return {
            labelAxis: labelAxis,
            scaleAxis: scaleAxis
        };
    }*/
    
    createChartItems(){
        let items = [];

        for (let i = 0; i < this.data.length; i++) {
            let start = this.structureValues.labelAxisStart;
            let itemValue = Math.abs(this.structureValues.valueSpan * this.data[i] / this.structureValues.valueSpanUnitBase);

            if (this.chartConfig.chartType === 'row') {
                if (this.data[i] < 0) {
                    start = start - itemValue;
                }
            } else if (this.chartConfig.chartType === 'bar') {
                if (this.data[i] > 0) {
                    start = start - itemValue;
                }
            }

            let item = `
            <rect 
            ${this.structureValues.axisP_A}="${start}" 
            ${this.structureValues.axisP_B}="${this.structureValues.totalLabelLength * this.axisConfig.labelAxisMarginRatioA + this.structureValues.labelLength * 0.2 + this.structureValues.labelLength * i}" 
            ${this.structureValues.scaleName}="${itemValue}" 
            ${this.structureValues.labelName}="${this.structureValues.labelLength * 0.6}" 
            style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />
            `;
            
            items[i] = item;
        }
        
        return items;
    }
    
    /*
    createChart(){
        this.calculateStructureValue();
        let axises = this.createAxis();
        let items = this.createChartItems();
        let chart = `
        <svg 
        ${this.structureValues.labelName}="${this.structureValues.totalLabelLength}" 
        ${this.structureValues.scaleName}="${this.structureValues.totalScaleLength}">
        ${items}
        ${axises.labelAxis}
        ${axises.scaleAxis}
        </svg>
        `;
        
        return chart;
    }*/
}