/* 

Vanilla Template

https://templatemo.com/tm-526-vanilla

*/

jQuery(document).ready(function($) {

	'use strict';

    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'}); // better use CSS

    $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });


    $('body').scrollspy({ 
        target: '.fixed-side-navbar',
        offset: 200
    });
      
      // smoothscroll on sidenav click

    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    })

    var owl = $("#owl-testimonials");

      owl.owlCarousel({
        
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        items : 3, //10 items above 1000px browser width
        itemsDesktop : [1000,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        
    });


});

var lat, long;
var key = "e52afb63b0abe83979821f768872d5f3";

function getLocation() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      // $('#country').html(location.country_name);
      // $('#state').html(location.state);
      $('#city').html("City : " + location.city);
      lat = location.latitude
      long = location.longitude
      // $('#ip').html(location.IPv4);

      getWeatherByCity(location.city);
    }
  });
}

function getWeatherByLatLong(city) {
  var link = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + key;
  getWeather(link, city);
}

function getWeatherByCity(city) {
  var link = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": link,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    lat = response.coord.lat;
    long = response.coord.lon;
    getWeatherByLatLong(response.name)
  })
  .fail(function(response) {
    alert("City not found");
    return;
  });
}

function getWeather(link, cityName) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": link,
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    var dailyWeather = response.daily[0].weather[0];
    var dailyTemp = response.daily[0].temp;
    $('#city').html("City : " + cityName);
    $('#weather').html("Weather : " + capitalizeFirstLetter(dailyWeather.description));
    var videoFile = "video/" + dailyWeather.main + ".mp4";
    $('#myVideo source').attr('src', videoFile);
    $('#myVideo')[0].load();
    $('#morningTemp').html("Morning : " + dailyTemp.morn + "&#8451;");
    $('#dayTemp').html("Day : " + dailyTemp.day + "&#8451;");
    $('#eveningTemp').html("Evening : " + dailyTemp.eve + "&#8451;");
    $('#nightTemp').html("Night : " + dailyTemp.eve + "&#8451;");
  });
}


function checkOtherCity() {
  var city = $('#cityname').val();
  getWeatherByCity(city);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showFormCheckCity() {
  $( "#checkCity" ).fadeOut( "fast", function() {
    $('#cityname').fadeIn();
    $('#submitCheckCity').fadeIn();
    $('#checkYourCity').fadeIn();
  });
}
