import { Bars } from '../../../graphs/src/graph-modules/types_graphs';

interface ChartElement {

    draw: (data: Bars) => void,
    redraw: (data: Bars) => void
}

export class ChartBarsTime implements ChartElement {

    bars;
    barLabels;

    constructor(
        public ctrlr,
    ){}

    draw(data: Bars) {

        this.bars = this.ctrlr.svg.layers.data.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class","bar")
            .attr("fill", (d,i) => "white")
            .attr("stroke", (d,i) => "white")
           
        ;

        this.barLabels = this.ctrlr.svg.layers.data.selectAll(".barLabel")
            .data(data)
            .join('text')
            .attr('class','barLabel')
            .attr('dx', '10px')
            .attr('dy', '16px')
            .style("text-anchor", "start")
            ;
    }

    redraw(data: Bars) {

        let self = this;

        this.bars
            .attr("y", (d,i) => this.ctrlr.dimensions.height - self.ctrlr.scales.y.fn(d.yValue))
            .attr("height", (d) =>  self.ctrlr.scales.y.fn(d.yValue)) 
            .attr("x", (d)  => self.ctrlr.scales.x.fn(new Date(d.xValue)))
            .attr("width", (d,i) =>  60) // self.ctrlr.scales.x.scale.bandwidth())
        ;

        this.barLabels
            .html( (d,i) => {

                    return d.label

            })
            .attr('transform', (d,i) => {

                const x = d.value > 0 ? self.ctrlr.scales.x.fn(d.xValue) : self.ctrlr.scales.x.fn(0)
                const y = self.ctrlr.scales.y.fn(d.yValue);

                return 'translate(' + x + ',' + y + ')';

                
            })
            .attr('fill-opacity', 1)
    }
}
