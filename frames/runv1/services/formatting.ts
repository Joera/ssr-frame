


export const toDate = (d: string) => {

    const date = new Date(d);
    const formatter = new Intl.DateTimeFormat('en-US',  { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date);

    return formattedDate;

}

export const toTime = (d: Date) => {

    const date = new Date(d);

    return date.toLocaleTimeString();

}

const twoDigit = (n: Number) => {

    return (parseFloat(n.toString()) < 10) ? "0" + n.toString() : n.toString();
}

export const parseDuration = (duration: string) => {

    const d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);


    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? twoDigit(m) + ":" : "";
    var sDisplay = s > 0 ? twoDigit(s) : "";
    return hDisplay + mDisplay + sDisplay; 
}

export const calcSpeed = (s: string) => {

     const kmh = (Number(s) * 3.6);

     const pacePerKm = 60 / kmh;
    
     // Calculate minutes and seconds
     const minutes = Math.floor(pacePerKm);
     const seconds = Math.round((pacePerKm - minutes) * 60);
     
     // Format the result
     const formattedPace = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     
     return formattedPace + ' /km';

} 