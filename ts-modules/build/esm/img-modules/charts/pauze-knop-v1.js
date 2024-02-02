var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ChartBackgroundAreas } from '@local/elements';
import { GraphControllerV2 } from "@local/d3_graphs";
export default class PauzeknopV1 extends GraphControllerV2 {
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
        this._addScale("x", "radius", "radius", "_week");
        this._addScale("y", "radius", "radius", "value");
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
            container.style.overflow = "hidden";
            container.id = svgId;
            this.element.appendChild(container);
            _super._svg.call(this, container);
            // this.dimensions = this.chartDimensions.fix(size)
            this.config.paddingInner = .2;
            this.els.chart = new ChartBackgroundAreas(this);
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
        //   meldingen
        };
    }
    draw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scales.x.set(data.slice.map(d => d["_week"]));
            this.scales.y.set(data.slice.map(d => d["value"]));
            const values = [0];
            values.push(data.meldingen[0].value);
            yield this.els.chart(data.trend);
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
            yield this.els.chart.redraw();
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
