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
class WeekV2 extends d3_graphs_1.GraphControllerV2 {
    constructor(main, data, element, mapping, segment, size) {
        super(main, data, element, mapping, segment, size);
        this.main = main;
        this.data = data;
        this.element = element;
        this.mapping = mapping;
        this.segment = segment;
        this.size = size;
        this.pre();
        this.els = {};
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
            this.els.meldingen = new elements_1.CirclePlusV1(this, "meldingen");
            this.els.pie = new elements_1.ChartPieWeek(this);
            this.els.ves = new elements_1.CirclePlusV1(this, "ves");
            this.els.maatwerk = new elements_1.CirclePlusV1(this, "maatwerk");
            this.els.nieuw = new elements_1.ArrowV1(this, "nieuw");
            this.els.naarVes = new elements_1.ArrowV1(this, "naar_ves");
            this.els.naarMaatwerk = new elements_1.ArrowV1(this, "naar_maatwerk");
            yield this.update(this.data, this.segment, false);
        });
    }
    prepareData(data) {
        // const history = []; // data; 
        const meldingen = [];
        const inBehandeling = [];
        const verleend = [];
        const ves = [];
        const maatwerk = [];
        // this data merging .. has been skipped
        const parameter = "fs_nieuw_dossiers_afgehandeld";
        meldingen.push({
            label: "Schademeldingen",
            value: data[0]["fs_schademeldingen"],
            delta: data[0]["fs_schademeldingen_nieuw"],
            units: "schademeldingen",
            colour: "orange"
        });
        inBehandeling.push({
            label: "In behandeling",
            value: data[0]["fs_schademeldingen_in_behandeling"] - data[0]["fs_gepauzeerd"],
            delta: data[0]["fs_schademeldingen_in_behandeling_nieuw"] - data[0]["fs_gepauzeerd_nieuw"],
            units: "in behandeling",
            colour: "moss"
        });
        inBehandeling.push({
            label: "Gepauzeerd",
            value: data[0]["fs_gepauzeerd"],
            delta: data[0]["fs_gepauzeerd_nieuw"],
            units: "gepauzeerd",
            colour: "blue"
        });
        verleend.push({
            label: "Totaal verleend",
            value: data[0]["fs_totaal_verleend"],
            delta: data[0]["fs_totaal_verleend_nieuw"],
            format: "in currency",
            colour: "black"
        });
        ves.push({
            label: "Vaste vergoeding",
            value: data[0]["fs_ves_afgehandeld"],
            delta: data[0]["fs_ves_afgehandeld_nieuw"],
            units: "vaste vergoeding",
            colour: "blue"
        });
        maatwerk.push({
            label: "Maatwerk",
            value: data[0]["fs_schademeldingen_afgehandeld"] - data[0]["fs_ves_afgehandeld"],
            delta: data[0]["fs_schademeldingen_afgehandeld_nieuw"] - data[0]["fs_ves_afgehandeld_nieuw"],
            units: "maatwerk",
            colour: "blue"
        });
        return {
            meldingen,
            inBehandeling,
            verleend,
            ves,
            maatwerk
        };
    }
    draw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.scales.x.set(data.slice.map(d => d["time"]));
            // this.scales.y.set(data.slice.map(d => d["value"]));
            const values = [0];
            values.push(data.meldingen[0].value);
            // for (const slice of data.inBehandeling) {
            //     values.push(slice.value);
            // }
            // console.log(values);
            this.scales.r.set(values);
            //  .style("border-bottom","1px solid black")
            // this.svg.layers.data
            //     .append("g")
            //     .attr("class","date")
            //     .attr("text-anchor","end")
            //     .attr("transform","translate(" + (this.dimensions.width - 140) + ",30)")
            //     .append("text")
            //     .text("week xx - 2023")
            yield this.els.meldingen.draw(data.meldingen);
            yield this.els.pie.draw(data.inBehandeling);
            yield this.els.ves.draw(data.ves);
            yield this.els.maatwerk.draw(data.maatwerk);
            yield this.els.nieuw.draw(data.maatwerk);
            yield this.els.naarVes.draw(data.maatwerk);
            yield this.els.naarMaatwerk.draw(data.maatwerk);
            // await this.verleend.draw(data.verleend);
            this.svg.layers.data
                .append("g")
                .attr("class", "title")
                .attr("transform", "translate(20,30)")
                .append("text")
                .text("Fysieke schade")
                .style("font-family", "NotoSans Regular")
                .style("font-size", "1rem")
                .style("line-height", "1.33");
            return;
        });
    }
    redraw(data) {
        const _super = Object.create(null, {
            redraw: { get: () => super.redraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.redraw.call(this, data);
            yield this.els.meldingen.redraw();
            yield this.els.pie.redraw(data.inBehandeling);
            yield this.els.ves.redraw(data.ves);
            yield this.els.maatwerk.redraw(data.maatwerk);
            yield this.els.nieuw.redraw(data.maatwerk);
            this.svg.meldingen.wrapper
                .attr("transform", (d, i) => {
                const x = 0;
                const y = this.dimensions.height / 2;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.meldingen.textWrapper
                .attr("transform", (d, i) => {
                const x = this.scales.r.scale(d.value) + -20;
                const y = 0;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.pie_wrapper
                .attr("transform", (d) => {
                const x = 1 * this.dimensions.width / 2;
                const y = this.dimensions.height / 2;
                return "translate(" + x + "," + y + ") rotate(0)";
            });
            this.svg.textWrapper
                .attr("transform", (d) => {
                const x = 40;
                const y = 100;
                return "translate(" + x + "," + y + ")";
            })
                .filter((d, i) => i == 1)
                .attr("transform", (d) => {
                const x = -48;
                const y = -48;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.ves.wrapper
                .attr("transform", (d) => {
                const x = this.dimensions.width - 160;
                const y = 60;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.ves.textWrapper
                .attr("transform", (d) => {
                const x = 120;
                const y = 10;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.maatwerk.wrapper
                .attr("transform", (d) => {
                const x = this.dimensions.width - 40;
                const y = this.dimensions.height - 40;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.maatwerk.textWrapper
                .attr("transform", (d) => {
                const x = 0;
                const y = -20;
                return "translate(" + x + "," + y + ")";
            });
            this.svg.nieuw.path
                .attr("x1", 200)
                .attr("y1", this.dimensions.height / 2)
                .attr("x2", 340)
                .attr("y2", this.dimensions.height / 2);
            this.svg.naar_ves.path
                .attr("x1", this.dimensions.width / 2 + 50)
                .attr("y1", this.dimensions.height / 2)
                .attr("x2", this.dimensions.width / 2 + 170)
                .attr("y2", this.dimensions.height / 2 - 64);
            this.svg.naar_maatwerk.path
                .attr("x1", this.dimensions.width / 2 + 50)
                .attr("y1", this.dimensions.height / 2)
                .attr("x2", this.dimensions.width / 2 + 170)
                .attr("y2", this.dimensions.height / 2 + 64);
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
exports.default = WeekV2;
