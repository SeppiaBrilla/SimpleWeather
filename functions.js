var meteo = 0

$(function() {
    $("#citta").val("Inserisci qua la città");
    $("#citta").click(function(){
        if($("#citta").val() == "Inserisci qua la città" || $("#citta").val() == "città non trovata"){
            $("#citta").val("")
        }
    });

    $("#meteo").hide();

    $('#citta').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            populate();
        }
    });
    $("#buttonID").click(function() {
        populate();
    });
});


populate = function(){
    if ($("#citta").val() == "" || $("#citta").val() == "Inserisci qua la città" || $("#citta").val() == "città non trovata"){
        $("#citta").val("Inserisci qua la città");
        return;
    }

    reset();

    let citta =  $("#citta").val().replace(" ", "+");;
    $.ajax({
    type:'GET',
    url:'https://api.openweathermap.org/data/2.5/weather?q=' + citta + '&appid=bd094daae439815755d3f411dff2762b',
    success : function(Data){
        meteo = Data; 
        $("#general").text(meteo.weather[0].main);
        main = meteo.main;
        
        addElement("#temp",parseInt(convertKelvinToCelsius(main.temp)));

        addElement("#temp_p",parseInt(convertKelvinToCelsius(main.feels_like)));
    
        addElement("#min",parseInt(convertKelvinToCelsius(main.temp_min)));
        addElement("#max",parseInt(convertKelvinToCelsius(main.temp_max)));

        $("#pressure").text(main.pressure + " hPa");
        $("#humidity").text(main.humidity + " %");

        $("#meteo").fadeIn();
    },
    error : function(Data){
        $("#citta").val("città non trovata");
        $("#citta").addClass("errore");
        $("#meteo").fadeOut();
    }
    });
}

reset =function(){
    $("#meteo").hide();
    $("#temp").removeClass("hot");
    $("#temp").removeClass("cold");
    $("#temp").removeClass("ok");
    $("#temp_p").removeClass("hot");
    $("#temp_p").removeClass("cold");
    $("#temp_p").removeClass("ok");
    $("#min").removeClass("hot");
    $("#min").removeClass("cold");
    $("#min").removeClass("ok");
    $("#max").removeClass("hot");
    $("#max").removeClass("cold");
    $("#max").removeClass("ok");
    $("#citta").removeClass("errore");
}

addElement = function(element, value){

    if(value > 25){
        $(element).addClass("hot");
    }else if (value < 18){
        $(element).addClass("cold");
    }
    else{
        $(element).addClass("ok");
    }

    $(element).text(value + " °C");
}

function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'below absolute zero (0 K)';
	} else {
		return (kelvin-273.15);
	}
}
