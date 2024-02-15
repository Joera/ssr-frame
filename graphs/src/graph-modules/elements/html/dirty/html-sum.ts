import { convertToCurrency } from "@local/d3-services";
import { DataPart } from "@local/d3_types";
import { breakpoints, colours } from "@local/styleguide";

export default class HtmlSum {

    rowHeight = 22;
    legend;

    constructor(
        private ctrlr
    ){}

    draw(data: DataPart[][]) {

        let legendEl = this.ctrlr.element.querySelector('.legend');

         if (legendEl) {
             legendEl.parentNode.removeChild(legendEl)
         }

        let legendContainer = document.createElement('div');
        legendContainer.classList.add('legend');
        legendContainer.style.display = 'flex';
        legendContainer.style.flexDirection = "column";
        legendContainer.style.alignItems = "center";

        // if (window.innerWidth < breakpoints.sm) {
           // legendContainer.style.marginTop = '120px';
       // }

        this.ctrlr.element.appendChild(legendContainer);

        // let chartObjects = ChartObjects();
        // let newSVGObject= chartObjects.svg();

        // let dataLength = data.slice.length;

        // if(data[1]) {  dataLength = dataLength + data[1].length }
        // if(data[2]) {  dataLength = dataLength + data[2].length }


        //  let legendDimensions = {

        //      width : this.ctrlr.graphObject.config.extra.legendWidth,
        //      height : this.rowHeight * dataLength,
        //      svgWidth : this.ctrlr.graphObject.config.extra.legendWidth,
        //      svgHeight : this.rowHeight * dataLength,
        //  }

        // this.legend = new ChartSVG(legendContainer,this.ctrlr.graphObject.config,legendDimensions,newSVGObject);

    }

    redraw(data: DataPart[][]) {

        let dataLength = data[0].length;

        if(data[1]) {  dataLength = dataLength + ( data[1].length * 2) }
        if(data[2]) {  dataLength = dataLength + (data[2].length *  2) }

        let legendDimensions = {

            width : this.ctrlr.graphObject.config.extra.legendWidth,
            height : this.rowHeight * dataLength,
            svgWidth : this.ctrlr.graphObject.config.extra.legendWidth,
            svgHeight : this.rowHeight * dataLength,
        }

        this.legend.redraw(legendDimensions);

        this.legend.svg.layers.legend.selectAll('*')
            .remove();
        //
        data[0].forEach( (d,i) => {

            this.legend.svg.layers.legend.append("rect")
                .attr("y", (i * this.rowHeight) - 2)
                .attr("height",12)
                .attr("width",12)
                .attr("fill", colours[d['colour']][0] )
                .style("opacity", 1);

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dy", (i * this.rowHeight) + 8)
                .attr("dx", 16)
                .text(d['label'] + ':')
                .attr("width", this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1);

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dx", this.ctrlr.graphObject.config.extra.legendWidth)
                .attr("dy", (i * this.rowHeight) + 8)
                .text( (this.ctrlr.graphObject.config.extra.currencyLabels) ? convertToCurrency(d['value']) : d['value'])
                .attr("width", this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1)
                .style("text-anchor", "end");

        });
        //
        // // som van totaal
        if(data[1]) {


            this.legend.svg.layers.legend.append("rect")
                .attr("class", "small-label")
                .attr("y", ((data[0].length) * this.rowHeight)  - 3)
                .attr("height", .5)
                .attr("width", this.ctrlr.graphObject.config.extra.legendWidth)
                .style("opacity", 1)
                .style("fill", 'black');

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dy", (data[0].length * this.rowHeight) + 16)
                .text( data[1][0] != undefined ? data[1][0]["label"] + ':' : '')
                .attr("width", this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1);

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dx", this.ctrlr.graphObject.config.extra.legendWidth)
                .attr("dy", ((data[0].length) * this.rowHeight) + 16)
                .text( (this.ctrlr.graphObject.config.extra.currencyLabels) ? convertToCurrency(data[1][0]['value']) : data[1][0]['value'])
                .attr("width", this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1)
                .style("text-anchor", "end");

        }
        //
        if(data[2]) {

            this.legend.svg.layers.legend.append("rect")
                .attr("y", ((data[0].length + 1.5) * this.rowHeight) + 6)
                .attr("height",12)
                .attr("width",12)
                .attr("fill", colours[data[2][0]['colour']][0])
                .style("opacity", 1);

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dy", ((data[0].length + 1.5) * this.rowHeight) + 16)
                .attr("dx", this.rowHeight - 4)
                .text(data[2][0]['label'])
                .attr("width",this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1);

            this.legend.svg.layers.legend.append("text")
                .attr("class", "small-label")
                .attr("dx", this.ctrlr.graphObject.config.extra.legendWidth)
                .attr("dy", ((data[0].length + 1.5) * this.rowHeight) + 16)
                .text( (this.ctrlr.graphObject.config.extra.currencyLabels) ? convertToCurrency(data[2][0]['value']) : data[2][0]['value'])
                .attr("width",this.ctrlr.dimensions.svgWidth)
                .style("opacity", 1)
                .style("text-anchor", "end");
        }
    }
}