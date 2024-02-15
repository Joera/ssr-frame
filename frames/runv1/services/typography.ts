export const label = (text: string, parent) => {

    let e = window.document.createElement('span');
    e.style.fontSize = '2rem';
    e.style.lineHeight = '1';
    e.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "400";
    e.innerHTML = text;
    parent.appendChild(e);

    return e;
}

export const bigNumber = (value: string , parent: HTMLElement) => {

    const e = window.document.createElement('h2');
    e.style.fontSize = '8.2rem';
    e.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "700";
    e.style.margin = "0";
    e.style.padding = "0";
    e.style.lineHeight = ".5";
    e.innerHTML = value;

    parent.appendChild(e);
    return e;
}

export const title = (text: string , parent: HTMLElement) => {

    const e = window.document.createElement('h1');
    e.style.fontSize = '4.8rem';
    e.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "700";
    e.style.margin = "0";
    e.style.padding = "0";
    e.style.lineHeight = "1.5";
    e.innerHTML = text;

    parent.appendChild(e);
    return e;
}

export const datesAndTimes = (parent: HTMLElement) => {

    let dateEl = window.document.createElement('div');
    dateEl.classList.add('activity_date');
    dateEl.style.fontSize = '4rem';
    dateEl.style.fontFamily = "'Inkwell Sans A', 'Inkwell Condensed B'";
    dateEl.style.fontStyle = "normal";
    dateEl.style.fontWeight = "400";
    dateEl.style.lineHeight = "1.5";
    parent.appendChild(dateEl);

    return dateEl;
}