

export const html = (flavor,eas) => {

    return `
    <!doctype html>

    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    
      <title>Unforgettable</title>
      <meta name="description" content="">
      <meta name="author" content="0xunforgettable.eth">
    
      <link rel="stylesheet" href="http://assets.autonomous-times.com/871193/138E3024B50A41690.css">
      <link rel="stylesheet" href="http://assets.autonomous-times.com/871193/355F1A7B630698B00.css">

      <link rel="stylesheet" href="http://ssr_server/assets/${flavor}/css/styles.css">
  
    </head>
    <body style="width:100%;height:100%">
    <main data-graph-preset="frame" style="background:#fff;width:1000px;height:1910px;"></main>
    </body> 
    <script src="http://ssr_server/scripts/${flavor}/main.bundle.js"></script>
    <script>main.run("${eas}")</script>
    </html>`;
}

// export const createGraphGroupElement = (graphObject : any, window: Window, htmlContainer: HTMLElement) => {

//   let element = window.document.createElement('article');
//   element.classList.add('waar_is_dit_dan')
//   element.style.position = "absolute";
//   element.style.top = "0";
//   element.style.bottom = "0";
//   element.style.height = "100%";
//   element.style.width = "100%";
//   element.style.display = "flex";

//   element.id = graphObject.slug

//   if (graphObject.elementClasslist) {

//       for (let className of graphObject.elementClasslist) {
//           element.classList.add(className);
//       }
//   }

//   htmlContainer.appendChild(element);

//   return element;
// }