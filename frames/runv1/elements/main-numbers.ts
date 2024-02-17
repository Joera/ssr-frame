import { calcSpeed, parseDuration } from "../services/formatting";
import { centeredColumn } from "../services/layout";
import { label, bigNumber } from "../services/typography";

export class MainNumbers {

    headerElement;

    constructor(
        private parent,
        private window,
        private groupSlug?
    ){}

//     average_speed: "2.977"
// data_source: "strava"
// distance: 16015
// elevation_gain: 13
// local_time: "2024-01-27T11:28:49Z"
// map: ""
// moving_time: 5380
// sport_type: "Run"
// strava_single_activity: true
// timezone: "(GMT+01:00) Europe/Amsterdam"
// title: "Middagloop"
// type: "Run"
// utc_time: 1706351329000


    draw(activity) {

        this.headerElement = this.window.document.createElement('div');
        this.headerElement.classList.add('main_numbers');
        this.headerElement.style.position = 'relative';
        this.headerElement.style.gridColumn = '2 / span 3';
        this.headerElement.style.gridRow = '2 / span 6';
        centeredColumn(this.headerElement);

        label("distance", this.headerElement);
        const e1 = bigNumber((parseInt(activity.distance) / 1000).toString() + "km", this.headerElement);
        e1.style.padding = "0 0 3.2rem 0";
        
        label("moving time", this.headerElement);
        const e2 = bigNumber(parseDuration(activity.moving_time), this.headerElement);
        e2.style.padding = "0 0 3.2rem 0";

        label("average speed", this.headerElement);
        const e3 = bigNumber(calcSpeed(activity.average_speed), this.headerElement);

        this.parent.appendChild(this.headerElement);

        return true;
    }

    redraw() {
    }

}
