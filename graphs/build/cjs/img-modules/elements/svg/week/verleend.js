"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeekVerleendV1 = void 0;
const d3_services_1 = require("@local/d3-services");
class WeekVerleendV1 {
    constructor(ctrlr) {
        this.ctrlr = ctrlr;
        this.ctrlr.svg.amount = {};
        this.local = this.ctrlr.svg.amount;
    }
    draw(data) {
        this.local.wrapper = this.ctrlr.svg.textWrapper
            .append("g")
            .data(data)
            .join("g")
            .attr("class", "amount_wrapper");
        let yOffset = 0;
        this.local.descriptor = this.local.wrapper
            .append("text")
            .attr("class", "descriptor")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", yOffset)
            .text((d) => d.label + ":");
        yOffset = yOffset + 36;
        this.local.total = this.local.wrapper
            .append("text")
            .attr("class", "total")
            .attr("text-anchor", "end")
            .attr("y", yOffset)
            .style("font-family", "Replica")
            .style("font-size", "2rem")
            .text((d) => (0, d3_services_1.convertToCurrency)(d.value));
        yOffset = yOffset + 28;
        this.local.delta = this.local.wrapper
            .append("text")
            .attr("class", "delta")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", yOffset)
            .text((d) => "+ " + (0, d3_services_1.convertToCurrency)(d.delta));
    }
    redraw(data) {
        this.local.wrapper
            .attr("transform", (d, i) => {
            // minus radius
            const x = 0; // -this.ctrlr.scales.r.scale(d.value);
            // plus radius
            const y = 80;
            return "translate(" + x + "," + y + ")";
        });
        // this.textWrapper
        //     .attr("transform", (d,i) => {
        //         // plus radius - somthng
        //         const x = this.ctrlr.scales.r.scale(d.value) + 80;
        //         const y = 0 // + radius? 
        //         return "translate(" + x + "," + y + ")"
        //     })
    }
}
exports.WeekVerleendV1 = WeekVerleendV1;
