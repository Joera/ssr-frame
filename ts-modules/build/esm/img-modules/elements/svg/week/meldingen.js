import { thousands } from "@local/d3-services";
import colours from "@local/styleguide/_colours";
export class WeekMeldingenV1 {
    constructor(ctrlr) {
        this.ctrlr = ctrlr;
        this.ctrlr.svg.meldingen = {};
        this.local = this.ctrlr.svg.meldingen;
    }
    draw(data) {
        this.local.wrapper = this.ctrlr.svg.layers.data.selectAll('wrapper')
            .data(data)
            .join("g")
            .attr("class", "wrapper");
        this.local.circle = this.local.wrapper
            .append("circle")
            .style("fill", (d) => colours[d.colour][1]);
        this.local.textWrapper = this.local.wrapper
            .append("g")
            .attr("class", "text-wrapper");
        this.local.total = this.local.textWrapper
            .append("text")
            .attr("class", "total")
            .attr("text-anchor", "end")
            .attr("y", -24)
            .style("font-family", "Replica")
            .style("font-size", "2rem")
            .text((d) => thousands(d.value));
        this.local.descriptor = this.local.textWrapper
            .append("text")
            .attr("class", "descriptor")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 0)
            .text((d) => d.units);
        this.local.delta = this.local.textWrapper
            .append("text")
            .attr("class", "delta")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 24)
            .text((d) => d.delta > 0 ? "+ " + d.delta : d.delta);
    }
    redraw(data) {
        this.local.circle
            .attr("r", (d, i) => {
            return this.ctrlr.scales.r.scale(d.value);
        });
    }
}
