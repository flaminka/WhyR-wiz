/*

funkcja do generowania wykresu w zakladce "warsztaty"

korzysta z danych z warsztatyDane.js

*/

var stworzWykresWarsztaty = function(){




              
              /***** obszar rysowania *****/

              // marginesy wykresu
              var margin = {top: 140, right: 60, bottom: 60, left: 60};

              // wielkosc wykresu
              var width = 980 - margin.left - margin.right,
                  height = 1620 - margin.top - margin.bottom; // wysokosc wykresu przy rozwinieciu statystyk

              // wysokosc wykresu przy zwinieciu statystyk, na starcie
              var heightStart = 750 - margin.top - margin.bottom;

              // caly wykres
              var svg=d3.select("#chart_warsztaty")  
                      .append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", heightStart + margin.top + margin.bottom)
                      .attr("id", "svg_warsztaty")

              // obszar rysowania
              var g = svg.append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                      .attr( "xmlns",'xlink="http://www.w3.org/1999/xlink"')


               /***** tytuly, zrodlo, pomoc, generowanie... *****/

               
              var tytulik = "Warsztaty na konferencji Why R? 2017";
              var podtytulik = "Typowe ścieżki oraz profile uczestników warsztatów";



              var ile_rano = daneWarsztaty.filter(function(d){ return d.sesja == "sesja poranna"; }).length

              var paddingBox = 10; // miedzy rect w pionie
              var heightBox = d3.min([(height-(ile_rano-1)*paddingBox)/9, 50]);
              var heightBox2 =  150;
              var paddingBlock = 150; // miedzy rect w poziomie
              var widthBox = (width-paddingBlock)/2;
              var paddingRect = 10; // w srodku rect

              var dlugoscZajetosci = widthBox/2 // dlugosc maxymalna w pikselach paska zajetosci
              var dlugoscStatystyki = widthBox*1/6 // dlugosc maxymalna w pikselach paska w histogramie
              //********************************************************************************* SKALE

              var warsztaciki = d3.nest()
                                      .entries(daneWarsztaty)
                                      .map(function(d){return d.warsztat;})

              var skalaKolor = d3.scale.category10(); 

              skalaKolor.domain(warsztaciki);



              var skalaZajete = d3.scale.linear();
                  skalaZajete.domain([0,20])
                  skalaZajete.range([0, dlugoscZajetosci])

              var skalaStatystyki = d3.scale.linear();
                  skalaStatystyki.domain([0,100])
                  skalaStatystyki.range([1, dlugoscStatystyki])


             
 //********************************************************************************* TYTUŁY, ŹRÓDŁO

              var tytuly = svg.append("g")
                               .attr("class", "tytuly")

              var tytul = tytuly.append("text")
                            .attr("x", margin.left)             
                            .attr("y", (margin.top)*(1/4))
                            .style("font-size", "28px")  
                            .text(tytulik);

              var podtytul = tytuly.append("text")
                            .attr("x", margin.left)             
                            .attr("y", (margin.top)*(2/4))
                            .style("font-size", "16px")  
                            .text(podtytulik);

              var zrodlo = tytuly.append("text")
                            .attr("x", margin.left)             
                            .attr("y", heightStart+margin.top+ margin.bottom*(2/3))
                            .style("font-size", "10px") 
                            .text("Źródło: Why R? 2017 - ankiety");

              /*var autor = tytuly.append("text")
                            .attr("x", margin.left+ width)         
                            .attr("y", heightStart+margin.top+ margin.bottom*(2/3))
                            .attr("text-anchor", "end")
                            .style("font-size", "8px")
                            .text("Autor: Ewa Baranowska, KN Data Science PW");


              */


              var pomoc = svg.append("g").attr("class", "pomoc")
                            .attr("transform","translate(0,10)")

               var pomoc_kolko =    pomoc.append("circle")
                                      .attr("cx", margin.left+widthBox)             
                                      .attr("cy", (margin.top)*(1/3))
                                      .attr("r", 10)
                                      .attr("fill", "white")
                                      .style("stroke", "grey")
                                      .style("stroke-width", "2px")

                var pomoc_tekst =   pomoc.append("text")
                                      .attr("x", margin.left+widthBox)             
                                      .attr("y", (margin.top)*(1/3)+6)
                                      .style("stroke", "none")
                                      .style("fill", "grey")
                                      .text("?")
                                      .attr("text-anchor", "middle")
                                      .style("font-size", "18px")
                                      .style("font-weight", "bold")
                                      .style("pointer-events", "none")

              var tooltipki0=d3.select("#chart_warsztaty").append("div").attr("id", "tooltip0").style("opacity",0)

                pomoc_kolko.on("mouseover",function(d){
                  
                   d3.select(this).style("stroke", "red")
                    pomoc_tekst.style("fill", "red")

                     tooltipki0.html( "<b>" + "Szczegóły" +"</b>" + "<br/>"+
                       "" +"<br/>"+
                       "Każdy uczestnik konferencji może zapisać się na 2 warsztaty:"  + "<br/>"+
                       "jeden poranny, drugi popołudniowy. Ścieżki między warsztatami" + "<br/>"+ 
                       "pokazują jaki warsztat popołudniowy wybierały najczęściej"  + "<br/>"+
                       "osoby z danego warsztatu porannego."+ "<br/>"+
                       ""  + "<br/>"+
                       "Liczby podane po plusie przy popularności warsztatu oznaczają" + "<br/>"+
                       "liczbę osób na liście rezerwowej." + "<br/>"+
                       "" + "<br/>"+
                       "Kliknięcie na nazwę warsztatu powoduje przejście do strony" + "<br/>"+
                       "z informacjami nt. tego warsztatu."


                         )
                    .style("left", d3.event.pageX + "px") /* ustalamy pozycje elementu tam gdzie zostanie akcja podjeta */
                    .style("top", d3.event.pageY + "px")
                    .transition()
                    .duration(300)
                    .style("opacity",1);
                })
                .on("mouseout", function(d){

                    d3.select(this).style("stroke", "grey")
                    pomoc_tekst.style("fill", "grey")


                    tooltipki0
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                            
                })
                               




              //********************************************************************************* TWORZENIE PROSTOKĄTA

              //**************************************************************************** tworzenie stringa z _ zamiast spacji

              var podkreslString = function(s){

                      s = s.replace(/ę/ig,'e');
                      s = s.replace(/ż/ig,'z');
                      s = s.replace(/ó/ig,'o');
                      s = s.replace(/ł/ig,'l');
                      s = s.replace(/ć/ig,'c');
                      s = s.replace(/ś/ig,'s');
                      s = s.replace(/ź/ig,'z');
                      s = s.replace(/ń/ig,'n');
                      s = s.replace(/ą/ig,'a');
                      s = s.replace(/:/ig,"");
                      s = s.replace(/\./ig,"");
                      s = s.replace(/\+/ig,"");
                      s = s.replace(/\=/ig,"");
                      s = s.replace(/\-/ig,"");
                      s = s.replace(/\,/ig,"");
                      s = s.split(' ').join("_");

                  return s;
              }



              var sesja_rano = g.append("g").attr("class", "warsztaty rano")

                  sesja_rano.append("text")
                            .attr("x", widthBox/2)             
                            .attr("y", -paddingBox*2)
                            .text("sesja poranna")
                            .style("text-anchor", "middle")
                            .attr("class", "labelka")

               var   sesja_rano_grupy = sesja_rano.selectAll("g")
                                    .data(daneWarsztaty
                                      .filter(function(d){ return d.sesja == "sesja poranna"; })
                                      .sort(function(x, y){
                                                     return d3.descending(x.ile, y.ile);
                                                  }))
                                    .enter()
                                    .append("g")
                                    .attr("class", function(d){return podkreslString(d.warsztat) + " glowna";})
                                    .attr("transform", function(d,i){return "translate(" + 0 + "," + (i*(heightBox + paddingBox)) + ")"});


                sesja_rano_grupy.append("rect")
                                        .style("stroke", "black")
                                        .attr("height", heightBox)
                                        .attr("width",widthBox)
                                        .style("fill", "none")
                                        .attr("class", function(d){return podkreslString(d.warsztat) + " glowna";})
                                        .style("stroke", function(d){ return skalaKolor(d.warsztat); })


                  sesja_rano_grupy.append("a")
                            .attr("xlink:href",function(d){return d.url;})
                            .append("text")
                            .attr("x", paddingRect)             
                            .attr("y", paddingRect*3/2)
                            .text(function(d){return d.warsztat;})
                            .attr("class", "warsztat_nazwa")


               var labelWiecej_rano = sesja_rano_grupy
                                .append("text")
                                .attr("x", widthBox - 4*paddingRect)             
                                .attr("y", paddingRect*3/2)
                                .text("więcej...")
                                .style("font-size","9px")
                                .style("stroke","none")
                                .style("fill","grey")

              // zajetosc

              var sesja_rano_zajetosc = sesja_rano_grupy.append("g")
                                  .attr("class", "zajetosc")
                                  .attr("transform","translate("+paddingRect+","+heightBox*6/10+")")

              sesja_rano_zajetosc.append("text")
                                  .text("popularność:")
                                  .attr("y", paddingRect)

                sesja_rano_zajetosc.append("text")
                                  .attr("x", widthBox - 2*paddingRect)             
                                  .text(function(d){
                                          if(d.ile_rezerwa ==0){ return "";} 
                                          else{
                                            return "+"+d.ile_rezerwa;
                                          }
                                  })
                                  .style("text-anchor", "end")
                                  .attr("y", paddingRect)


                  sesja_rano_zajetosc.append("text")
                                  .attr("x", widthBox - 2*paddingRect-20)             
                                  .text(function(d){
                                          return (d.ile-d.ile_rezerwa) + "/20"
                                  })
                                  .style("text-anchor", "end")
                                  .attr("y", paddingRect)


                  sesja_rano_zajetosc.append("rect")
                                        .attr("x", widthBox/4)             
                                        .style("stroke", "black")
                                        .style("stroke-width", "0.5px")
                                        .attr("height", heightBox*1/5)
                                        .attr("width",skalaZajete(20))
                                        .style("fill", "#ebebe0")

                  sesja_rano_zajetosc.append("rect")
                                        .attr("x", widthBox/4)             
                                        .style("stroke", "black")                          
                                        .style("stroke-width", "0.5px")
                                        .attr("height", heightBox*1/5)
                                        .attr("width",function(d){   return skalaZajete(d.ile - d.ile_rezerwa);})
                                        .style("fill", "#a7e3ef")  //#FFFF81

              // statystyki




              dodajStatystyki = function(sesja_grupy){

                var paddingSlupki = 5;

                var sesja_statystyki = sesja_grupy.append("g")
                                  .attr("class", "statystyki")
                                  .attr("transform", "translate("+paddingRect+","+(heightBox+paddingRect*3)+")")

              // doswiadczenie w R

               var sesja_statystyki_doswR =   sesja_statystyki.append("g")           
                                  .attr("class", "doswiadczenieR")


                  sesja_statystyki_doswR
                                  .append("rect")
                                  .attr("x", function(d) {return widthBox/4 - skalaStatystyki(d.analizy_R_0_2);})          
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_R_0_2);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

                  sesja_statystyki_doswR
                                  .append("rect")
                                  .attr("x",function(d) {return  widthBox/4 - skalaStatystyki(d.analizy_R_2_6);})  
                                  .attr("y", heightBox/5+paddingSlupki)              
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_R_2_6);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

                  sesja_statystyki_doswR
                                  .append("rect")
                                  .attr("x", function(d) {return widthBox/4-skalaStatystyki(d.analizy_R_6_wiecej);}) 
                                   .attr("y", heightBox/5*2+paddingSlupki*2 )            
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_R_6_wiecej);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)
              // teksty

                  sesja_statystyki_doswR
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 - skalaStatystyki(d.analizy_R_0_2)-paddingRect;}) 
                                   .attr("y", heightBox*1/5)            
                                  .text(function(d){
                                          return d3.round(d.analizy_R_0_2,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "end")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)
                                 

                sesja_statystyki_doswR
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 - skalaStatystyki(d.analizy_R_2_6)-paddingRect;})    
                                  .attr("y", heightBox/5+paddingSlupki +heightBox*1/5)        
                                  .text(function(d){
                                          return d3.round(d.analizy_R_2_6,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "end")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)                       

               sesja_statystyki_doswR
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 - skalaStatystyki(d.analizy_R_6_wiecej)-paddingRect;}) 
                                  .attr("y", heightBox/5*2+paddingSlupki*2 +heightBox*1/5   )              
                                  .text(function(d){
                                          return d3.round(d.analizy_R_6_wiecej,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "end")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)
              // labelki

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 + paddingRect*2 )  
                                  .attr("y", -paddingRect )             
                                  .text("podane doświadczenie w latach:" )
                                  .style("text-anchor", "middle")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 + paddingRect*2)   
                                  .attr("y", heightBox*1/5)         
                                  .text("[0,2]")
                                  .style("text-anchor", "middle")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 + paddingRect*2)   
                                  .attr("y", heightBox/5+paddingSlupki +heightBox*1/5)           
                                  .text("(2,6)")
                                  .style("text-anchor", "middle")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 + paddingRect*2)
                                  .attr("y", heightBox/5*2+paddingSlupki*2 +heightBox*1/5)              
                                  .text("6+")
                                  .style("text-anchor", "middle")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 - paddingRect*3 )
                                  .attr("y", heightBox/5*3+paddingSlupki*5)           
                                  .text(" w R")
                                  .style("text-anchor", "start")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              // doswiadczenie w analizach

               var sesja_statystyki_doswAnaliza =   sesja_statystyki.append("g")           
                                  .attr("class", "doswiadczenieAnaliza")


                  sesja_statystyki_doswAnaliza
                                  .append("rect")
                                  .attr("x", widthBox/4 + paddingRect*4)          
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_0_2);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

                  sesja_statystyki_doswAnaliza
                                  .append("rect")
                                    .attr("x", widthBox/4 + paddingRect*4) 
                                  .attr("y", heightBox/5+paddingSlupki)              
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_2_6);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

                  sesja_statystyki_doswAnaliza
                                  .append("rect")
                                    .attr("x", widthBox/4 + paddingRect*4) 
                                   .attr("y", heightBox/5*2+paddingSlupki*2  )            
                                  .style("stroke", "black")
                                  .style("stroke-width", "0.5px")
                                  .attr("height", heightBox*1/5)
                                  .attr("width",function(d) {return skalaStatystyki(d.analizy_6_wiecej);})
                                  .style("fill", "#3788b7")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)
              // teksty

                  sesja_statystyki_doswAnaliza
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 + paddingRect*4 + skalaStatystyki(d.analizy_0_2)+paddingRect;})   
                                   .attr("y", heightBox*1/5)           
                                  .text(function(d){
                                          return d3.round( d.analizy_0_2,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "start")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)


                sesja_statystyki_doswAnaliza
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 + paddingRect*4 + skalaStatystyki(d.analizy_2_6)+paddingRect;})    
                                  .attr("y", heightBox/5+paddingSlupki +heightBox*1/5)        
                                  .text(function(d){
                                          return d3.round(d.analizy_2_6,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "start")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)                       

               sesja_statystyki_doswAnaliza 
                                  .append("text")
                                  .attr("x", function(d) {return widthBox/4 + paddingRect*4 + skalaStatystyki(d.analizy_6_wiecej)+paddingRect;}) 
                                  .attr("y", heightBox/5*2+paddingSlupki*2 + paddingRect   )              
                                  .text(function(d){
                                          return d3.round(d.analizy_6_wiecej,0) +"%";
                                          }
                                  )
                                  .style("text-anchor", "start")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)
              // labelki

              sesja_statystyki.append("text")
                                  .attr("x", widthBox/4 + paddingRect*5 )
                                  .attr("y", heightBox/5*3+paddingSlupki*5)              
                                  .text(" w analizie danych")
                                  .style("text-anchor", "start")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox - paddingRect*2 )  
                                  .attr("y", -paddingRect )           
                                  .text("osób z mgr/dr:")
                                  .style("text-anchor", "end")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)

              sesja_statystyki.append("text")
                                  .attr("x", widthBox - paddingRect*3 )  
                                   .attr("y", heightBox/5+paddingSlupki+ paddingRect*3/2)              
                                  .text(function(d){ return d.st_nauk.toFixed(1)+"%"})
                                  .style("text-anchor", "end")
                                  .style("font-size", "20px")
                                    .style("fill", "grey")
                                     .style("opacity", 0)
                                      .transition()
                                      .style("opacity", 1)


              }


              //******************************************************************** popoludnie
               
              var sesja_popoludnie = g.append("g").attr("class", "warsztaty popoludnie")

               sesja_popoludnie.append("text")
                            .attr("x", widthBox+paddingBlock+widthBox/2)             
                            .attr("y", -paddingBox*2)
                            .text("sesja popołudniowa")
                            .style("text-anchor", "middle")
                            .attr("class", "labelka")


              var sesja_popoludnie_grupy = sesja_popoludnie.selectAll("g")
                                    .data(daneWarsztaty
                                      .filter(function(d){ return d.sesja == "sesja popoludniowa"; })
                                      .sort(function(x, y){
                                                     return d3.descending(x.ile, y.ile);
                                                  }))
                                    .enter()
                                    .append("g")
                                 .attr("class", function(d){return podkreslString(d.warsztat) + " glowna";})
                                    .attr("transform", function(d,i){return "translate(" + (widthBox+paddingBlock)  + "," + (i*(heightBox + paddingBox)) + ")"});


                  sesja_popoludnie_grupy.append("rect")
                                        .style("stroke", "grey")
                                        .attr("height", heightBox)
                                        .attr("width",widthBox)          
                                        .style("fill", "none")
                                        .attr("class", function(d){return podkreslString(d.warsztat) + " glowna";})


                  sesja_popoludnie_grupy.append("a")
                            .attr("xlink:href",function(d){return d.url;})
                            .append("text")
                            .attr("x", paddingRect)             
                            .attr("y", paddingRect*3/2)
                            .text(function(d){return d.warsztat;})
                            .attr("class", "warsztat_nazwa")

              var sesja_popoludnie_zajetosc = sesja_popoludnie_grupy.append("g")
                                  .attr("class", "zajetosc")
                                  .attr("transform","translate("+paddingRect+","+heightBox*6/10+")")

              sesja_popoludnie_zajetosc.append("text")
                                  .text("popularność:")
                                  .attr("y", paddingRect)

                sesja_popoludnie_zajetosc.append("text")
                                  .attr("x", widthBox - 2*paddingRect)             
                                  .text(function(d){
                                          if(d.ile_rezerwa ==0){ return "";} 
                                          else{
                                            return "+"+d.ile_rezerwa;
                                          }
                                  })
                                  .style("text-anchor", "end")
                                  .attr("y", paddingRect)


                  sesja_popoludnie_zajetosc.append("text")
                                  .attr("x", widthBox - 2*paddingRect-20)             
                                  .text(function(d){
                                          return (d.ile-d.ile_rezerwa) + "/20"
                                  })
                                  .style("text-anchor", "end")
                                  .attr("y", paddingRect)


                  sesja_popoludnie_zajetosc.append("rect")
                                        .attr("x", widthBox/4)             
                                        .style("stroke", "black")
                                        .style("stroke-width", "0.5px")
                                        .attr("height", heightBox*1/5)
                                        .attr("width",skalaZajete(20))
                                        .style("fill", "#ebebe0")

                  sesja_popoludnie_zajetosc.append("rect")
                                        .attr("x", widthBox/4)             
                                        .style("stroke", "black")                          
                                        .style("stroke-width", "0.5px")
                                        .attr("height", heightBox*1/5)
                                        .attr("width",function(d){   return skalaZajete(d.ile - d.ile_rezerwa);})
                                        .style("fill", "#a7e3ef") //A7DBD8  #69D2E7

               var labelWiecej_popoludnie = sesja_popoludnie_grupy
                                .append("text")
                                .attr("x", widthBox - 4*paddingRect)             
                                .attr("y", paddingRect*3/2)
                                .text("więcej...")
                                .style("font-size","9px")
                                .style("stroke","none")
                                .style("fill","grey")

              //**************************************************************************** tworzenie strzalek 


                var rysujStrzalke = function(source, target, kiedy) {


               
                  var height = 0;
                  var y_source =0;
                  var y_target =0;
                  source  = daneWarsztaty.filter(function(d){ return d.warsztat == source})
                  target  = daneWarsztaty.filter(function(d){ return d.warsztat == target})

                  if(kiedy == "zwin"){

                    height = heightBox;

                  }
                  else if(kiedy =="rozwin"){

                    height = heightBox2;

                  }

                  y_source = (paddingBox + height)*( source[0].pozycja -1 ) 
                  y_target = (paddingBox + height)*( target[0].pozycja -1 ) 

                  var source_g_xy = [0, y_source]
                  var target_g_xy = [widthBox+paddingBlock, y_target]

                  var source_rect_wh =[ widthBox, height  ]
                  var target_rect_wh =[ widthBox, height ]

                  var curvature = .5,
                       xl = source_g_xy[0] + source_rect_wh[0],
                       xp = target_g_xy[0],
                       xi = d3.interpolateNumber(xl, xp),
                       x2 = xi(curvature),
                       x3 = xi(1 - curvature),
                       yl = source_g_xy[1] + source_rect_wh[1]/2  ,
                       yp = target_g_xy[1] + target_rect_wh[1]/2;


                  return "M" + xl + "," + yl  //x po lewej  y po lewej
                         + "C" + x2 + "," + yl
                         + " " + x3 + "," + yp
                         + " " + xp + "," + yp; //x po prawej  y po prawej
                  
                };

                  



              var strzalki = g.selectAll(".link")
                                  .data(daneWarsztaty
                                    .filter(function(d){ return d.sciezka != "brak"}))
                                  .enter()
                                  .append("path")
                                  .attr("class", "link")
                                  .attr("d", function(d){return rysujStrzalke(d.warsztat, d.sciezka, "zwin");})
                                  .style("stroke-width", "10px")
                                  .style("stroke", function(d){ return skalaKolor(d.warsztat); })

              //**************************************************************************** przycisk 


              var przycisk = g.append("g").attr("id", "przycisk").attr("transform", "translate(" + (widthBox+(paddingBlock-120)/2)+ "," +(-paddingBox*5) + ")")
                                
                  var przycisk_rect = przycisk.append("rect")
                                        .style("stroke", "black")
                                        .attr("height", 20)
                                        .attr("width",120)          
                                        .style("fill", "white")
                                    

                       przycisk.append("text")
                                        .attr("x", paddingRect/2)             
                                        .attr("y", paddingRect*3/2)
                                        .text("Rozwiń/Zwiń statystyki")
                                        .style("text-anchor", "start")
                                        .style("pointer-events", "none")

              var czyStat = false;

                  przycisk_rect.on("click",function(d){

                    var ile = 18;

                    czyStat = !czyStat;
                    if(czyStat){

                      // zmiana rozmiaru okna głownego
                      svg.attr("height", height + margin.top + margin.bottom)

                      zrodlo.attr("y", height+margin.top+ margin.bottom*(2/3))
                      //autor.attr("y", height+margin.top+ margin.bottom*(2/3))

                      d3.select(this).style("stroke", "red");
                      d3.selectAll(".warsztaty.rano g.glowna")
                      .transition()
                      .attr("transform",function(d,i){return "translate(" + 0+ ","  + (i*(heightBox2 + paddingBox))+")"}) 
                      d3.selectAll(".warsztaty.popoludnie g.glowna")
                      .transition()
                      .attr("transform",function(d,i){return "translate(" + (widthBox+paddingBlock)+ ","  + (i*(heightBox2 + paddingBox))+")"}) 

                      d3.selectAll(".warsztaty rect.glowna")
                      .transition()
                      .attr("height",heightBox2)

                       strzalki
                                   .transition()
                                    .attr("d", function(d,i){return rysujStrzalke(d.warsztat, d.sciezka, "rozwin");})     


                      dodajStatystyki(sesja_rano_grupy);
                      dodajStatystyki(sesja_popoludnie_grupy);

                        }

                    if(!czyStat){

                      svg.attr("height", heightStart + margin.top + margin.bottom)
                      zrodlo.attr("y", heightStart+margin.top+ margin.bottom*(2/3))
                      //autor.attr("y", heightStart+margin.top+ margin.bottom*(2/3))
                       
                      d3.select(this).style("stroke", "black");
                      d3.selectAll(".warsztaty.rano g.glowna")
                      .transition()
                      .attr("transform",function(d,i){return "translate(" + 0+ ","  + (i*(heightBox + paddingBox))+")"}) 
                      d3.selectAll(".warsztaty.popoludnie g.glowna")
                      .transition()
                      .attr("transform",function(d,i){return "translate(" + (widthBox+paddingBlock)+ ","  + (i*(heightBox + paddingBox))+")"})

                      d3.selectAll(".warsztaty rect.glowna")
                      .transition()
                      .attr("height",heightBox)
                    
                        strzalki
                                   .transition()
                                    .attr("d", function(d,i){return rysujStrzalke(d.warsztat, d.sciezka, "zwin");})     

                      g.selectAll(".statystyki").remove()

                    }
                  })

              //********************************************************* TOOLTIPY



              var tooltipki=d3.select("#chart_warsztaty").append("div").attr("id", "tooltip").style("opacity",0)

              labelWiecej_popoludnie
                .on("mouseover", function(d){


                    tooltipki.html( "<b>" + "Zainteresowania uczestników" +"</b>" + "<br/>"+
                       "" +"<br/>"+
                        "<b>1.</b> "+ d.zaint1 + ": " + d.zaint1_ile.toFixed(0)+ "% osób"  + "<br/>" +
                        "<b>2.</b> "+ d.zaint2 + ": " + d.zaint2_ile.toFixed(0)+ "% osób"  + "<br/>" +
                        "<b>3.</b> "+ d.zaint3 + ": " + d.zaint3_ile.toFixed(0)+ "% osób"  + "<br/>"
                       


                         )
                    .style("left", (d3.event.pageX-widthBox+2*paddingRect ) + "px") /* ustalamy pozycje elementu tam gdzie zostanie akcja podjeta */
                    .style("top", (d3.event.pageY+2*paddingRect) + "px")
                    .transition()
                    .duration(300)
                    .style("opacity",1);
                  


                    }

                  )
              labelWiecej_popoludnie
              .on("mouseout", function(d){


                    tooltipki
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                            
               

                    }
                  );

              labelWiecej_rano
                .on("mouseover", function(d){


                   
                    tooltipki.html( "<b>" + "Zainteresowania uczestników" +"</b>" + "<br/>"+
                       "" +"<br/>"+
                        "<b>1.</b> "+ d.zaint1 + ": " + d.zaint1_ile.toFixed(0)+ "% osób"  + "<br/>" +
                        "<b>2.</b> "+ d.zaint2 + ": " + d.zaint2_ile.toFixed(0)+ "% osób"  + "<br/>" +
                        "<b>3.</b> "+ d.zaint3 + ": " + d.zaint3_ile.toFixed(0)+ "% osób"  + "<br/>"
                       


                         )
                  .style("left", (d3.event.pageX-widthBox+2*paddingRect ) + "px") /* ustalamy pozycje elementu tam gdzie zostanie akcja podjeta */
                    .style("top", (d3.event.pageY+2*paddingRect) + "px")
                    .transition()
                    .duration(300)
                    .style("opacity",1);
                  


                    }

                  )
              labelWiecej_rano
              .on("mouseout", function(d){


                    tooltipki
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                            
               

                    }
                  );

};