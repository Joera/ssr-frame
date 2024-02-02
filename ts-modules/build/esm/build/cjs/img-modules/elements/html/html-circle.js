"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlCircle = void 0;
const styleguide_1 = require("@local/styleguide");
const d3_services_1 = require("@local/d3-services");
class HtmlCircle {
    constructor(ctrlr, element) {
        this.ctrlr = ctrlr;
        this.element = element;
    }
    draw() {
        //  const doc: Document = (typeof document === 'undefined') ? this.ctrlr.main.window.document : document;
        let element = this.element != undefined ? this.element : this.ctrlr.element;
        let miniContainer = this.ctrlr.main.window.document.createElement('div');
        miniContainer.style.display = 'flex';
        miniContainer.style.flexDirection = 'column';
        miniContainer.style.alignItems = 'center';
        if (this.ctrlr.config.extra.circleLabel) {
            let qualifier = this.ctrlr.main.window.document.createElement('span');
            qualifier.classList.add('label');
            qualifier.style.fontSize = '.8rem';
            qualifier.style.height = '1rem';
            qualifier.style.color = 'black';
            qualifier.style.fontFamily = 'NotoSans Regular';
            qualifier.style.fontWeight = 'normal';
            qualifier.innerHTML = this.ctrlr.config.extra.circleLabel;
            qualifier.style.margin = '0 auto .75rem auto';
            miniContainer.appendChild(qualifier);
        }
        let div = this.ctrlr.main.window.document.createElement('div');
        div.classList.add('number_circle');
        //  div.style.backgroundColor =  colours[this.ctrlr.firstMapping.colour][1];
        div.style.border = '2px solid ' + styleguide_1.colours[this.ctrlr.firstMapping.colour][0];
        div.style.borderRadius = '50%';
        div.style.display = 'flex';
        div.style.position = 'relative';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.width = (this.ctrlr.config.extra.circleRadius) ? this.ctrlr.config.extra.circleRadius.toString() + 'rem' : '7.5rem';
        div.style.height = (this.ctrlr.config.extra.circleRadius) ? this.ctrlr.config.extra.circleRadius.toString() + 'rem' : '7.5rem';
        div.style.margin = this.ctrlr.main.window.innerWidth < styleguide_1.breakpoints.sm ? '2rem 0' : '0 0 1.5rem 0';
        let number = this.ctrlr.main.window.document.createElement('span');
        number.classList.add('number');
        number.classList.add('in_circle');
        number.style.fontSize = '3rem';
        number.style.lineHeight = "1";
        number.style.color = 'black';
        number.style.fontFamily = "Replica";
        // number.innerHTML = "999";
        div.appendChild(number);
        if (this.ctrlr.firstMapping.units) {
            let units = this.ctrlr.main.window.document.createElement('span');
            units.classList.add('units');
            units.innerHTML = this.ctrlr.firstMapping.units;
            units.style.color = 'black';
            units.style.fontFamily = 'NotoSans Regular';
            units.style.fontSize = '0.8rem';
            units.style.display = 'block';
            // units.style.marginTop = '1rem';
            div.appendChild(units);
        }
        if (this.ctrlr.config.extra.firstInLine) {
            let period = this.ctrlr.main.window.document.createElement('span');
            period.classList.add('period');
            period.style.fontSize = '.8rem';
            period.style.height = '1rem';
            period.style.position = 'absolute';
            period.style.top = 'calc(50% - .5rem)';
            period.style.left = '-130px';
            period.style.fontFamily = 'NotoSans Regular';
            // period.style.textTransform = 'uppercase';
            period.innerHTML = 'deze week:';
            div.appendChild(period);
        }
        miniContainer.appendChild(div);
        if (this.ctrlr.config.extra.trendlineLabel) {
            let label = this.ctrlr.main.window.document.createElement('span');
            label.classList.add('label');
            label.style.fontSize = '.8rem';
            label.style.height = '1rem';
            label.style.color = 'black';
            label.style.fontFamily = 'NotoSans Regular';
            label.style.fontWeight = 'normal';
            label.innerHTML = this.ctrlr.config.extra.trendlineLabel;
            label.style.margin = '0rem auto .75rem auto';
            miniContainer.appendChild(label);
        }
        if (this.ctrlr.config.extra.noRespondents) {
            let label = this.ctrlr.main.window.document.createElement('span');
            label.classList.add('label');
            label.classList.add('no_respondents');
            label.classList.add(this.ctrlr.mapping.slug);
            label.style.fontSize = '.8rem';
            label.style.height = '1rem';
            label.style.color = 'black';
            label.style.fontFamily = 'NotoSans Regular';
            label.style.fontWeight = 'normal';
            label.style.display = 'flex';
            label.style.flexDirection = 'column';
            label.style.alignItems = 'center';
            label.innerHTML = '<span></span><span>respondenten</span>';
            label.style.margin = '0rem auto 2.5rem auto';
            miniContainer.appendChild(label);
        }
        element.appendChild(miniContainer);
    }
    redraw(data, parameter, extraParameter) {
        let element = this.element != undefined ? this.element : this.ctrlr.element;
        if (element.tagName === 'SECTION') {
            element = element.parentNode;
        }
        let value = (this.ctrlr.config.extra.decimal) ? Math.round(data[0][parameter] * 10) / 10 : Math.round(data[0][parameter]);
        if (this.ctrlr.config.extra.segmentIndicator) {
            element.querySelector('.number.in_circle').innerHTML = (this.ctrlr.config.qualifier && this.ctrlr.config.qualifier !== undefined) ? value + this.ctrlr.config.qualifier : value;
        }
        else {
            element.querySelector('.number.in_circle').innerHTML = (value > 9999) ? (0, d3_services_1.thousands)(value) : value;
        }
        if (value > 9999) {
            element.querySelector('.number.in_circle').style.fontSize = '2rem';
        }
        if (this.ctrlr.config.extra.noRespondents) {
            const spanEl = this.ctrlr.main.window.document.querySelector('.label.no_respondents.' + this.ctrlr.mapping.slug + ' span:first-child');
            if (spanEl) {
                spanEl.innerHTML = data[0][extraParameter];
            }
        }
    }
}
exports.HtmlCircle = HtmlCircle;
