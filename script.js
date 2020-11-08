$(document).ready(function () {
    //On page load hide right container
    //$("#right-container").addClass('hidden');


    const WeatherAPIKey = "5bb3a5739d78e8deccb5b36c764be06d";

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory === null) {
        searchHistory = [];
    }

    //Check for cities searched in local storage and display in city list container
    // if (searchHistory == "") {


    //On click of search button
    $("#search-button").on('click', function () {
        // $("#right-container").removeClass('hidden');
        //get users input cityName
        const userInput = $("#search-text").val();
        //show all weather data
        getWeatherData(userInput);
        //store in local
        searchHistory.push(userInput);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        //render button
        //use the local data array search history and render buttons
        for (let i = 0; i < searchHistory.length; i++) {
            //create button tempalte
            let btnMarkUp = `<button class="btn btn-dark rounded" "cityname="${searchHistory[i]}">${searchHistory[i]}</button>`;
            //add button to container for btns
            $("#cities-list").html(btnMarkUp);
            //add event listener to it
            $(`[cityname="${searchHistory[i]}]"`).on("click", getWeatherData(searchHistory[i]));
        }
    });

    const getWeatherData = (cityName) => {
        const userChoiceURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherAPIKey}`;
        //Pull Current Day data from weather api
        $.ajax({
            url: userChoiceURL,
            method: "GET"
        }).then(function (res) {

            console.log("current weather: ", res);
            //Check if user input is valid city if not alert "enter a valid city name"
            //Display Current Day Data: Temp, Humidity, Wind Speed, UV

            //wrtie th markup which is a string
            const curentMarkUp =
                `
                <div id="current-day" class="border rounded">
                    <h2>
                        <span>${res.name}</span>
                        <span>(${new Date().toLocaleDateString()})</span>
                        <span><img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                    </h2>
                    <p>Temperature: ${res.main.temp}F</p>
                    <p>Humidity: ${res.main.humidity}%</p>
                    <p>Wind Speed: ${res.wind.speed}MPH</p>
                </div>
            `;

            //we convert the markup string into html then add it to the page
            $("#current-day").html(curentMarkUp);

            const forcastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WeatherAPIKey}`;
            //Pull Current Day data from weather api
            $.ajax({
                url: forcastURL,
                method: "GET"
            }).then((res) => {
                console.log("forecast data: ", res);

                //create the forcast markup 
                //wrtie th markup which is a string
                let forcastMarkUp = "";

                for (let i = 0; i < res.list.length; i++) {
                    //check for specific time
                    if (res.list[i].dt_txt.indexOf("12:00:00") > -1) {
                        forcastMarkUp +=
                            `
                                <div class="col-2 border">
                                    <p>Date: ${new Date().toLocaleDateString()}</p>
                                    <img src="http://openweathermap.org/img/w/${res.list[i].weather[0].icon}.png"/>
                                    <p>Temp: ${res.list[i].main.temp}</p>
                                    <p>Humidity: ${res.list[i].main.humidity
                            }%</p >
                                </div >
                            `;
                    }
                }

                //we convert the markup string into html then add it to the page
                $("#forcast-container-1").html(forcastMarkUp);
                //then show it on the page

                //do uVindex here ----------------
            });
        });
    }

    //Pull 5 Day Forecast from weather api
    //Display 5 Day Forecast with weather data for each day

    // On click of Recently Searched cities display said city weather

});