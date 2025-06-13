import gsap from "gsap";

export function setupMarqueeAnimation() {
    const marqueeItems = gsap.utils.toArray(".destaque h1");
    if (marqueeItems.length > 0) {

        const tl = horizontalLoop(marqueeItems, {
            repeat: -1,
            paddingRight: 30,
        })
    }
}

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};

    let tl = gsap.timeline({
        repeat: config.repeat,
        defaults: { ease: "none" },
    });
    let lenght = items.length;
    let startX = [];
    let xPercents = [];
    let  pixelsPerSecond =  (config.speed || 1) * 100;
    let totalWidth, curX, distanceToStart, distanceToLoop, item, i;


    gsap.set(items, {

    xPercents: (i, el) => {
        let w = (widthhs[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercents");
        return xPercents[i];
    },
    });


    gsap.set(items, {x: 0});
    totalWidth = items[lenght - 1].offsetLeft + (xPercents[lenght - 1] / 100) * widthhs[lenght - 1] - startX + items[lenght -1].offsetWidth * gsap.getProperty(items[lenght - 1], "scaleX") + (perseFloat(config.paddingRight) || 0);


    for (i = 0; i < lenght; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widthhs[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widthhs[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, {
            xPercents: ((curX - distanceToLoop) / widthhs[i]) * 100,
            duration: distanceToLoop / pixelsPerSecond,
        }, 0).fromTo(
            item,
            { xPercents: ((curX - distanceToLoop + totalWidth) / widthhs[i]) * 100 },
           {
            xPercents: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
           },
           distanceToLoop / pixelsPerSecond
           
        )
    }

    tl.progress(1, true).progress(0, true);
    return tl;
    }
