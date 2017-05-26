/*

dane do zakladki "pakiety" w wizualizacji
(wygenerowane przy uzyciu R-a)

korzysta z nich funkcja stworzWykresPakiety();

opis:

    "pakiety": nazwa pakietu
    "Freq": liczba wskazan pakietu
    "url": link do dokumentacji o pakiecie na stronie https://www.rdocumentation.org/
    "doswiadczenie_R_med": mediana doswiadczenia w R uzytkownikow tego pakietu (w latach)
    "doswiadczenie_analiza_med": mediana doswiadczenia w analizach uzytkownikow tego pakietu (w latach)
    "doswiadczenie_R_mean": srednia doswiadczenia w R uzytkownikow tego pakietu (w latach)
    "doswiadczenie_analiza_mean": srednia doswiadczenia w analizach uzytkownikow tego pakietu (w latach)
    "dosw": czy doswiadczenie w analizach jest srednio wieksze niz doswiadczenie w R

*/

var danePakiety = [
  {
    "pakiety": "car",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/car",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.6667,
    "doswiadczenie_analiza_mean": 5.9333,
    "dosw": true
  },
  {
    "pakiety": "caret",
    "Freq": 10,
    "url": "https://www.rdocumentation.org/packages/caret",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 3.5,
    "doswiadczenie_R_mean": 3.1,
    "doswiadczenie_analiza_mean": 4.3,
    "dosw": true
  },
  {
    "pakiety": "cluster",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/cluster",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 4.5,
    "doswiadczenie_R_mean": 3,
    "doswiadczenie_analiza_mean": 4.75,
    "dosw": true
  },
  {
    "pakiety": "data.table",
    "Freq": 16,
    "url": "https://www.rdocumentation.org/packages/data.table",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 6,
    "doswiadczenie_R_mean": 2.9688,
    "doswiadczenie_analiza_mean": 6.0667,
    "dosw": true
  },
  {
    "pakiety": "dplyr",
    "Freq": 75,
    "url": "https://www.rdocumentation.org/packages/dplyr",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.1149,
    "doswiadczenie_analiza_mean": 4.7671,
    "dosw": true
  },
  {
    "pakiety": "forecast",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/forecast",
    "doswiadczenie_R_med": 1,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 2.3333,
    "doswiadczenie_analiza_mean": 3,
    "dosw": true
  },
  {
    "pakiety": "ggplot2",
    "Freq": 63,
    "url": "https://www.rdocumentation.org/packages/ggplot2",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.0013,
    "doswiadczenie_analiza_mean": 5.5238,
    "dosw": true
  },
  {
    "pakiety": "glmnet",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/glmnet",
    "doswiadczenie_R_med": 3.5,
    "doswiadczenie_analiza_med": 2.5,
    "doswiadczenie_R_mean": 3.25,
    "doswiadczenie_analiza_mean": 2.5,
    "dosw": false
  },
  {
    "pakiety": "h2o",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/h2o",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.75,
    "doswiadczenie_analiza_mean": 4.25,
    "dosw": true
  },
  {
    "pakiety": "haven",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/haven",
    "doswiadczenie_R_med": 7,
    "doswiadczenie_analiza_med": 8.5,
    "doswiadczenie_R_mean": 7,
    "doswiadczenie_analiza_mean": 8.5,
    "dosw": true
  },
  {
    "pakiety": "httr",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/httr",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 5,
    "doswiadczenie_R_mean": 4.6667,
    "doswiadczenie_analiza_mean": 5,
    "dosw": true
  },
  {
    "pakiety": "jsonlite",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/jsonlite",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 4,
    "doswiadczenie_analiza_mean": 4,
    "dosw": false
  },
  {
    "pakiety": "knitr",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/knitr",
    "doswiadczenie_R_med": 8.5,
    "doswiadczenie_analiza_med": 10.5,
    "doswiadczenie_R_mean": 9,
    "doswiadczenie_analiza_mean": 9.75,
    "dosw": true
  },
  {
    "pakiety": "leaflet",
    "Freq": 7,
    "url": "https://www.rdocumentation.org/packages/leaflet",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 5,
    "doswiadczenie_R_mean": 3.1429,
    "doswiadczenie_analiza_mean": 5.2857,
    "dosw": true
  },
  {
    "pakiety": "lme4",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/lme4",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 4.9,
    "doswiadczenie_analiza_mean": 5.4,
    "dosw": true
  },
  {
    "pakiety": "lmtest",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/lmtest",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 2,
    "doswiadczenie_R_mean": 3,
    "doswiadczenie_analiza_mean": 3,
    "dosw": false
  },
  {
    "pakiety": "lubridate",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/lubridate",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 9,
    "doswiadczenie_R_mean": 3.6667,
    "doswiadczenie_analiza_mean": 7.6667,
    "dosw": true
  },
  {
    "pakiety": "MASS",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/MASS",
    "doswiadczenie_R_med": 5,
    "doswiadczenie_analiza_med": 2,
    "doswiadczenie_R_mean": 4.6667,
    "doswiadczenie_analiza_mean": 5.6667,
    "dosw": true
  },
  {
    "pakiety": "multcomp",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/multcomp",
    "doswiadczenie_R_med": 2.5,
    "doswiadczenie_analiza_med": 10,
    "doswiadczenie_R_mean": 3.1667,
    "doswiadczenie_analiza_mean": 11.3333,
    "dosw": true
  },
  {
    "pakiety": "plotly",
    "Freq": 12,
    "url": "https://www.rdocumentation.org/packages/plotly",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 3.5,
    "doswiadczenie_R_mean": 3.4167,
    "doswiadczenie_analiza_mean": 4.6667,
    "dosw": true
  },
  {
    "pakiety": "randomForest",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/randomForest",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 3,
    "doswiadczenie_R_mean": 2.6667,
    "doswiadczenie_analiza_mean": 2.6667,
    "dosw": false
  },
  {
    "pakiety": "Rcpp",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/Rcpp",
    "doswiadczenie_R_med": 5,
    "doswiadczenie_analiza_med": 9,
    "doswiadczenie_R_mean": 6,
    "doswiadczenie_analiza_mean": 10.4,
    "dosw": true
  },
  {
    "pakiety": "reshape2",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/reshape2",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 4.5,
    "doswiadczenie_R_mean": 3.7,
    "doswiadczenie_analiza_mean": 6.7,
    "dosw": true
  },
  {
    "pakiety": "rmarkdown",
    "Freq": 7,
    "url": "https://www.rdocumentation.org/packages/rmarkdown",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 3,
    "doswiadczenie_R_mean": 4,
    "doswiadczenie_analiza_mean": 5,
    "dosw": true
  },
  {
    "pakiety": "RODBC",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/RODBC",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 3.5,
    "doswiadczenie_R_mean": 2.125,
    "doswiadczenie_analiza_mean": 4.75,
    "dosw": true
  },
  {
    "pakiety": "rpart",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/rpart",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 2,
    "doswiadczenie_R_mean": 3,
    "doswiadczenie_analiza_mean": 2,
    "dosw": false
  },
  {
    "pakiety": "RPostgreSQL",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/RPostgreSQL",
    "doswiadczenie_R_med": 1,
    "doswiadczenie_analiza_med": 5,
    "doswiadczenie_R_mean": 2.6667,
    "doswiadczenie_analiza_mean": 4.6667,
    "dosw": true
  },
  {
    "pakiety": "RSelenium",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/RSelenium",
    "doswiadczenie_R_med": 1,
    "doswiadczenie_analiza_med": 2,
    "doswiadczenie_R_mean": 1.6667,
    "doswiadczenie_analiza_mean": 2.3333,
    "dosw": true
  },
  {
    "pakiety": "rvest",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/rvest",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.6667,
    "doswiadczenie_analiza_mean": 3.6667,
    "dosw": false
  },
  {
    "pakiety": "shiny",
    "Freq": 25,
    "url": "https://www.rdocumentation.org/packages/shiny",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 3.3,
    "doswiadczenie_analiza_mean": 5.6,
    "dosw": true
  },
  {
    "pakiety": "spdep",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/spdep",
    "doswiadczenie_R_med": 8,
    "doswiadczenie_analiza_med": 15,
    "doswiadczenie_R_mean": 7,
    "doswiadczenie_analiza_mean": 12.3333,
    "dosw": true
  },
  {
    "pakiety": "stats",
    "Freq": 8,
    "url": "https://www.rdocumentation.org/packages/stats",
    "doswiadczenie_R_med": 1.5,
    "doswiadczenie_analiza_med": 3,
    "doswiadczenie_R_mean": 2.1354,
    "doswiadczenie_analiza_mean": 4.5,
    "dosw": true
  },
  {
    "pakiety": "stringi",
    "Freq": 14,
    "url": "https://www.rdocumentation.org/packages/stringi",
    "doswiadczenie_R_med": 2.5,
    "doswiadczenie_analiza_med": 3,
    "doswiadczenie_R_mean": 3.0714,
    "doswiadczenie_analiza_mean": 3.1154,
    "dosw": true
  },
  {
    "pakiety": "stringr",
    "Freq": 7,
    "url": "https://www.rdocumentation.org/packages/stringr",
    "doswiadczenie_R_med": 1,
    "doswiadczenie_analiza_med": 3.5,
    "doswiadczenie_R_mean": 1.8333,
    "doswiadczenie_analiza_mean": 5.8333,
    "dosw": true
  },
  {
    "pakiety": "survey",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/survey",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 6,
    "doswiadczenie_R_mean": 5.6667,
    "doswiadczenie_analiza_mean": 6.6667,
    "dosw": true
  },
  {
    "pakiety": "survival",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/survival",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 3,
    "doswiadczenie_R_mean": 3,
    "doswiadczenie_analiza_mean": 2.5,
    "dosw": false
  },
  {
    "pakiety": "tidyr",
    "Freq": 20,
    "url": "https://www.rdocumentation.org/packages/tidyr",
    "doswiadczenie_R_med": 4,
    "doswiadczenie_analiza_med": 4.5,
    "doswiadczenie_R_mean": 3.75,
    "doswiadczenie_analiza_mean": 5.4,
    "dosw": true
  },
  {
    "pakiety": "tidyverse",
    "Freq": 14,
    "url": "https://www.rdocumentation.org/packages/tidyverse",
    "doswiadczenie_R_med": 2.75,
    "doswiadczenie_analiza_med": 4,
    "doswiadczenie_R_mean": 2.8214,
    "doswiadczenie_analiza_mean": 4.6786,
    "dosw": true
  },
  {
    "pakiety": "tm",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/tm",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 2,
    "doswiadczenie_R_mean": 2.4,
    "doswiadczenie_analiza_mean": 3.4,
    "dosw": true
  },
  {
    "pakiety": "vegan",
    "Freq": 4,
    "url": "https://www.rdocumentation.org/packages/vegan",
    "doswiadczenie_R_med": 3.25,
    "doswiadczenie_analiza_med": 6.25,
    "doswiadczenie_R_mean": 4.875,
    "doswiadczenie_analiza_mean": 6.875,
    "dosw": true
  },
  {
    "pakiety": "xgboost",
    "Freq": 5,
    "url": "https://www.rdocumentation.org/packages/xgboost",
    "doswiadczenie_R_med": 2,
    "doswiadczenie_analiza_med": 1,
    "doswiadczenie_R_mean": 2.6,
    "doswiadczenie_analiza_mean": 2.4,
    "dosw": false
  },
  {
    "pakiety": "xts",
    "Freq": 3,
    "url": "https://www.rdocumentation.org/packages/xts",
    "doswiadczenie_R_med": 3,
    "doswiadczenie_analiza_med": 10,
    "doswiadczenie_R_mean": 4.6667,
    "doswiadczenie_analiza_mean": 9.6667,
    "dosw": true
  }
] ;