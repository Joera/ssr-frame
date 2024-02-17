import { Bars } from '../../../graphs/src/graph-modules/types_graphs';
import { parseDuration } from '../services/formatting';

interface ChartElement {

    draw: (data: Bars) => void,
    redraw: (data: Bars) => void
}

export class ChartBarsBandRounded implements ChartElement {

    bars;
    barDates;
    barValues;

    constructor(
        public ctrlr,
    ){}

    draw(data: Bars) {

        this.bars = this.ctrlr.svg.layers.data.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class","bar")
            .attr("fill", (d,i) => d.selected ? "#f4c6e2" : "white")
            .attr("stroke", (d,i) => "white") 
        ;

        this.barDates = this.ctrlr.svg.layers.data.selectAll(".barLabel")
            .data(data)
            .join('text')
            .attr('class','barLabel')
            .style("text-anchor", "middle")
            .style("fill","#472A91")
            .style("font-size","4.2rem")
            .style("font-family","'Inkwell Condensed A', 'Inkwell Condensed B'")
            .style("font-weight","700")
            ;

        this.barValues = this.ctrlr.svg.layers.data.selectAll(".barValues")
            .data(data)
            .join('text')
            .attr('class','barValues')
            .style("text-anchor", "middle")
            .style("fill","#fff")
            .style("font-size","4.2rem")
            .style("font-family","'Inkwell Condensed A', 'Inkwell Condensed B'")
            .style("font-weight","700")
            ;
    }

    redraw(data: Bars) {

        let self = this;

        this.bars
            .attr("y", (d,i) => this.ctrlr.dimensions.height - self.ctrlr.scales.y.fn(d.yValue))
            .attr("height", (d) =>  self.ctrlr.scales.y.fn(d.yValue)) 
            .attr("x", (d)  => self.ctrlr.scales.x.fn(d.xValue))
            .attr("width", (d,i) => self.ctrlr.scales.x.scale.bandwidth())
        ;

        this.barDates
            .html( (d,i) => {

                console.log(new Date(d.xValue));

                const day = new Date(d.xValue).getDate();
                const month = (new Date(d.xValue).getMonth() + 1).toString();

                    return day + "/" + month

            })
            .attr('transform', (d,i) => {

                const x = self.ctrlr.scales.x.fn(d.xValue) + (self.ctrlr.scales.x.scale.bandwidth() / 2)
                const y = this.ctrlr.dimensions.height - 30;
                return 'translate(' + x + ',' + y + ')';
            })

        this.barValues
            .html( (d,i) => {

                    return parseDuration(d.yValue)

            })
            .attr('transform', (d,i) => {

                const x = self.ctrlr.scales.x.fn(d.xValue) + (self.ctrlr.scales.x.scale.bandwidth() / 2)
                const y = self.ctrlr.dimensions.height - self.ctrlr.scales.y.fn(d.yValue) - 30;
                return 'translate(' + x + ',' + y + ')';
            })

    }
}
