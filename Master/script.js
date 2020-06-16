// OpenWeather API key: f64d6d31f15458727f791647df068f9b
// OpenWeather API URL for current day weather: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// OpenWeather API ULR for UV index: http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// OpenWeather API ULR for 5 day forecast: api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={your api key}


//TEST AREA//////////////////////////////
//getCurrentWeatherData("Chicago")
getCurrentWeatherData("Chicago")
//getUVIndex(41.85, -87.65)
getUV_Index(41.85, -87.65) 
//TEST AREA//////////////////////////////




// // Listens to the search button.
// // Clears the input box when a search is performed.
// $(document).ready(function() {
//     $("#search-button").on("click", function(){
//         var place = $("#search-value").val()
//         $("#search-button").val() = ""
//     });
// });


// // Take a string of the searched place and makes a button for it below the text bar. 
// function makePreviouslySearchedButton(previouslySearchedPlace) {
//     var searchedPlace = $("<li>").addClass("previously-searched previously-searched-event").text(previouslySearchedPlace)
//     $(".history").append(searchedPlace)
// }

// // Listens to buttons of historical searches.
// // Calls getWeatherData to retrieve information.
// $(".history").on("click", "li", function() {
//     return
// });


// AJAX call to OpenWeather API for the current date's weather information.
// Using dynamically generated Bootstrap cards
function getCurrentWeatherData(city) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f64d6d31f15458727f791647df068f9b&units=imperial",
      dataType: "json",
      success: function(response) {
        $("#today").empty();

        var currentWeatherMainCard = $("<div>").addClass("card") 
        var currentWeatherBodyDiv = $("<div>").addClass("card-body")
        var currentWeatherIcon = $("<div>").append(response.weather.icon)

        var currentWeatherTemp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "F")
        var currentWeatherHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%")
        var currentWeatherWindSpeed = $("<p>").addClass("card-text").text("Wind Speed:  " + response.wind.speed + " MPH")

        //currentWeatherTopInfo.append(currentWeatherCityName + currentDate + currentWeatherIcon) -_-' bad code
        var currentWeatherTopInfo = $("<h4>").addClass("card-title").text(response.name + " " + moment().format("   (dddd, MMMM Do YYYY)") + currentWeatherIcon)

        currentWeatherBodyDiv.append(currentWeatherTopInfo)
        currentWeatherBodyDiv.append(currentWeatherTemp, currentWeatherHumidity, currentWeatherWindSpeed)
        currentWeatherMainCard.append(currentWeatherBodyDiv)
        $("#today").append(currentWeatherMainCard)

      }
    });
  }
var xyz = moment().format("   (dddd, MMMM Do YYYY)")
console.log(xyz)


function getUV_Index(latitude, longitude) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=f64d6d31f15458727f791647df068f9b&lat=" + latitude + "&lon=" + longitude, 
        dataType: "json",
        success: function(response){
            var uvIndex = $("<span>").text(response.value)

            if (response.value < 3) {
                uvIndex.addClass("badge badge-success")
            } else if (response.value < 7) {
                uvIndex.addClass("badge badge-warning")
            } else if  (response.value > 6){
                uvIndex.addClass("badge badge-danger")
            }

            $("#today .card-body").append(uvIndex) // I guessed this. Don't know why it works. 
        }
    });
}

function getFiveDayForecast(cityID) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + "f64d6d31f15458727f791647df068f9b",
        type: "GET",
        datatype: "json",
        success: function(response) {
            return;
        }
    })
}
//http://api.openweathermap.org/data/2.5/forecast?id=4887398&appid=f64d6d31f15458727f791647df068f9b
getFiveDayForecast(4887398)



//////////////QUESTIONS FOR PHIL///////////////////
//1) I wanted to practice using cards and noticed that in the documentation on BootStrap, the 
//cards are not responsive, but they are. So I'm a little confused about that. It's in the 
//layout section of the card component section. 
//2) In getCurrentWeatherData(city) I am trying to put the icon in a div. it will nto display. 
//////////////QUESTIONS FOR PHIL///////////////////