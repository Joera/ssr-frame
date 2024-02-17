




const mountain = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 333.33 416.66249999999997" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><defs></defs>
<g><path fill="#fff" d="M45.46 215.06c-2.17,3.61 -6.85,4.8 -10.47,2.63 -3.61,-2.16 -4.8,-6.85 -2.63,-10.46l77.25 -128.82c2.19,-3.66 5.14,-6.54 8.63,-8.51 3.53,-2 7.52,-3.06 11.75,-3.06 4.23,0 8.22,1.06 11.75,3.06 3.49,1.98 6.44,4.85 8.63,8.51l41.91 69.89c0.8,1.34 1.85,2.38 3.07,3.07 1.18,0.67 2.61,1.02 4.21,1.02 1.6,0 3.03,-0.35 4.21,-1.02 1.22,-0.69 2.27,-1.73 3.07,-3.07l9 -15.02c2.19,-3.65 5.14,-6.54 8.63,-8.51 3.53,-2 7.52,-3.06 11.75,-3.06 4.23,0 8.22,1.06 11.74,3.06 3.49,1.98 6.44,4.86 8.64,8.51l44.34 73.95c2.17,3.61 0.98,8.3 -2.63,10.46 -3.62,2.17 -8.3,0.98 -10.47,-2.63l-44.34 -73.94c-0.8,-1.34 -1.85,-2.38 -3.07,-3.07 -1.18,-0.67 -2.61,-1.03 -4.21,-1.03 -1.6,0 -3.03,0.36 -4.21,1.03 -1.22,0.69 -2.27,1.73 -3.07,3.07l-9 15.01c-2.19,3.65 -5.15,6.54 -8.64,8.51 -3.53,2 -7.52,3.06 -11.74,3.06 -4.23,0 -8.22,-1.07 -11.75,-3.06 -3.49,-1.98 -6.44,-4.86 -8.63,-8.51l-41.91 -69.89c-0.8,-1.34 -1.85,-2.38 -3.07,-3.07 -1.18,-0.67 -2.61,-1.02 -4.21,-1.02 -1.6,0 -3.03,0.35 -4.21,1.02 -1.22,0.69 -2.27,1.73 -3.07,3.07l-77.25 128.82zm-34.48 51.43c-4.23,0 -7.66,-3.43 -7.66,-7.65 0,-4.23 3.43,-7.66 7.66,-7.66l311.35 0c4.23,0 7.66,3.43 7.66,7.66 0,4.23 -3.43,7.65 -7.66,7.65l-311.35 0z"/>
</g></svg>
`;


export class ElevationIcon {

    element;
    icon;
    number;

    constructor(
        private parent,
        private window,
        private groupSlug?
    ){}


    center(e: HTMLElement) {

        e.style.display = 'flex';
        e.style.flexDirection = "column";
        e.style.justifyContent = "center";
        e.style.alignItems = "center";

        return e;
    }

    font(h: HTMLElement) {

        h.style.fontSize = '9.6rem';
        h.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
        h.style.fontStyle = "normal";
        h.style.fontWeight = "700";

        return h;
    }

    draw(activity) {

        this.element = this.window.document.createElement('div');
        this.element.classList.add('elevation_icon');
        this.element.style.position = 'relative';
        this.element.style.gridColumn = '9 / span 3';
        this.element.style.gridRow = '4 / span 4';
        this.element.innerHTML = mountain;
        this.parent.appendChild(this.element);

        this.number = this.window.document.createElement('div');
        this.number.style.position = 'relative';
        this.number.style.gridColumn = '9 / span 3';
        this.number.style.gridRow = '6 / span 1';
        this.number = this.font(this.number);
        this.number = this.center(this.number);
        this.number.style.marginTop = '3rem';
        this.number.style.color = "#fff";
        this.number.innerHTML = activity.elevation_gain + 'm';
        this.parent.appendChild(this.number);

       
        return true;
    }

    redraw() {
    }

}
