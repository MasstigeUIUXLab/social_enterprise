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

	var bannerSwiper0 = new Swiper(".swiper-banner", {
		speed: 300,
		effect: 'fade',
		loop: true,  
		autoplay: {
		  delay: 4000,
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
				document.querySelector('.swiper-banner .banner-progress svg').style.setProperty("--progress", 1 - progress)
			}
		}
	})

	var bannerSwiper1 = new Swiper(".swiper-banner1", {
		speed: 300,
		effect: 'fade',
		loop: true,  
		autoplay: {
		  delay: 4000,
		  disableOnInteraction: false,	
		},
		pagination: {
			el: ".swiper-banner1 .swiper-pagination",
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
				document.querySelector('.swiper-banner1 .banner-progress svg').style.setProperty("--progress", 1 - progress)
			}
		}
	})

	var bannerSwiper2 = new Swiper(".swiper-banner2", {
		speed: 300,
		effect: 'fade',
		loop: true,  
	})

  bannerSwiper1.controller.control = bannerSwiper2;
  bannerSwiper2.controller.control = bannerSwiper1;

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
            bannerSwiper0.autoplay.stop();
            bannerSwiper1.autoplay.stop();
            bannerSwiper2.autoplay.stop();
        } else {
            bannerSwiper0.autoplay.start();
            bannerSwiper1.autoplay.start();
            bannerSwiper2.autoplay.start();
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