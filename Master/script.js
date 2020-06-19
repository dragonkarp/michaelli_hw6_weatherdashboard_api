// OpenWeather API key: f64d6d31f15458727f791647df068f9b
// OpenWeather API URL for current day weather: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// OpenWeather API ULR for UV index: http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// OpenWeather API ULR for 5 day forecast: api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={your api key}

//TEST AREA//////////////////////////////
//getCurrentWeatherData("Chicago")
//getCurrentWeatherData("New York")
//getUV_Index(41.85, -87.65) 
// getFiveDayForecast(4887398)
//TEST AREA//////////////////////////////


/////////START OF THE PROGRAM//////////////

// AJAX call to OpenWeather API for the current date's weather information.
// Using dynamically generated Bootstrap cards.
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

        var currentWeatherTemp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "°F")
        var currentWeatherHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%")
        var currentWeatherWindSpeed = $("<p>").addClass("card-text").text("Wind Speed:  " + response.wind.speed + " MPH")

        //currentWeatherTopInfo.append(currentWeatherCityName + currentDate + currentWeatherIcon) -_-' bad code
        var currentWeatherTopInfo = $("<h4>").addClass("card-title").text(response.name + " " + moment().format("   (dddd, MMMM Do)  ") + currentWeatherIcon)

        currentWeatherBodyDiv.append(currentWeatherTopInfo)
        currentWeatherBodyDiv.append(currentWeatherTemp, currentWeatherHumidity, currentWeatherWindSpeed)
        currentWeatherMainCard.append(currentWeatherBodyDiv)
        $("#today").append(currentWeatherMainCard)

        getUV_Index(response.coord.lat, response.coord.lon)

        getFiveDayForecast(response.id)
      }
    });
}

function getUV_Index(latitude, longitude) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=f64d6d31f15458727f791647df068f9b&lat=" + latitude + "&lon=" + longitude, 
        dataType: "json",
        success: function(response){
            var uvIndex = $("<span>").text(response.value)
            var uvTextAndContainer = $("<p>").text("UV Index: ").append(uvIndex)


            if (response.value < 3) {
                uvIndex.addClass("badge badge-success")
            } else if (response.value < 7) {
                uvIndex.addClass("badge badge-warning")
            } else if  (response.value > 6){
                uvIndex.addClass("badge badge-danger")
            }

            $("#today .card-body").append(uvTextAndContainer) // I guessed this. Don't know why it works. 
        }
    });
}

function getFiveDayForecast(cityID) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + "f64d6d31f15458727f791647df068f9b&units=imperial",
        type: "GET",
        datatype: "json",
        success: function(response) {
            return;
        }
    }).then(response => {
        // Prepares the container for the forecast cards to be appended to. 
        $("#forecast").empty()
        $("#forecast").append($("<h3>").text("5 Day Forecast:"))
        $("#forecast").append($("<div>").addClass("row row-of-cards"))

        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){ 
                // Create the card.
                var columnForCard = $("<div>").addClass("col-md-2")
                var card = $("<div>").addClass("card bg-primary text-white")
                var body = $("<div>").addClass("card-body p-3")

                // Store the API data.
                    // I could not figure out how to 
                    // var forecastIcon = response.weather[0].icon
                    // console.log(forecastIcon)
                var forecastDate = new Date(response.list[i].dt_txt).toLocaleDateString()
                var forecastTemp = response.list[i].main.temp
                var forecastHumidity = response.list[i].main.humidity
               
                
                // Append data to tags.
                body.append(forecastDate, $("<br>"),  $("<br>"), "Temp: " + forecastTemp + "°F", $("<br>"), "Humidity: " + forecastHumidity + "%")
                columnForCard.append(card.append(body))
                $(".row-of-cards").append(columnForCard)
            }
        }
    })
}

// Listens to the search button.
// Clears the input box when a search is performed.
$("#search-button").on("click", function(){
    var place = $("#search-value").val()
    $("#search-value").text("") // Don't know why this doesn't work.
    getCurrentWeatherData(place)
    makePreviouslySearchedButton(place)
});


// Take a string of the searched place and makes a button for it below the text bar. 
function makePreviouslySearchedButton(previouslySearchedPlace) {
    var searchedPlace = $("<li>").addClass("list-group-item list-group-item-action").text(previouslySearchedPlace)
    $(".history").append(searchedPlace)
}

// Listens to buttons of historical searches(the specified <li> tag).
// WARNING: NOT YET FULLY FUNCTIONAL!!!
// $(".history").on("click", "li", function() {
//     var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
//     $(".history").append(li);
// });
// /////////END OF PROGRAM//////////////




// getFiveDayForecast(4887398)

//////////////QUESTIONS FOR PHIL///////////////////
// var arr = [0,1,2,3,4,5]
// var newArr=arr.map(num=>{
//    return num+1
//})
//1) I wanted to practice using cards and noticed that in the documentation on BootStrap, the 
//cards are not responsive, but they are. So I'm a little confused about that. It's in the 
//layout section of the card component section. 
//2) In getCurrentWeatherData(city) I am trying to put the icon in a div. it will nto display. 
//////////////QUESTIONS FOR PHIL///////////////////


// parse date
// figure out image
// confirm console.logs are correct
// build html
// populate html

// use to test forecast function loop
// console.log("begin " + i)
            // console.log("hello: --> " + response.list[i].dt_txt) //learn how to use the Date object. youtube it. 
            // // console.log(response.weather[0].icon)  //I need to find a way to output this image file
            // console.log(response.list[i].main.temp)
            // console.log(response.list[i].main.humidity)
            // var tr = new Date(response.list[i].dt_txt).toLocaleDateString() //I looked this function up, but don't know how it works. I couldn't find the implementation. I have no idea if it requires a specific format and the one I am working with just happens to be correct, or if the functions implementation is powerful enough to handle all kinds. Ask in office hours. 
            // console.log(tr)
            // console.log("end " + i)