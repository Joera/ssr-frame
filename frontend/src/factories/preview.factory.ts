export const preview = (image : string) => {

    const DOMAIN = "https://frames.autonomous-times.com" // localhost:8880

    const container = document.getElementById("preview_container");
    container.innerHTML = "";

    const a = document.createElement("article");
    a.style.width = "100%";
    a.style.height = "auto";
    a.style.position = "relative";

    const img = document.createElement("img");
    img.src = DOMAIN + "/frames/" + image;
    img.style.width = "100%";
    img.style.height = "auto";

    a.appendChild(img);

    container.appendChild(a);

}