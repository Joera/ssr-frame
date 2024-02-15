"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CirclePlusV1 = void 0;
const d3_services_1 = require("@local/d3-services");
const _colours_1 = __importDefault(require("@local/styleguide/_colours"));
class CirclePlusV1 {
    constructor(ctrlr, slug) {
        this.ctrlr = ctrlr;
        this.slug = slug;
        this.ctrlr.svg[this.slug] = {};
        this.local = this.ctrlr.svg[this.slug];
    }
    draw(data) {
        this.local.wrapper = this.ctrlr.svg.layers.data.selectAll('wrapper')
            .data(data)
            .join("g")
            .attr("class", "wrapper");
        this.local.circle = this.local.wrapper
            .append("circle")
            .style("fill", (d) => _colours_1.default[d.colour][1]);
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
            .text((d) => (0, d3_services_1.thousands)(d.value));
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
exports.CirclePlusV1 = CirclePlusV1;
