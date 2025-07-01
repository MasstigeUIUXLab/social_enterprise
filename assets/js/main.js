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
		'afterLoad': function() {
			const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
			const activeSection = $('.main-section').filter('.active');
			let focusableContent = $(activeSection).find(focusableElements);
			let firstFocusableElement = focusableContent[0];
			let lastFocusableElement = focusableContent[focusableContent.length - 1];
			var navBtn;

			$(activeSection).on('keydown', function(e){
				let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
				
				if (!isTabPressed ){
					return;
				}

				if (e.shiftKey ){
					if( document.activeElement === firstFocusableElement ){
						console.log('first');
						navBtn = Array.from(document.querySelectorAll('#indexNav > a')).filter(el => el.dataset.id === String(activeSection.index()-1))[0];
						navBtn.click();
						focusableContent = activeSection.prev().find(focusableElements);
						firstFocusableElement = focusableContent[0];
						lastFocusableElement = focusableContent[focusableContent.length - 1];
						setTimeout(() => {
							lastFocusableElement.focus();
						}, 300);
					}
				} else {
					if (document.activeElement === lastFocusableElement ){
						console.log('last');
						if(activeSection.index() === $('.main-section').length - 1){
							return;
						} else {
							navBtn = Array.from(document.querySelectorAll('#indexNav > a')).filter(el => el.dataset.id === String(activeSection.index()+1))[0];
							navBtn.click();
							focusableContent = activeSection.next().find(focusableElements);
							firstFocusableElement = focusableContent[0];
							lastFocusableElement = focusableContent[focusableContent.length - 1];
							setTimeout(() => {
								firstFocusableElement.focus();
							}, 300);
						}
					}
				}
			});
		}
	}); 
	
	var visualSwiper = new Swiper(".swiper-visual", {
		speed: 1200,
		loop: true,
		effect: 'slide',
		autoplay: {
		  delay: 6000,
		  disableOnInteraction: true,	
		},
		navigation: {
			nextEl: ".swiper-visual .swiper-button-next",
			prevEl: ".swiper-visual .swiper-button-prev",
		}, 	
		a11y: { 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',   
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
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
				} else {
					this.autoplay.start();
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
			}
		}
	});

	supportLinkActive();

	$(window).resize(function(){
		supportLinkActive();
	})

	function supportLinkActive() {
		if(window.matchMedia('(max-width: 768px)').matches){
			console.log('ddd');
			$('.support-list .item').each(function(){
				console.log($(this));
				$(this).addClass('active');
			})
		} else {
			$('.support-list > .item:first-child').addClass('active').siblings().removeClass('active');
		}
	}

	$(document).on('mouseenter focus', '.support-list .link', function(e){
		if(!window.matchMedia('(max-width: 1024px)').matches){
			$(this).parent('.item').addClass('active').siblings().removeClass('active');
		} else {
			return false;
		}
	})

	var	boardSwiper = new Swiper(".swiper-board", {
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: true,
		// },
		// slideToClickedSlide : true,
		slidesPerView: 1,
		spaceBetween: 16,
		breakpoints: {
			769: {
				spaceBetween: 24,
			},
		},
		navigation: {
			nextEl: ".swiper-board .swiper-button-next",
			prevEl: ".swiper-board .swiper-button-prev",
		},
		a11y: { 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',   
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});

	
	if($('.swiper-banner').closest('.banner-wrp').length){
		var bannerSwiper = new Swiper(".swiper-banner", {
			speed: 300,
			loop: true,
			loopFillGroupWithBlank: true,
			slidesPerView: 1,
			spaceBetween: 16,
			autoplay: {
			delay: 4000,
			disableOnInteraction: true,	
			},
			breakpoints: {
				769: {
					slidesPerView: 2,
					spaceBetween: 24,
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
	} else {
		var bannerSwiper = new Swiper(".swiper-banner", {
			speed: 300,
			loop: true,
			loopFillGroupWithBlank: true,
			slidesPerView: 1,
			spaceBetween: 16,
			autoplay: {
			delay: 4000,
			disableOnInteraction: true,	
			},
			breakpoints: {
				769: {
					slidesPerView: 1,
					spaceBetween: 24,
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
	}

	var eventSwiper = new Swiper(".swiper-event", {
		speed: 1200,
		slidesPerView: 2.25, 
		spaceBetween : 12, 
		// autoplay: {
		//   delay: 6000,
		//   disableOnInteraction: true,	
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
		spaceBetween:12,
		navigation: {
			nextEl: ".swiper-menu .swiper-button-next",
			prevEl: ".swiper-menu .swiper-button-prev",
		}, 	
		breakpoints: {
			768: {
				spaceBetween: 24,
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