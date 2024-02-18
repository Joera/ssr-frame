const textColor = "#fff"

export const label = (text: string, parent) => {

    let e = window.document.createElement('span');
    e.style.fontSize = '3.2rem';
    e.style.lineHeight = '1';
    e.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "400";
    e.style.color = textColor;
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
    e.style.color = textColor;
    e.innerHTML = value;

    parent.appendChild(e);
    return e;
}

export const title = (text: string , parent: HTMLElement) => {

    const e = window.document.createElement('h1');
    e.style.fontSize = '8.2rem';
    e.style.fontFamily = "'Inkwell Condensed A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "700";
    e.style.margin = "0";
    e.style.padding = "0";
    e.style.lineHeight = "1.5";
    e.style.color = "#f4c6e2";
    e.innerHTML = text;

    parent.appendChild(e);
    return e;
}

export const datesAndTimes = (parent: HTMLElement) => {

    let e = window.document.createElement('div');
    e.classList.add('activity_date');
    e.style.fontSize = '5.2rem';
    e.style.fontFamily = "'Inkwell Sans A', 'Inkwell Condensed B'";
    e.style.fontStyle = "normal";
    e.style.fontWeight = "400";
    e.style.lineHeight = "1.5";
    e.style.color = textColor;
    parent.appendChild(e);

    return e;
}