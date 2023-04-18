
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


function slideUp (target, duration=300) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
	  target.style.display = 'none';
	  target.style.removeProperty('height');
	  target.style.removeProperty('padding-top');
	  target.style.removeProperty('padding-bottom');
	  target.style.removeProperty('margin-top');
	  target.style.removeProperty('margin-bottom');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

function slideDown (target, duration=300) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
	  display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
	  target.style.removeProperty('height');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

let faqItemCheck = false;
body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	
	// =-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-
	
	const faqItem = $('.faq__item');
	if (faqItem) {
	
		if (!faqItemCheck) {
		faqItemCheck = true;
	
		faqItem.classList.add('_animating');
	
		const faqItemContent = faqItem.querySelector('.faq__item--content'),
		activeFaqItem = document.querySelector('.faq__item._active');
	
		if (!faqItem.classList.contains('_active')) {
	
			if (activeFaqItem) {
				activeFaqItem.classList.remove('_active');
				activeFaqItem.querySelector('.faq__item--content').style.display = 'block';
				slideUp(activeFaqItem.querySelector('.faq__item--content'));
			}
	
			faqItem.classList.add('_active');
			slideDown(faqItemContent);
	
		} else {
	
			faqItemContent.style.display = 'block';
			slideUp(faqItemContent);
			faqItem.classList.remove('_active');
	
		}
	
		setTimeout(() => {
			faqItemCheck = false;
		},300)
	
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let scrollLink = $('.scroll-link');
	if(scrollLink) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(scrollLink.getAttribute('href'))
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		window.scrollTo({
			left: 0,
			top: (section) ? section.offsetTop : 0,
			behavior: 'smooth'
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

const btnToScroll = document.querySelectorAll('.btn-to-scroll');
btnToScroll.forEach(btnToScroll => {
	const links = btnToScroll.querySelectorAll('a');
	links.forEach(link => {
		link.addEventListener('click', function (event) {
			
			event.preventDefault();
			let section;
		
			section = document.querySelector(event.target.getAttribute('href'))
		
			menu.forEach(elem => {
				elem.classList.remove('_mob-menu-active')
			})
		
			window.scrollTo({
				left: 0,
				top: (section) ? section.offsetTop - header.offsetHeight : 0,
				behavior: 'smooth'
			})
		})
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let widthScreen = window.innerWidth;
html.style.setProperty("--height-screen-min", window.innerHeight + "px");

function resize() {

	if(widthScreen != window.innerWidth) {
		widthScreen = window.innerWidth;
		html.style.setProperty("--height-screen-min", window.innerHeight + "px");
	}
	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--height-screen", window.innerHeight + "px");

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

let coordsY;
function scroll() {
	coordsY = Math.abs(body.getBoundingClientRect().y);
	if(coordsY > 0 && !header.classList.contains('_scroll')) {
		header.classList.add('_scroll');
	} else if(coordsY <= 0 && header.classList.contains('_scroll')) {
		header.classList.remove('_scroll');
	}
}

scroll()

document.addEventListener('scroll', scroll);

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=
