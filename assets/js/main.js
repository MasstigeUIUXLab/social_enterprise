"use strict";
$(document).ready(function() {
	$('#indexContainer').fullpage({
		licenseKey: 'F67168A3-4AB64A38-A211B922-2DB1C3AC',
		sectionSelector: '.main-section',
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		scrollingSpeed: 1000,
		navigation: false,
		controlArrows: false,
		anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
		responsiveWidth: 1401,
		afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(false, 'up');
			}
		},
	
		onSlideLeave: function( anchorLink, index, slideIndex, direction) {
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(true, 'up');
			}
		} 
	}); 
	
	var visualSwiper = new Swiper(".swiper-visual", {
		speed: 1200,
		loop: true,
		autoplay: {
		  delay: 6000,
		  disableOnInteraction: false,	
		},
		parallax: true,
		pagination: {
			el: ".swiper-visual .swiper-pagination",
			clickable: false,
			type: "custom",
			renderCustom: function(swiper, current, total) {
				return (
					'<span class="current">' + 0 + (current) + '</span>' + '<span class="total">' + 0 + (total) + '</span>'
				);
			}
		},
		on: {
			autoplayTimeLeft(s, time, progress) {
				document.querySelector('.visual-progress svg').style.setProperty("--progress", 1 - progress)
			}
		}
	});

	$(document).on('mouseenter focus', '.support-list .link', function(e){
		$(this).parent('.item').addClass('active').siblings().removeClass('active');
	});

	// let cloneSlide = $('.swiper-board .swiper-wrapper').html();
	// let arraySlide = [];
	// let boardSwiper; 
   
	// $('.swiper-board .swiper-slide').each(function(i, e) {
	// 	arraySlide.push(e);
	// });

	// $('.category-list a').on('click', function(e) {
	// 	e.preventDefault();
	// 	boardSwiper.destroy();

	// 	const type = $(this).text();
		
	// 	$(this).addClass('on').parent().siblings().find('.on').removeClass('on');
	// 	$('.swiper-board .swiper-wrapper').empty();
		
	// 	if (type === '전체') {
	// 		$('.swiper-board .swiper-wrapper').append(cloneSlide);
	// 	} else {
	// 		$(arraySlide).each(function(i, e) {
	// 			const exist = $(e).attr('data-type').indexOf(type);
			
	// 			if (exist >= 0) {
	// 				$('.swiper-board .swiper-wrapper').append(e);
	// 			}
	// 		});
	// 	}
	// 	boardSwiperInit();
	// });
	
	var	boardSwiper = new Swiper(".swiper-board", {
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		slideToClickedSlide : true,
		slidesPerView: 1,
		spaceBetween: 16,
		navigation: {
			nextEl: ".swiper-board .swiper-button-next",
			prevEl: ".swiper-board .swiper-button-prev",
		}, 	
		breakpoints: {
			769: {
				spaceBetween: 24,
			},
		},
		on: {
			init: function(){
			},
			slideChange: function(instance){
				swiperPaginationLoop(instance);
			},
			update: function() {
				this.slideTo(0);
			}
		},
	});
	
	function swiperPaginationLoop(instance){
		var currentIndex = instance.realIndex; 
		var loopedSlides = instance.slides.length / 2; 
	  
		if (currentIndex >= loopedSlides) {
		  currentIndex -= loopedSlides; 
		}
	}

	var bannerSwiper = new Swiper(".swiper-banner", {
		speed: 1200,
		effect: 'fade',
		loop: true,  
		autoplay: {
		  delay: 6000,
		  disableOnInteraction: false,	
		},
		pagination: {
			el: ".swiper-banner .swiper-pagination",
			clickable: false,
			type: "custom",
			renderCustom: function(swiper, current, total) {
				return (
					'<span class="current">' + 0 + (current) + '</span>' + '<span class="total">' + 0 + (total) + '</span>'
				);
			}
		},
		on: {
			autoplayTimeLeft(s, time, progress) {
				document.querySelector('.banner-progress svg').style.setProperty("--progress", 1 - progress)
			}
		}
	})

	var eventSwiper = new Swiper(".swiper-event", {
		speed: 1200,
		slidesPerView: 1.25, 
		spaceBetween : 24, 
		autoplay: {
		  delay: 6000,
		  disableOnInteraction: false,	
		},
		breakpoints: {
			1400: {
			  slidesPerView: 4,
			},
			767: {
			  slidesPerView: 3,
			},
		}
	})
	
	var menuSwiper = new Swiper(".swiper-menu", {
		slidesPerView: 'auto',
		spaceBetween: 24,
		autoplay: {
		  delay: 5000,
		  disableOnInteraction: false,	
		},
		navigation: {
			nextEl: ".swiper-menu .swiper-button-next",
			prevEl: ".swiper-menu .swiper-button-prev",
		}, 	
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 38,
			},
			1200: {
				slidesPerView: 7,
				spaceBetween: 44,
			},
			1440: {
				slidesPerView: 7,
				spaceBetween: 76,
			},
		},
	})

});