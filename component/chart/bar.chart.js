export class BarChart extends HTMLElement{
    constructor() {
        super();
        
        this.data = [1, 3, 2, 7, 4];
    }
    
    createdCallback(){
        this.innerHTML = `
        
<svg height="400" width="400">
<rect x="100" y="100" width="200" height="20" style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />
<text x="40" y="115" fill="grey">Fish</text>

<rect x="100" y="130" width="150" height="20" style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />
<text x="40" y="145" fill="grey">Beef</text>

<rect x="100" y="160" width="180" height="20" style="fill:lightgrey;stroke-width:1;stroke:lightgrey" />
<text x="40" y="175" fill="grey">Pork</text>


<line x1="100" y1="190" x2="100" y2="80" style="stroke:black;stroke-width:1" />
<line x1="100" y1="190" x2="390" y2="190" style="stroke:black;stroke-width:1" />

<line x1="150" y1="185" x2="150" y2="190" style="stroke:black;stroke-width:1" />
<text x="140" y="205" fill="grey">50</text>
<line x1="200" y1="185" x2="200" y2="190" style="stroke:black;stroke-width:1" />
<text x="190" y="205" fill="grey">100</text>
<line x1="250" y1="185" x2="250" y2="190" style="stroke:black;stroke-width:1" />
<text x="240" y="205" fill="grey">150</text>
<line x1="300" y1="185" x2="300" y2="190" style="stroke:black;stroke-width:1" />
<text x="290" y="205" fill="grey">200</text>
<line x1="350" y1="185" x2="350" y2="190" style="stroke:black;stroke-width:1" />
<text x="340" y="205" fill="grey">250</text>
</svg>

        `;
    }

    attachedCallback(){
        
    }
}