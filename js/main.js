
 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";

	
	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();



	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();


	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');

   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 50
      }, 600, 'easeInOutExpo', function() {
        // window.location.hash = hash;

      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

//   // Stellar
//   $(window).stellar({
//   	horizontalScrolling: false,
//     responsive: true,
//   });




	 var siteIstotope = function() {
  	/* activate jquery isotope */
	  var $container = $('#posts').isotope({
	    itemSelector : '.item',
	    isFitWidth: true
	  });

	  $(window).resize(function(){
	    $container.isotope({
	      columnWidth: '.col-sm-3'
	    });
	  });
	  
	  $container.isotope({ filter: '*' });

	    // filter items on button click
	  $('#filters').on( 'click', 'button', function(e) {
	  	e.preventDefault();
	    var filterValue = $(this).attr('data-filter');
	    $container.isotope({ filter: filterValue });
	    $('#filters button').removeClass('active');
	    $(this).addClass('active');
	  });
  }

  siteIstotope();

});


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAi7XpZN5fXEZHtWD_iWqKsWN1PwX11zsM",
    authDomain: "sara-contact-form.firebaseapp.com",
    databaseURL: "https://sara-contact-form.firebaseio.com",
    projectId: "sara-contact-form",
    storageBucket: "sara-contact-form.appspot.com",
    messagingSenderId: "935236623085",
    appId: "1:935236623085:web:c247e90b717620362f8ae4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// Reference messages collection
 var messagesRef = firebase.database().ref('messages');


//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// submit form 
function submitForm(e){
e.preventDefault();
console.log(123);

//Get Value
var firstName = getInputVal("firstName");
var lastName = getInputVal("lastName");
var email = getInputVal("email");
var message = getInputVal("message");
// console.log(firstName + " " + lastName +" "+ email + " "+ message);

//save massage
saveMessage(firstName, lastName, email, message);

// show alart
document.querySelector('.alart').style.display= "block";
document.querySelector('#firstName').style.display= "none";
document.querySelector('#lastName').style.display= "none";
document.querySelector('#email').style.display= "none";
document.querySelector('#message').style.display= "none";
document.querySelector('#submit').style.display= "none";
// document.querySelector("#firstName, #lastName, #email, #message, #submit").style.display= "none";

// Hide alart after 3 second 
setTimeout(function(){
	document.querySelector('.alart').style.display= "none";
	document.querySelector('#firstName').style.display= "block";
	document.querySelector('#lastName').style.display= "block";
	document.querySelector('#email').style.display= "block";
	document.querySelector('#message').style.display= "block";
	document.querySelector('#submit').style.display= "block";
}, 3000);

 //clear from
	document.getElementById('contactForm').reset();
}

// function to get  form value 
function getInputVal(id){
	return document.getElementById(id).value;
}

// save massage to firebase
function saveMessage(firstName, lastName, email, message){
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		firstName : firstName,
		lastName : lastName,
		email : email,
		message : message
	});

}
