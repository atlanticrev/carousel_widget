class Carousel {

    // @todo Options: optional controls, optional swipe threshold, content of slide, touches
    constructor () {
        this.viewport = this.getDomElement(this.getTemplate());
        this.slides = this.viewport.querySelectorAll('.slide');
        this.slidesContainer = this.viewport.querySelector('.slides-container');
        this.controls = [this.viewport.querySelector('.controls.left'), this.viewport.querySelector('.controls.right')];

        this.currSlideIndex = 0;

        this.swipeThreshold = 0.25;

        this.coords = {
            prev: 0,
            start: null,
            curr: null
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);

        this.slidesContainer.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);

        this.controls[0].addEventListener('click', this.prevSlide);
        this.controls[1].addEventListener('click', this.nextSlide);

        this.render();
    }

    render () {
        document.body.appendChild(this.viewport);

        this.slideWidth = 100; // 100%
        this.OUT_OF_SWIPE_AREA = this.slideWidth / 4;
        this.LEFT_THRESHOLD = -1 * (this.slideWidth * (this.slides.length - 1)) - this.OUT_OF_SWIPE_AREA; // (-1) direction
        this.RIGHT_THRESHOLD = 0 + this.OUT_OF_SWIPE_AREA;
    }

    onMouseDown (e) {
        this.coords.start = e.clientX;
        this.slidesContainer.style.setProperty('--transition', 'none');
        document.addEventListener('mousemove', this.onMouseMove);        
    }

    onMouseMove (e) {
        this.coords.curr = this.coords.prev + (e.clientX - this.coords.start) / this.slides[0].getBoundingClientRect().width * 100;
        this.coords.curr = Math.min(this.RIGHT_THRESHOLD, Math.max(this.coords.curr, this.LEFT_THRESHOLD));
        this.currSlideIndex = Math.round(Math.abs(this.coords.curr) / this.slideWidth); // swipeThreshold 50%

        // // @todo Calculating swipe threshold
        // const original = Math.abs(this.coords.curr) / this.slideWidth;
        // const decimalPart = original - Math.trunc(original);
        // console.log(decimalPart);
        // if (this.swipeThreshold <= decimalPart <= 1 - this.swipeThreshold) {
        //     this.currSlideIndex = Math.ceil(Math.abs(this.coords.curr) / this.slideWidth);
        // } else {
        //     this.currSlideIndex = Math.floor(Math.abs(this.coords.curr) / this.slideWidth);
        // }

        this.slidesContainer.style.setProperty('--transform', `${this.coords.curr}%`);
    }

    onMouseUp () {
        const slidePos = -1 * this.currSlideIndex * this.slideWidth;
        this.slidesContainer.style.setProperty('--transition', '0.3s ease-out');
        this.slidesContainer.style.setProperty('--transform', `${slidePos}%`);
        this.coords.prev = slidePos;
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    getDomElement (layout) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = layout;
        return wrapper.firstElementChild;        
    }

    getTemplate () {
        return `
            <div class="viewport" draggable="false">
                <div class="slides-container" draggable="false">
                    <div class="slide" draggable="false">1</div>
                    <div class="slide" draggable="false">2</div>
                    <div class="slide" draggable="false">3</div>
                    <div class="slide" draggable="false">4</div>
                    <div class="slide" draggable="false">5</div> 
                </div>
                <div class="controls left"></div>
                <div class="controls right"></div>
            </div>
        `;
    }

    nextSlide () {
        const newPos = Math.max(-1 * (this.currSlideIndex + 1) * this.slideWidth, this.LEFT_THRESHOLD + this.OUT_OF_SWIPE_AREA);
        this.coords.prev = newPos;
        this.currSlideIndex = Math.min(++this.currSlideIndex, this.slides.length - 1);
        this.slidesContainer.style.setProperty('--transform', `${newPos}%`);
    }

    prevSlide () {
        const newPos = Math.min(-1 * (this.currSlideIndex - 1) * this.slideWidth, this.RIGHT_THRESHOLD - this.OUT_OF_SWIPE_AREA);
        this.coords.prev = newPos;
        this.currSlideIndex = Math.max(--this.currSlideIndex, 0);
        this.slidesContainer.style.setProperty('--transform', `${newPos}%`);
    }

}

const carousel = new Carousel();