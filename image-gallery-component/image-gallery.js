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
		this.galleryImagesContainer = this.shadowRoot.querySelector('.gallery-images-container');
		this.updateImage();
	  
		this.addSwipeListeners();
	}

	addSwipeListeners() {
		let startX = 0;
		let endX = 0;

		const onTouchStart = (e) => {
			startX = e.touches[0].clientX;
		};

		const onTouchMove = (e) => {
			endX = e.touches[0].clientX;
		};

		const onTouchEnd = () => {
			const threshold = 100;

			if (startX - endX > threshold) {
				this.nextImage();
			} else if (endX - startX > threshold) {
				this.prevImage();
			}
		};

		this.shadowRoot.addEventListener('touchstart', onTouchStart);
		this.shadowRoot.addEventListener('touchmove', onTouchMove);
		this.shadowRoot.addEventListener('touchend', onTouchEnd);
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.gallery-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					overflow: hidden;
					position: relative;
					width: 100%;
				  }
			
				  .gallery-images-container {
					display: flex;
					transition: transform 0.5s ease-in-out;
					width: 100%;
				  }
			
				  .gallery-image-wrapper {
					position: relative;
					flex: none;
					width: 100%;
					overflow: hidden;
				  }

				  .gallery-image {
					display: block;
					width: 100%;
					object-fit: contain;
				  }
			
				  .gallery-caption {
					text-align: center;
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
				<div class="gallery-images-container">
					${this.config.images.map(image => `
						<div class="gallery-image-wrapper">
							<img class="gallery-image" src="${image.src}" />
							<div class="gallery-caption">${image.caption}</div>
						</div>
					`).join('')}
				</div>
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

	updateImage(direction) {
		const translateX = -100 * this.currentIndex;
		this.galleryImagesContainer.style.transform = `translateX(${translateX}%)`;
	}

	prevImage() {
		this.currentIndex = (this.currentIndex - 1 + this.config.images.length) % this.config.images.length;
		this.updateImage('prev');
	}

	nextImage() {
		this.currentIndex = (this.currentIndex + 1) % this.config.images.length;
		this.updateImage('next');
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
