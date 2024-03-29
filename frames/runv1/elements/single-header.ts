import { toTime, toDate} from "../services/formatting"
import { datesAndTimes, title } from "../services/typography";

export class SingleHeader {

    headerElement;

    constructor(
        private parent,
        private window,
        private groupSlug?
    ){}

    draw(activity) {

        console.log(activity);

        this.headerElement = this.window.document.createElement('div');
        this.headerElement.classList.add('activity_header');
        this.headerElement.style.position = 'relative';
        this.headerElement.style.display = 'flex';
        this.headerElement.style.flexDirection = 'column';
        this.headerElement.style.justifyContent = 'center';
        this.headerElement.style.alignItems = 'flex-start';
        // this.headerElement.style.width = 'calc(50% - 0px)';
        this.headerElement.style.gridColumn = '9 / span 3';
        this.headerElement.style.gridRow = '2 / span 6';
        // this.headerElement.style.marginTop = '-3rem';
        // this.headerElement.style.marginRight = '1rem';
        
      

        const offset = 3;

        let dateEl = datesAndTimes(this.headerElement);
        dateEl.innerHTML = toDate(activity.local_time);
        dateEl.style.marginLeft = "12rem"; // (1 + (1 * offset)).toString() + "rem";

        let timeEl = datesAndTimes(this.headerElement);
        timeEl.innerHTML = toTime(activity.local_time);
        timeEl.style.marginLeft = "6rem"; // (1 + (2 * offset)).toString() + "rem";

        let h = title(activity.title, this.headerElement)
        h.style.marginLeft = "0rem";

        this.parent.appendChild(this.headerElement);
       
        return true;
    }

    redraw() {
    }

}
