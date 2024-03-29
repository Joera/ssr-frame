import * as d3 from 'd3';
import { colours } from "@local/styleguide";
let ChartObjects = function ChartObjects() {
    let config = function config() {
        return {
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        };
    };
    let dimensions = function dimensions() {
        return {
            svgWidth: 0,
            width: 0,
            svgHeight: 0,
            height: 0, // svgHeight minus config.padding
        };
    };
    let svg = function svg() {
        const bodyEl = null;
        let tooltip = null;
        if (typeof document !== 'undefined') {
            let t = document.createElement('span');
            t.classList.add('tooltip');
            t.style.display = 'block';
            t.style.opacity = '0';
            t.style.position = 'absolute';
            t.style.width = 'auto';
            t.style.height = 'auto';
            t.style.maxWidth = '220px';
            t.style.padding = '.5rem';
            t.style.background = 'white';
            t.style.border = '1px solid ' + colours.gray[0];
            t.style.fontFamily = 'NotoSans Regular';
            t.style.color = 'black';
            t.style.pointerEvents = 'none';
            t.style.fontSize = '.85rem';
            tooltip = (document.querySelector('.tooltip')) ? d3.select(".tooltip") : document.querySelector('body').appendChild(t);
        }
        return {
            body: null,
            layers: {},
            tooltip,
            yAxis: null,
            xAxis: null
        };
    };
    return {
        config: config,
        dimensions: dimensions,
        svg: svg,
    };
};
export default ChartObjects;
