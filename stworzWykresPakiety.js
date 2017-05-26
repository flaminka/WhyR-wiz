/*

funkcja do generowania wykresu w zakladce "pakiety"

na podstawie: http://bl.ocks.org/ericandrewlewis/dc79d22c74b8046a5512

*/

var stworzWykresPakiety = function(){



            /***** obszar rysowania *****/


            // marginesy wykresu
            var margin = {top: 140, right: 60, bottom: 60, left: 60};

            // wielkosc wykresu
            var width = 980 - margin.left - margin.right,
                height = 650 - margin.top - margin.bottom;

            // caly wykres
            var svg=d3.select("#chart_pakiety")  
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("id", "svg_pakiety")

            // obszar rysowania
            var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr( "xmlns",'xlink="http://www.w3.org/1999/xlink"')


            // parametry do funkcji
            var padding = 4, // odleglosc miedzy kolkami
                minRadius = 8, // minimalna wielkosc kolka
                maxRadius = 85, // minimalna wielkosc kolka
                numberOfNodes = danePakiety.length; 



            /***** tytuly, zrodlo, pomoc, generowanie... *****/

            var tytulik = "Co słychać na CRAN-ie?";
            var podtytulik = "Najpopularniejsze pakiety R-owe wśród uczestników konferencji";


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
                          .attr("y", height+margin.top+ margin.bottom*(2/3))
                          .style("font-size", "10px") 
                          .text("Źródło: Why R? 2017 - ankiety, RDocumentation");

             /*var autor = tytuly.append("text")
                          .attr("x", margin.left+ width)         
                          .attr("y", height+margin.top+ margin.bottom*(2/3))
                          .attr("text-anchor", "end")
                          .style("font-size", "8px")
                          .text("Autor: Ewa Baranowska, KN Data Science PW");   
            */

            // grupa dla ikonki z pomoca
            var pomoc = svg.append("g").attr("class", "pomoc")
                          .attr("transform","translate(0,10)")


            // generowanie wykresu napis
            var loading = svg.append("text")
              .attr("x", ( width + margin.left + margin.right ) / 2)
              .attr("y", ( height + margin.top + margin.bottom ) / 2)
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text("Generowanie wykresu...");


            


            // skala x-owa
            var x = d3.scale.linear()
              .domain( [0, d3.max(danePakiety, function(d){ return d.doswiadczenie_R_mean;})] )
              .range( [0, width ] );

            var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("bottom")
                                .outerTickSize(0)
                                .innerTickSize(0) 
                                .tickPadding(10);

            // strzalka osi

            var defs = svg.append("defs");

                defs.append("marker")
                    .attr({
                      "id":"arrow_poz",
                      "viewBox":"0 -5 10 10",
                      "refX":5,
                      "refY":0,
                      "markerWidth":4,
                      "markerHeight":4,
                      "orient":"0"
                    })
                    .append("path")
                      .attr("d", "M0,-5L10,0L0,5")
                      .attr("class","arrowHead")
                      .style("stroke","grey")
                      .style("fill","grey");


                    
            // skala wielkosc kolka                    
            var skalaR = d3.scale.sqrt()
              .range([minRadius,  maxRadius])
              .domain( [ 0,  d3.max(danePakiety, function(d){ return d.Freq;}) ] );

            // skala kolor kolka
            var skalaKolor = d3.scale.ordinal()
              .domain( [ true, false ] )
              .range(["#A7DBD8", "#F38630"]);

            // skala wielkosc czcionki w kolku
            var skalaCzcionka = d3.scale.linear()
              .domain( [d3.min(danePakiety, function(d){ return d.Freq;}), d3.max(danePakiety, function(d){ return d.Freq;})] )
              .range( [10, 16] );


            /***** funkcje pomocnicze *****/

            // funkcja do tooltipow (dodawanie slowa: lata / lat / rok / roku)
            var jakieLataTekst = function(ile_lat){

                if(ile_lat == 0){
                  return "lat";
                }else if(ile_lat < 1){
                  return "roku";
                }else if(ile_lat == 1){
                  return "rok";
                }else if(ile_lat == 2 | ile_lat == 3 | ile_lat == 4){
                  return "lata";
                }else if( ile_lat % 1 == 0){
                  return "lat";
                }else{
                  return "roku";
                }
            }

            

            // przekształcanie danych
            var data = danePakiety.map(function(d) {
              var value = d.doswiadczenie_R_mean,
                   size =  skalaR(d.Freq),
                   freq = d.Freq,
                   url = d.url
                   name = d.pakiety,
                   kolor = skalaKolor(d.dosw),
                   analiza = d.doswiadczenie_analiza_mean
                   datum = {value: value, size: size, name: name, kolor: kolor, freq:freq, url:url, analiza:analiza};
              return datum;
            });


              
            // przeksztalca dane do wygodniejszej dla D3
            var nodes = data.map(function(node, index) {
              return {
                idealradius: node.size,
                radius: 0,
                color: node.kolor,
                // node's gravitational centerpoint
                idealcx: x(node.value),
                idealcy: height/2 -30, // zmieniam z height/2
                x: x(node.value),
                // Add some randomization to the placement;
                // nodes stacked on the same point can produce NaN errors.
                y: height/2 - 30 + Math.random(), // zmieniam z height/2
                name: node.name,
                freq: node.freq,
                url: node.url,
                analiza: node.analiza,
                analizaR: node.value
              };  
            });


            var force = d3.layout.force()
              .nodes(nodes)
              .size([width, 0]) // z height na 0
              .gravity(0)
              .charge(0)
              .on("tick", tick)
              .start();


            /**
             * On a tick, apply custom gravity, collision detection, and node placement.
             */
            function tick(e) {


              /*  node
                  .each(gravity(dampenedAlpha))
                  .each(collide(jitter))
                  .attr("transform", (d) -> "translate(#{d.x},#{d.y})")
            */

              for ( i = 0; i < nodes.length; i++ ) {
                var node = nodes[i];
                /*
                 * Animate the radius via the tick.
                 *
                 * Typically this would be performed as a transition on the SVG element itself,
                 * but since this is a static force layout, we must perform it on the node.
                 */
                node.radius = node.idealradius - node.idealradius * e.alpha * 10;
                node = gravity(.2 * e.alpha)(node);
                node = collide(.5)(node);
                node.cx = node.x;
                node.cy = node.y;
              }
            }

            /**
             * On a tick, move the node towards its desired position,
             * with a preference for accuracy of the node's x-axis placement
             * over smoothness of the clustering, which would produce inaccurate data presentation.
             */
            function gravity(alpha) {
              return function(d) {
                d.y += (d.idealcy - d.y) * alpha;
                d.x += (d.idealcx - d.x) * alpha * 3;
                return d;
              };
            }


             

            /**
             * On a tick, resolve collisions between nodes.
             */
            function collide(alpha) {
              var quadtree = d3.geom.quadtree(nodes);
              return function(d) {
                var r = d.radius + maxRadius + padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                  if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + padding;
                    if (l < r) {
                      l = (l - r) / l * alpha;
                      d.x -= x *= l;
                      d.y -= y *= l;
                      quad.point.x += x;
                      quad.point.y += y;
                    }
                  }
                  return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
                return d;
              };
            }




            /**
             * Run the force layout to compute where each node should be placed,
             * then replace the loading text with the graph.
             */
            function renderGraph() {
              // Run the layout a fixed number of times.
              // The ideal number of times scales with graph complexity.
              // Of course, don't run too long—you'll hang the page!
              force.start();


              for (var i = 100; i > 0; --i) force.tick();
             force.stop();



              var xAxisG = g.append("g")
                              .attr("class", "axis x") 
                              .attr("transform", "translate(0," + (height-30) + ")")

              // tytul osi X
              xAxisG.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", margin.bottom*(2/3))
                    .text("średnie doświadczenie związane z pakietem R [lata]");


                  xAxisG.call(xAxis);

            svg.selectAll(".axis.x path")
            .attr("marker-end","url(#arrow_poz)")




              var tooltipki=d3.select("#chart_pakiety").append("div").attr("id", "tooltip").style("opacity",0)

              var grupy = g.selectAll(".nodes_bubble g")
                            .data(nodes)
                            .enter()
                            .append("g")
                            .attr("class", "nodes_bubble")

              var circle = grupy.append("circle")
                .style("fill", function(d) { return d.color; })
                .style("stroke", "grey")
                .attr("cx", function(d) { return d.x} )
                .attr("cy", function(d) { return d.y} )
                .attr("r", function(d) { return d.radius} )
                .style("cursor", "pointer")
                .attr("class", function(d){ return "bubble " + d.name.replace(/\./ig,"_");})
                .on("mouseover", function(d){


                  tooltipki.html( "<b>" + d.name +"</b>" + "<br/>" +
                     ""   + "<br/>" +
                    "liczba osób: " + "<b>" + d.freq +"</b>" + "<br/>" +
                    "średnie dośw. w R: " + "<b>" + d.analizaR.toFixed(1)  +"</b>"+ " " + jakieLataTekst(d.analizaR.toFixed(1)) +  "<br/>" +
                    "średnie dośw. w analizach: " + "<b>" + d.analiza.toFixed(1) +"</b>" + " " + jakieLataTekst( d.analiza.toFixed(1)) + "<br/>"

                       )
                  .style("left", (d3.event.pageX ) + "px") /* ustalamy pozycje elementu tam gdzie zostanie akcja podjeta */
                  .style("top", (d3.event.pageY) + "px")
                  .transition()
                  .duration(300)
                  .style("opacity",1);
                

                  d3.select(this)
                        .transition()
                        .duration(300)
                        .style("stroke-width", "3px");



                  }

                )
            .on("mouseout", function(d){

                
                  d3.select(this)
                    .transition()
                    .duration(300)
                    .style("stroke-width", "1px");

                  tooltipki
                  .transition()
                  .duration(300)
                  .style("opacity", 0);
                          
             

                  }
                )

            .on("dblclick", function(d){

                var url = d.url;
                  
                    window.location = url; 

            })


            var labelki = grupy.append("text")
                          .attr("x", function(d){ 

                                     var a = d.name
                                     a = "."+a.replace(/\./ig,"_");
                                     var kolko = d3.selectAll(a)
                                     

                                      return kolko.attr("cx");
                                    
                                    })
                          .attr("y", function(d){ 

                                     var a = d.name
                                     a = "."+a.replace(/\./ig,"_");
                                     var kolko = d3.selectAll(a)
                                     

                                      return kolko.attr("cy");
                                     
                                    })
                          .style("font-size", function(d){ return skalaCzcionka(d.freq)+"px";}) 
                          //.style("font-weight", "bold") 
                          .attr("text-anchor", "middle")
                          .style("pointer-events", "none")
                          .text(function(d){return  d.name;})
                          .attr("dy", ".3em")
                          // usuwanie napisów które są za dlugie
                          .each(function(d){ 

                                var dl = d3.select(this)[0][0].getComputedTextLength()
                                
                                var r = d3.select(".bubble."+d.name.replace(/\./ig,"_")).attr("r")*2
                                if( (dl-15) > r){
                                 d3.select(this).remove()
                                }

                          }) 

            // LEGENDA KOLOR

            var legendaKolor = svg.append("g")
                .attr("class", "legend kolor")
                .attr("transform", "translate(" + (width*4/5 + margin.left)  + "," + margin.top*2/3 + ")") 

             var legendaKolorEtykiety = legendaKolor.selectAll("g")
                                  .data([true,false])
                                  .enter()
                                  .append("g")
                
              legendaKolorEtykiety.append("circle")
                          .attr("fill", function(d){ return skalaKolor(d);})
                          .style("stroke", "grey")
                          .attr("cx", 0)
                          .attr("cy", function(d,i){ return 35*i; })
                          .attr("r",8)

              legendaKolorEtykiety.append("text")
                          .attr("x", 20)
                          .attr("y", function(d,i){ return 35*i+4; }) 
                          .text(function(d){

                              if(d){
                                return "większe w analizach";
                              }else{
                                return "większe lub równe w pakiecie R";
                              }

                            ;})


            legendaKolor.append("text")
              .attr("x",-8)
                .attr("y", -30)
                .text("Doświadczenie użytkowników pakietu")
                
            // ikonka pomocy


             var pomoc_kolko =    pomoc.append("circle")
                                    .attr("cx", margin.left+width/2)             
                                    .attr("cy", (margin.top)*(1/3))
                                    .attr("r", 10)
                                    .attr("fill", "white")
                                    .style("stroke", "grey")
                                    .style("stroke-width", "2px")

              var pomoc_tekst =   pomoc.append("text")
                                    .attr("x", margin.left+width/2)             
                                    .attr("y", (margin.top)*(1/3)+6)
                                    .style("stroke", "none")
                                    .style("fill", "grey")
                                    .text("?")
                                    .attr("text-anchor", "middle")
                                    .style("font-size", "18px")
                                    .style("font-weight", "bold")
                                    .style("pointer-events", "none")

            var tooltipki0=d3.select("#chart_pakiety").append("div").attr("id", "tooltip0").style("opacity",0)

              pomoc_kolko.on("mouseover",function(d){
                
                 d3.select(this).style("stroke", "red")
                  pomoc_tekst.style("fill", "red")

                   tooltipki0.html( "<b>" + "Szczegóły" +"</b>" + "<br/>"+
                     "" +"<br/>"+
                     "Dwukrotne kliknięcie na nazwę pakietu powoduje przejście do strony" + "<br/>"+
                     "z informacjami nt. tego pakietu."


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

              loading.remove();
            }

            setTimeout(renderGraph, 1);




};