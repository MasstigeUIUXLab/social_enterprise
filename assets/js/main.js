"use strict";
$(document).ready(function() {
	$('#indexContainer').fullpage({
		licenseKey: 'F67168A3-4AB64A38-A211B922-2DB1C3AC',
		sectionSelector: '.main-section',
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		scrollingSpeed: 500,
		navigation: false,
		controlArrows: false,
		anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
		responsiveWidth: 1401,
		'afterLoad': function( anchorLink, index, slideAnchor, slideIndex) {
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(false, 'up');
			}	else {
				focusTrapping();	
			}
		},
	
		'onLeave': function( anchorLink, index, slideIndex, direction) {
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(true, 'up');
			} else {
				focusTrapping();
			}
		} 
	}); 

	function focusTrapping(){
		const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
		const activeSection = $('.main-section').filter('.active');
		const focusableContent = $(activeSection).find(focusableElements);
		const firstFocusableElement = focusableContent[0];
		const lastFocusableElement = focusableContent[focusableContent.length - 1];

  		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
		
		if(!isMobile) {
			$(activeSection).on('keydown', function(e){
				let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
				
				if( !isTabPressed ){ return; }
				
				if( e.shiftKey ){
					if( document.activeElement === firstFocusableElement ){
						// $.fn.fullpage.setAllowScrolling(true, 'up');

						var element = Array.from(document.querySelectorAll('#indexNav > a')).filter(el => el.dataset.id === String(activeSection.index()-1))[0];
						element.click();
						activeSection.prev().find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').last().focus();
					}
					
				}else{
					if( document.activeElement === lastFocusableElement ){
						if(activeSection.index() === $('.main-section').length - 1){
							return false;
						} else {
							var element = Array.from(document.querySelectorAll('#indexNav > a')).filter(el => el.dataset.id === String(activeSection.index()+1))[0];
							element.click();
							activeSection.next().find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').first().focus();
						}
					}
				}
			});
		} 
	}
	
	var visualSwiper = new Swiper(".swiper-visual", {
		speed: 1200,
		loop: true,
		effect: 'slide',
		autoplay: {
		  delay: 6000,
		  disableOnInteraction: false,	
		},
		navigation: {
			nextEl: ".swiper-visual .swiper-button-next",
			prevEl: ".swiper-visual .swiper-button-prev",
		}, 	
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
			},
			slideChangeTransitionStart: function() {
				let activeSlide = this.slides[this.activeIndex];
				let video = activeSlide.querySelector('video');
				
				if (video) {
					this.autoplay.stop();
					video.pause();
					video.load();
					
					video.addEventListener("ended", function(){
						if(!$('.swiper-visual').find('.btn-swiper-play').hasClass('on')){
							visualSwiper.autoplay.start();
						} 
					});
				}
			},
			slideChange: function () {
				let activeSlide = this.slides[this.activeIndex];
				let video = activeSlide.querySelector('video');

				let delay = 6000;
				if (video) {
					delay = 0;
				} else {
					delay = 6000;
				}
				this.params.autoplay.delay = delay; 
				this.autoplay.start();
			}
		}
	});

	var isMobile = window.matchMedia('(max-width: 1024px)').matches;

	$(window).resize(function(){
		isMobile = (window.matchMedia('(max-width: 1024px)').matches);
	})

	$('.support-list .link').on('click', function(e){
		if(isMobile){
			$(this).parent('.item').addClass('active').siblings().removeClass('active');
		} else {
			return false;
		}
	});

	$(document).on('mouseenter focus', '.support-list .link', function(e){
		if(!isMobile){
			$(this).parent('.item').addClass('active').siblings().removeClass('active');
		} else {
			return false;
		}
	})

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
		speed: 300,
		loop: true,
		loopFillGroupWithBlank: true,
		slidesPerView: 1,
		spaceBetween: 16,
		autoplay: {
		  delay: 4000,
		  disableOnInteraction: false,	
		},
		breakpoints: {
			769: {
				spaceBetween: 24,
				slidesPerView: 2,
			},
		},
		a11y: { 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',   
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
		navigation: {
			nextEl: ".swiper-banner .swiper-button-next",
			prevEl: ".swiper-banner .swiper-button-prev",
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
				document.querySelector('.swiper-banner .banner-progress svg').style.setProperty("--progress", 1 - progress)
			}
		}
	})

	var eventSwiper = new Swiper(".swiper-event", {
		speed: 1200,
		slidesPerView: 2.25, 
		spaceBetween : 12, 
		// autoplay: {
		//   delay: 6000,
		//   disableOnInteraction: false,	
		// },
		breakpoints: {
			1400: {
			  slidesPerView: 4, 
				spaceBetween : 24, 
			},
			767: {
			  slidesPerView: 3, 
				spaceBetween : 16, 
			},
		}
	})
	
	var menuSwiper = new Swiper(".swiper-menu", {
		slidesPerView: 'auto',
		spaceBetween: 24,
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

  $(".btn-swiper-play").on("click", function (e) {
    var $t = $(this),
      $tg = $(this).data("target");

    $t.toggleClass("on");

    switch ($tg) {
      case "swiper-banner":
        if ($(this).hasClass("on")) {
            bannerSwiper.autoplay.stop();
        } else {
            bannerSwiper.autoplay.start();
        };
        break;
      case "swiper-visual":
        if ($(this).hasClass("on")) {
            visualSwiper.autoplay.stop();
        } else {
            visualSwiper.autoplay.start();
        }
        break;
      default:
        break;
    }
  });
});