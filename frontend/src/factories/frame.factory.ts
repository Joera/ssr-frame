export const showLink = (flavor: string, uid: string) => {

    const container = document.getElementById("link_container");
    container.style.visibility = "visible";

    const div = document.getElementById("frame_link");
    div.innerHTML = `https://unforgettable.autonomous-times.com/?flavor=${flavor}&uid=${uid}`;
}