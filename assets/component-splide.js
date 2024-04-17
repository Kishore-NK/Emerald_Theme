class CustomSlider extends HTMLElement {
    constructor() {
        super();
        this.element = this.querySelector(".splide");
        this.options = JSON.parse(this.element.dataset.sliderOptions);
        this.mountSlider();
        console.log(this.getAttribute("data-slider-options"));
    }
    mountSlider() {
        let splide = new Splide(this.element, this.options).mount();

        const desktopimage = Array.from(document.querySelectorAll(".desktopimages"));
        desktopimage.forEach(each => {
            if(desktopimage.indexOf(each) !== 0) {
                each.classList.add('d-none');
            }
        });
        const slides = document.querySelectorAll('.splide__slide');
        slides.forEach(each => {
            if(each.classList.contains('is-active')) {
            each.classList.add('active-slide');
            } else {
            each.classList.remove('active-slide');
            }
            each.removeAttribute('style');
        })
        splide.on('moved', function(index){
            //changing the image
            desktopimage.forEach(each => {
                if(index === desktopimage.indexOf(each)) {
                    each.classList.remove('d-none');
                } else {
                    each.classList.add('d-none');
                }
            });
            //changing the color
            slides.forEach(each => {
                if(each.classList.contains('is-active')) {
                    each.classList.add('active-slide');
                } else {
                    each.classList.remove('active-slide');
                }
            }) 
        })

        // splide.mount();
    }
}
customElements.define("splider-component", CustomSlider);   