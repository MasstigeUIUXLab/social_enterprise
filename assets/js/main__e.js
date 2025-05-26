"use strict";
$(document).ready(function() {
	// $('#indexContainer').fullpage({
	// 	licenseKey: 'F67168A3-4AB64A38-A211B922-2DB1C3AC',
	// 	sectionSelector: '.main-section',
	// 	easing: 'easeInOutCubic',
	// 	easingcss3: 'ease',
	// 	scrollingSpeed: 1000,
	// 	navigation: false,
	// 	controlArrows: false,
	// 	anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
	// 	responsiveWidth: 1401,
	// 	afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
	// 		if(anchorLink == 'fifthSection' && slideIndex == 1) {
	// 			$.fn.fullpage.setAllowScrolling(false, 'up');
	// 		}
	// 	},
	
	// 	onSlideLeave: function( anchorLink, index, slideIndex, direction) {
	// 		if(anchorLink == 'fifthSection' && slideIndex == 1) {
	// 			$.fn.fullpage.setAllowScrolling(true, 'up');
	// 		}
	// 	} 
	// }); 
	
	$('#indexContainer').fullpage({
		licenseKey: 'F67168A3-4AB64A38-A211B922-2DB1C3AC',
		sectionSelector: '.main-section',
		easing: 'easeInOutCubic',
		easingcss3: 'ease',autoScrolling: true,
		scrollingSpeed: 1000,
		navigation: true,
		controlArrows: false,
		anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
		responsiveWidth: 1401,
		'afterLoad': function( anchorLink, index, slideAnchor, slideIndex) {
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(false, 'up');
			}
			focusTrapping();
		},
	
		'onLeave': function( anchorLink, index, slideIndex, direction) {	
			if(anchorLink == 'fifthSection' && slideIndex == 1) {
				$.fn.fullpage.setAllowScrolling(true, 'up');
			}
		} 
	}); 
	
	// 작업중
	setTimeout(()=> $('#fp-nav li').eq(1).find('a').css('border', '2px solid red').click(),2000)
	setTimeout(()=> $('#fp-nav li').eq(1).find('a').css('border', '2px solid blue').trigger('click'),2000)

	function focusTrapping(){
		const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
		let activeSection = $('.main-section').filter('.active');
		let focusableContent = $(activeSection).find(focusableElements);
		let firstFocusableElement = focusableContent[0];
		let lastFocusableElement = focusableContent[focusableContent.length - 1];
		
		console.log(focusableContent);
		console.log(firstFocusableElement);
		console.log(lastFocusableElement);
		console.log(activeSection.index());

		$(activeSection).on('keydown', function(e){
			let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
			
			if( !isTabPressed ){ return; }
			
			if( e.shiftKey ){
				if( document.activeElement === firstFocusableElement ){
					console.log('첫번째요소에서		 역순');
					$('#fp-nav li').eq(activeSection.index()-1).find('a').css('border', '2px solid red').click();
					console.log($(activeSection).index);
					// lastFocusableElement.focus();
					// e.preventDefault();
				}
			}else{
				if( document.activeElement === lastFocusableElement ){
					console.log('마지막요소에서 탭');
					$('#fp-nav li').eq(activeSection.index()+1).find('a').css('border', '2px solid red');

					$('.btn-5').click();
					// $.fn.fullpage.moveSectionDown();		
					// $.fn.fullpage.fitToSection();
					// $.fn.fullpage.moveSectionDown();
					// firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		});
	}
	
   // 작업중

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