"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const elements_1 = require("@local/elements");
const d3_graphs_1 = require("@local/d3_graphs");
const elements_2 = require("@local/elements");
class WeekV1 extends d3_graphs_1.GraphControllerV2 {
    constructor(main, data, element, mapping, segment, size) {
        super(main, data, element, mapping, segment, size);
        this.main = main;
        this.data = data;
        this.element = element;
        this.mapping = mapping;
        this.segment = segment;
        this.size = size;
        this.pre();
    }
    pre() {
        // this._addScale("x","band","horizontal-reverse","time");
        // this._addScale("y","linear","custom","value");
        this._addScale("r", "radius", "radius", "value");
        //  this._addScale("m","log","horizontal","meldingen")
        this._addPadding(0, 0, 0, 0);
        this._addMargin(0, 0, 0, 0);
    }
    init(size) {
        const _super = Object.create(null, {
            _init: { get: () => super._init },
            _svg: { get: () => super._svg }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super._init.call(this);
            const svgId = "svg-wrapper-" + this.mapping.slug;
            const container = this.main.window.document.createElement('section');
            container.style.height = "100%";
            // container.style.background = "";
            container.style.overflow = "hidden";
            container.id = svgId;
            this.element.appendChild(container);
            _super._svg.call(this, container);
            // this.dimensions = this.chartDimensions.fix(size)
            this.config.paddingInner = .2;
            this.config.extra.minRadius = 20;
            this.config.extra.radiusFactor = .5;
            this.config.extra.innerRadius = 20;
            this.config.extra.maxRadius = 100;
            this.config.extra.trendHeight = 60;
            this.meldingen = new elements_1.WeekMeldingenV1(this);
            this.pie = new elements_1.ChartPieWeek(this);
            this.verleend = new elements_2.WeekVerleendV1(this);
            // this.trend = new ChartBarWeekV1(this);
            yield this.update(this.data, this.segment, false);
        });
    }
    prepareData(data) {
        // const history = []; // data; 
        const meldingen = [];
        const pieData = [];
        const verleend = [];
        // this data merging .. has been skipped
        const parameter = "fs_nieuw_dossiers_afgehandeld";
        // for (const week of data) {
        //     history.push({
        //         "time": week["_date"],
        //         "label": week["_week"],
        //         "value": week["nieuw_schademeldingen"],
        //         "colour": "orange"
        //     })
        //     history.push({
        //         "time": week["_date"],
        //         "label": week["_week"],
        //         "value": week[parameter],
        //         "colour": "lightBlue"
        //     })
        // }
        meldingen.push({
            label: "Schademeldingen",
            value: data[0]["fs_schademeldingen"],
            delta: data[0]["fs_schademeldingen_nieuw"],
            units: "schademeldingen",
            colour: "orange"
        });
        pieData.push({
            label: "Afgehandeld",
            value: data[0]["fs_schademeldingen_afgehandeld"],
            delta: data[0]["fs_schademeldingen_afgehandeld_nieuw"],
            units: "afgehandeld",
            colour: "lightBlue"
        });
        pieData.push({
            label: "In behandeling",
            value: data[0]["fs_schademeldingen_in_behandeling"],
            delta: data[0]["fs_schademeldingen_in_behandeling_nieuw"],
            units: "in behandeling",
            colour: "moss"
        });
        verleend.push({
            label: "Totaal verleend",
            value: data[0]["fs_totaal_verleend"],
            delta: data[0]["fs_totaal_verleend_nieuw"],
            format: "in currency",
            colour: "black"
        });
        return {
            meldingen,
            "pie": pieData,
            verleend
        };
    }
    draw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.scales.x.set(data.slice.map(d => d["time"]));
            // this.scales.y.set(data.slice.map(d => d["value"]));
            const values = [0];
            values.push(data.meldingen[0].value);
            for (const slice of data.pie) {
                values.push(slice.value);
            }
            this.scales.r.set(values);
            this.svg.layers.data
                .append("g")
                .attr("class", "title")
                .attr("transform", "translate(20,30)")
                .append("text")
                .text("Fysieke schade")
                .style("font-family", "NotoSans Regular")
                .style("font-size", "1rem")
                .style("line-height", "1.33");
            //  .style("border-bottom","1px solid black")
            this.svg.layers.data
                .append("g")
                .attr("class", "date")
                .attr("text-anchor", "end")
                .attr("transform", "translate(" + (this.dimensions.width - 140) + ",30)")
                .append("text")
                .text("week xx - 2023");
            yield this.meldingen.draw(data.meldingen);
            yield this.pie.draw(data.pie);
            yield this.verleend.draw(data.verleend);
            return;
        });
    }
    redraw(data) {
        const _super = Object.create(null, {
            redraw: { get: () => super.redraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.redraw.call(this, data);
            yield this.meldingen.redraw();
            yield this.pie.redraw(data.pie);
            yield this.verleend.redraw(data.verleend);
            this.svg.pie_wrapper
                .attr("transform", (d) => {
                const x = 2 * this.dimensions.width / 3;
                const y = this.dimensions.height / 2;
                return "translate(" + x + "," + y + ") rotate(-45)";
            });
            return;
        });
    }
    update(data, segment, update) {
        const _super = Object.create(null, {
            _update: { get: () => super._update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super._update.call(this, data, segment, update);
        });
    }
}
exports.default = WeekV1;
