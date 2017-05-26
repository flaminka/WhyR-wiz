/*

funkcja do generowania ekranu glownego z zakladki "Why R? 2017"

*/


var stworzEkranGlowny = function(){

			/***** obszar rysowania *****/


			// marginesy wykresu
            var margin = {top: 60, right: 60, bottom: 10, left: 60};

            // wielkosc wykresu 
            var width = 980 - margin.left - margin.right,
                height = 650 - margin.top - margin.bottom; 

			// caly wykres
			var svg_start=d3.select("#chart_ekranGlowny")  
			        .append("svg")
			        .attr("width", width + margin.left + margin.right)
			        .attr("height", height + margin.top + margin.bottom)
			        .attr("id","svg_ekranGlowny")


			// obszar rysowania
			var g_start= svg_start.append("g")
			        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			        

			// teksty      

			g_start.append("text")
			.attr("x", width/2)
			.attr("y", 0)
			.text("Why R 2017?")
			.style("font-size", "40px")
			.attr("text-anchor", "middle")


			g_start.append("text")
			.attr("x", width/2)
			.attr("y", 50)
			.text("Ogólnopolska konferencja entuzjastów pakietu statystycznego R")
			.style("font-size", "20px")
			.attr("text-anchor", "middle")

			g_start
			.append("a")
			.attr("xlink:href", "http://whyr.pl/")
			.append("text")
			.attr("x", width/2)
			.attr("y", 90)
			.text("oficjalna strona www: http://whyr.pl/")
			.style("font-size", "15px")
			.attr("text-anchor", "middle")

			g_start
			.append("text")
			.attr("x", width/2)
			.attr("y", 180)
			.text("Wizualizacja danych z ankiet rejestracyjnych")
			.style("font-size", "30px")
			.attr("text-anchor", "middle")


			// opis

			var opis =g_start
			.append("text")
			.attr("x", 0)
			.attr("y", 230)
			.style("font-size", "15px")
			.attr("dy",0);

			opis.append("tspan").attr("x",0).attr("dy", ".6em").text("Aby wziąć udział w konferencji Why R? 2017 należy zarejestrować się poprzez stronę whyr.pl. Przy rejestracji przyszły uczestnik konferencji")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("proszony jest o wypełnienie formularza zawierającego zarówno pola informacyjne (imię, nazwisko, mail, rok urodzenia, płeć, stopień naukowy,")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("miasto) jak i dodatkowe, opisujące jego doświadczenie związane z analizą i przetwarzaniem danych.")



			opis.append("tspan").attr("x",0).attr("dy", "3em").text("Wśród pól dodatkowych można znaleźć takie pola jak: obecne stanowisko, tematyka, którą się zajmuje, tematyka, którą się interesuje")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("(ankietowany ma możliwość wyboru spośród podanych 25 tematów lub podać własny), jak również technologie używane na co dzień czy też")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("doświadczenie w analizach i pakiecie R podawane w latach. Informacje te zostały podsumowane na infografice dostępnej w zakładce")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text('"infografika".')



			opis.append("tspan").attr("x",0).attr("dy", "3em").text("Dodatkowo uczestnik konferencji może zapisać się na 2 warsztaty (poranny i popołudniowy), przedstawiające różnorodne zastosowania")

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text('pakietu R. W zakładce "warsztaty" została umieszczona wizualizacja, dzięki której można zorientować się jakie grupy uczestników wybrały')

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("dany warsztat i które warsztaty cieszą się największą popularnością.")



			opis.append("tspan").attr("x",0).attr("dy", "3em").text('Ostatnia zakładka "pakiety" przedstawia odpowiedzi ankietowanych na pytanie otwarte dotyczące używanych przez nich na co dzień pakietów')

			opis.append("tspan").attr("x",0).attr("dy", "1.2em").text("R-owych.")


			// autor

			g_start
			.append("text")
			.attr("x", width-margin.left)
			.attr("y", height)
			.text("Autor: Ewa Baranowska, KN Data Science PW")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")

};

