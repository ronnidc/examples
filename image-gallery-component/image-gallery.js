class ImageGallery extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.currentIndex = 0;
		this.config = {};

		this.updateImage = this.updateImage.bind(this);
		this.prevImage = this.prevImage.bind(this);
		this.nextImage = this.nextImage.bind(this);
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
	}

	connectedCallback() {
		const configScript = this.querySelector('script[type="application/json"]');
		if (configScript) {
			this.config = JSON.parse(configScript.textContent);
		}

		this.render();
		this.updateImage();
	}

	render() {
		this.shadowRoot.innerHTML = `
		<style>
		img {
			max-width: 100%;
		}
		.gallery-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #fff;	
		  }
	  
		  .gallery-controls {
			display: flex;
			justify-content: center;
			margin-top: 1rem;
		  }
	  
		  .gallery-controls button {
			margin: 0 1rem;
		  }
	  
		  .fullscreen-btn {
			position: absolute;
			top: 1rem;
			right: 1rem;
		  }
		</style>

		<div class="gallery-container">
    <img class="gallery-image" />
    <div class="gallery-caption"></div>
    <div class="gallery-controls">
      <button class="prev-btn">&laquo; Prev</button>
      <button class="next-btn">Next &raquo;</button>
    </div>
    ${this.config.fullscreen ? '<button class="fullscreen-btn">Fullscreen</button>' : ''}
  </div>
`;

		this.shadowRoot.querySelector('.prev-btn').addEventListener('click', this.prevImage);
		this.shadowRoot.querySelector('.next-btn').addEventListener('click', this.nextImage);

		if (this.config.fullscreen) {
			this.shadowRoot.querySelector('.fullscreen-btn').addEventListener('click', this.toggleFullscreen);
		}
	}

	updateImage() {
		const image = this.config.images[this.currentIndex];
		this.shadowRoot.querySelector('.gallery-image').src = image.src;
		this.shadowRoot.querySelector('.gallery-caption').textContent = image.caption;
	}

	prevImage() {
		this.currentIndex = (this.currentIndex - 1 + this.config.images.length) % this.config.images.length;
		this.updateImage();
	}

	nextImage() {
		this.currentIndex = (this.currentIndex + 1) % this.config.images.length;
		this.updateImage();
	}

	toggleFullscreen() {
		const galleryContainer = this.shadowRoot.querySelector('.gallery-container');

		if (!document.fullscreenElement) {
			if (galleryContainer.requestFullscreen) {
				galleryContainer.requestFullscreen();
			} else if (galleryContainer.mozRequestFullScreen) { // Firefox
				galleryContainer.mozRequestFullScreen();
			} else if (galleryContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
				galleryContainer.webkitRequestFullscreen();
			} else if (galleryContainer.msRequestFullscreen) { // IE/Edge
				galleryContainer.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) { // Firefox
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { // IE/Edge
				document.msExitFullscreen();
			}
		}
	}
}

customElements.define('image-gallery', ImageGallery);
