"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPieWeek = void 0;
const d3_services_1 = require("@local/d3-services");
const _colours_1 = __importDefault(require("@local/styleguide/_colours"));
const d3 = __importStar(require("d3"));
class ChartPieWeek {
    constructor(ctrlr) {
        this.ctrlr = ctrlr;
    }
    draw(data) {
        const config = this.ctrlr.config ? this.ctrlr.config : this.ctrlr.graphObject.config;
        let self = this;
        let pie = d3.pie()
            .sort(null)
            .value((d) => d['value']);
        this.ctrlr.svg.pie_wrapper = this.ctrlr.svg.layers.data
            .append('g')
            .attr('class', 'pie_wrapper');
        this.ctrlr.svg.arcs = this.ctrlr.svg.pie_wrapper.selectAll(".arc")
            .data(pie(data), (d => d.data.label))
            .join("path")
            .attr("class", "arc")
            .attr("fill", (d) => _colours_1.default[d.data.colour][1])
            .attr("stroke", (d) => _colours_1.default[d.data.colour][0])
            .attr("stroke-width", "1px");
        this.ctrlr.svg.textWrapper = this.ctrlr.svg.pie_wrapper.selectAll("g.text-wrapper")
            .data(data)
            .join("g")
            .attr("class", (d) => "text-wrapper " + (0, d3_services_1.slugify)(d.label));
        this.ctrlr.svg.total = this.ctrlr.svg.textWrapper
            .append("text")
            .attr("class", "total")
            .attr("text-anchor", "end")
            .attr("y", -24)
            .style("font-family", "Replica")
            .style("font-size", "2rem")
            .text((d) => (0, d3_services_1.thousands)(d.value));
        this.ctrlr.svg.descriptor = this.ctrlr.svg.textWrapper
            .append("text")
            .attr("class", "descriptor")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 0)
            .text((d) => d.units);
        this.ctrlr.svg.delta = this.ctrlr.svg.textWrapper
            .append("text")
            .attr("class", "delta")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 24)
            .text((d) => d.delta > 0 ? "+ " + d.delta : d.delta);
    }
    redraw(data) {
        let radius, arc, labelArc;
        const sum = data.map(d => d.value).reduce((s, v) => s + v, 0);
        radius = this.ctrlr.scales.r.scale(sum);
        this.ctrlr.svg.arcs
            .attr("d", d3.arc()
            .outerRadius(radius)
            .innerRadius(0)
            .padAngle(0))
            .filter((d, i) => i == 1)
            .attr("transform", (d) => {
            const x = -6;
            const y = -5;
            return "translate(" + x + "," + y + ")";
        });
    }
}
exports.ChartPieWeek = ChartPieWeek;
