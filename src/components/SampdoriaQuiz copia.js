'use client'

import React, { useState, useEffect } from 'react';
import { LogOut, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search } from 'lucide-react';

// Database giocatori
const players = [
    // Attaccanti
    {
        name: "Fabio Quagliarella",
        position: "Attaccante", 
        years: "2016-2023",
        image: "images/players/quagliarella.jpg"
    },
    {
        name: "Manolo Gabbiadini",
        position: "Attaccante",
        years: "2013-2015, 2019-2023", 
        image: "images/players/gabbiadini.jpg"
    },
    {
        name: "Francesco Caputo",
        position: "Attaccante",
        years: "2021-2023",
        image: "images/players/caputo.jpg"
    },
    {
        name: "Antonio Candreva",
        position: "Centrocampista",
        years: "2021-2023",
        image: "images/players/candreva.jpg"
    },
    {
        name: "Sam Lammers",
        position: "Attaccante",
        years: "2022-2023",
        image: "images/players/lammers.jpg"
    },
    {
        name: "Federico Bonazzoli",
        position: "Attaccante",
        years: "2015-2022",
        image: "images/players/bonazzoli.jpg"
    },
    {
        name: "Duván Zapata",
        position: "Attaccante",
        years: "2017-2018",
        image: "images/players/zapata.jpg"
    },
    {
        name: "Luis Muriel",
        position: "Attaccante",
        years: "2015-2017",
        image: "images/players/muriel.jpg"
    },
    {
        name: "Patrik Schick",
        position: "Attaccante",
        years: "2016-2017",
        image: "images/players/schick.jpg"
    },
    {
        name: "Eder",
        position: "Attaccante",
        years: "2012-2016",
        image: "images/players/eder.jpg"
    },
    {
        name: "Stefano Okaka",
        position: "Attaccante",
        years: "2014-2015",
        image: "images/players/okaka.jpg"
    },
 
    // Centrocampisti
    {
        name: "Tomás Rincón",
        position: "Centrocampista",
        years: "2022-2023",
        image: "images/players/rincon.jpg"
    },
    {
        name: "Abdelhamid Sabiri",
        position: "Centrocampista",
        years: "2022-2023",
        image: "images/players/sabiri.jpg"
    },
    {
        name: "Gonzalo Villar",
        position: "Centrocampista",
        years: "2022-2023",
        image: "images/players/villar.jpg"
    },
    {
        name: "Morten Thorsby",
        position: "Centrocampista",
        years: "2019-2022",
        image: "images/players/thorsby.jpg"
    },
    {
        name: "Albin Ekdal",
        position: "Centrocampista",
        years: "2015-2022",
        image: "images/players/ekdal.jpg"
    },
    {
        name: "Lucas Torreira",
        position: "Centrocampista",
        years: "2016-2018",
        image: "images/players/torreira.jpg"
    },
    {
        name: "Dennis Praet",
        position: "Centrocampista",
        years: "2016-2019",
        image: "images/players/praet.jpg"
    },
    {
        name: "Karol Linetty",
        position: "Centrocampista",
        years: "2016-2020",
        image: "images/players/linetty.jpg"
    },
    {
        name: "Roberto Soriano",
        position: "Centrocampista",
        years: "2015-2019",
        image: "images/players/soriano.jpg"
    },
    {
        name: "Gastón Ramírez",
        position: "Centrocampista",
        years: "2017-2021",
        image: "images/players/ramirez.jpg"
    },
 
    // Difensori
    {
        name: "Omar Colley",
        position: "Difensore",
        years: "2018-2023",
        image: "images/players/colley.jpg"
    },
    {
        name: "Bartosz Bereszyński",
        position: "Difensore",
        years: "2017-2023",
        image: "images/players/bereszynski.jpg"
    },
    {
        name: "Alex Ferrari",
        position: "Difensore",
        years: "2019-2023",
        image: "images/players/ferrari.jpg"
    },
    {
        name: "Tommaso Augello",
        position: "Difensore",
        years: "2019-2023",
        image: "images/players/augello.jpg"
    },
    {
        name: "Maya Yoshida",
        position: "Difensore",
        years: "2020-2022",
        image: "images/players/yoshida.jpg"
    },
    {
        name: "Joachim Andersen",
        position: "Difensore",
        years: "2017-2019",
        image: "images/players/andersen.jpg"
    },
    {
        name: "Milan Škriniar",
        position: "Difensore",
        years: "2016-2017",
        image: "images/players/skriniar.jpg"
    },
    {
        name: "Matías Silvestre",
        position: "Difensore",
        years: "2013-2016",
        image: "images/players/silvestre.jpg"
    },
    {
        name: "Vasco Regini",
        position: "Difensore",
        years: "2013-2021",
        image: "images/players/regini.jpg"
    },
 
    // Portieri
    {
        name: "Emil Audero",
        position: "Portiere",
        years: "2018-2023",
        image: "images/players/audero.jpg"
    },
    {
        name: "Wladimiro Falcone",
        position: "Portiere",
        years: "2021-2023",
        image: "images/players/falcone.jpg"
    },
    {
        name: "Christian Puggioni",
        position: "Portiere",
        years: "2017-2019",
        image: "images/players/puggioni.jpg"
    },
    {
        name: "Emiliano Viviano",
        position: "Portiere",
        years: "2014-2018",
        image: "images/players/viviano.jpg"
    },

    { name: "Roberto Mancini", 
      position: "Attaccante", 
      years: "1982-1997", 
      image: "images/players/mancini.jpg" },

    { name: "Gianluca Vialli", position: "Attaccante", years: "1984-1992", image: "images/players/vialli.jpg" },
    { name: "Attila Lombardo", position: "Centrocampista", years: "1989-1995, 2001-2002", image: "images/players/lombardo.jpg" },
    { name: "Ruud Gullit", position: "Centrocampista", years: "1993-1994", image: "images/players/gullit.jpg" },
    { name: "Gianluca Pagliuca", position: "Portiere", years: "1987-1994", image: "images/players/pagliuca.jpg" },
    { name: "Pietro Vierchowod", position: "Difensore", years: "1983-1995", image: "images/players/vierchowod.jpg" },
    { name: "Toninho Cerezo", position: "Centrocampista", years: "1986-1992", image: "images/players/cerezo.jpg" },
    { name: "Moreno Mannini", position: "Difensore", years: "1984-1999", image: "images/players/mannini.jpg" },
    { name: "Fausto Pari", position: "Centrocampista", years: "1986-1995", image: "images/players/pari.jpg" },
    { name: "Vladimir Jugović", position: "Centrocampista", years: "1992-1995", image: "images/players/jugovic.jpg" },
    { name: "Enrico Chiesa", position: "Attaccante", years: "1995-1996, 2001-2003", image: "images/players/chiesa.jpg" },
    { name: "Marco Lanna", position: "Difensore", years: "1987-1993, 2002-2004", image: "images/players/lanna.jpg" },
    { name: "Vincenzo Montella", position: "Attaccante", years: "1996-1999", image: "images/players/montella.jpg" },
    { name: "David Platt", position: "Centrocampista", years: "1993-1995", image: "images/players/platt.jpg" },
    { name: "Siniša Mihajlović", position: "Difensore", years: "1994-1998", image: "images/players/mihajlovic.jpg" },
    { name: "Francesco Flachi", position: "Attaccante", years: "1999-2007", image: "images/players/flachi.jpg" },
    { name: "Sergio Volpi", position: "Centrocampista", years: "2000-2007", image: "images/players/volpi.jpg" },
    { name: "Angelo Palombo", position: "Centrocampista", years: "2002-2016", image: "images/players/palombo.jpg" },
    { name: "Daniele Mannini", position: "Centrocampista", years: "2007-2011", image: "images/players/d_mannini.jpg" },
    { name: "Gennaro Delvecchio", position: "Centrocampista", years: "2005-2009", image: "images/players/delvecchio.jpg" }
];

// Database statistiche giocatori
const playerStats = {
    "Fabio Quagliarella": {
        presenze: 236,
        gol: 105,
        assist: 38,
        tiriPartita: 3.8,
        golTesta: 15,
        golPunizione: 7,
        conversioneTiriGol: "21%",
        minutiGiocati: 18830,
        cartelliniGialli: 22,
        cartelliniRossi: 1,
        passaggiChiave: 162,
        velocitàMassima: "32.1 km/h",
        xG: 89.4
    },
    "Manolo Gabbiadini": {
        presenze: 182,
        gol: 58,
        assist: 24,
        tiriPartita: 2.9,
        golTesta: 8,
        golUltimi10Min: 9,
        conversioneTiriGol: "19%",
        minutiGiocati: 14210,
        cartelliniGialli: 14,
        cartelliniRossi: 0,
        passaggiChiave: 87,
        velocitàMassima: "31.6 km/h",
        xG: 52.2
    },
    "Francesco Caputo": {
        presenze: 76,
        gol: 27,
        assist: 12,
        tiriPartita: 2.6,
        golTesta: 5,
        golArea: 22,
        conversioneTiriGol: "22%",
        minutiGiocati: 6140,
        cartelliniGialli: 8,
        cartelliniRossi: 0,
        passaggiChiave: 68,
        velocitàMassima: "32.4 km/h",
        xG: 26.1
    },
    "Sam Lammers": {
        presenze: 33,
        gol: 8,
        assist: 3,
        tiriPartita: 1.8,
        golTesta: 2,
        golArea: 6,
        conversioneTiriGol: "18%",
        minutiGiocati: 2870,
        cartelliniGialli: 5,
        cartelliniRossi: 0,
        passaggiChiave: 37,
        velocitàMassima: "31.2 km/h",
        xG: 7.1
    },
    "Federico Bonazzoli": {
        presenze: 112,
        gol: 19,
        assist: 7,
        tiriPartita: 1.5,
        golTesta: 4,
        golUltimi10Min: 5,
        conversioneTiriGol: "16%",
        minutiGiocati: 9120,
        cartelliniGialli: 9,
        cartelliniRossi: 0,
        passaggiChiave: 41,
        velocitàMassima: "30.8 km/h",
        xG: 16.3
    },
    "Duván Zapata": {
        presenze: 37,
        gol: 11,
        assist: 5,
        tiriPartita: 2.7,
        golTesta: 4,
        golArea: 9,
        conversioneTiriGol: "24%",
        minutiGiocati: 3140,
        cartelliniGialli: 12,
        cartelliniRossi: 1,
        passaggiChiave: 52,
        velocitàMassima: "33.5 km/h",
        xG: 12.4
    },
    "Luis Muriel": {
        presenze: 79,
        gol: 21,
        assist: 15,
        tiriPartita: 2.3,
        dribbling: 87,
        golArea: 17,
        conversioneTiriGol: "26%",
        minutiGiocati: 6540,
        cartelliniGialli: 10,
        cartelliniRossi: 0,
        passaggiChiave: 98,
        velocitàMassima: "34.1 km/h",
        xG: 20.6
    },
    "Patrik Schick": {
        presenze: 32,
        gol: 11,
        assist: 3,
        tiriPartita: 2.1,
        golTesta: 2,
        golArea: 9,
        conversioneTiriGol: "23%",
        minutiGiocati: 2780,
        cartelliniGialli: 6,
        cartelliniRossi: 0,
        passaggiChiave: 44,
        velocitàMassima: "32.8 km/h",
        xG: 9.9
    },
    "Eder": {
        presenze: 135,
        gol: 49,
        assist: 18,
        tiriPartita: 2.5,
        golPunizione: 4,
        golUltimi10Min: 7,
        conversioneTiriGol: "22%",
        minutiGiocati: 10870,
        cartelliniGialli: 15,
        cartelliniRossi: 0,
        passaggiChiave: 72,
        velocitàMassima: "31.9 km/h",
        xG: 44.3
    },
    "Stefano Okaka": {
        presenze: 37,
        gol: 4,
        assist: 2,
        tiriPartita: 1.2,
        golTesta: 2,
        duelliVinti: "58%",
        conversioneTiriGol: "13%",
        minutiGiocati: 2780,
        cartelliniGialli: 6,
        cartelliniRossi: 0,
        passaggiChiave: 22,
        velocitàMassima: "31.0 km/h",
        xG: 4.6
    },
    "Vincenzo Montella": {
        presenze: 83,
        gol: 54,
        assist: 13,
        tiriPartita: 3.1,
        golTesta: 11,
        golArea: 46,
        conversioneTiriGol: "29%",
        minutiGiocati: 7430,
        velocitàMassima: "33.2 km/h",
        xG: 52.6
    },
    "Francesco Flachi": {
        presenze: 280,
        gol: 110,
        assist: 45,
        tiriPartita: 2.6,
        golPunizione: 11,
        dribbling: 312,
        conversioneTiriGol: "23%",
        minutiGiocati: 23450,
        cartelliniGialli: 30,
        cartelliniRossi: 2,
        passaggiChiave: 187,
        velocitàMassima: "31.7 km/h",
        xG: 95.4
    },
    "Enrico Chiesa": {
        presenze: 138,
        gol: 45,
        assist: 17,
        tiriPartita: 2.9,
        golTesta: 7,
        dribbling: 167,
        conversioneTiriGol: "25%",
        minutiGiocati: 11620,
        cartelliniGialli: 20,
        cartelliniRossi: 0,
        passaggiChiave: 123,
        velocitàMassima: "32.5 km/h",
        xG: 42.3
    },

    "Roberto Mancini": {
        presenze: 424,
        gol: 132,
        assist: 87,
        tiriPartita: 2.7,
        golPunizione: 23,
        passaggiChiave: 412,
        conversioneTiriGol: "22%",
        minutiGiocati: 37280,
        cartelliniGialli: 28,
        cartelliniRossi: 3,
        dribblingRiusciti: 298,
        velocitàMassima: "30.6 km/h",
        xG: 120.4
    },
    "Gianluca Vialli": {
        presenze: 223,
        gol: 85,
        assist: 34,
        tiriPartita: 3.2,
        golTesta: 18,
        duelliVinti: "64%",
        conversioneTiriGol: "23%",
        minutiGiocati: 18560,
        cartelliniGialli: 19,
        cartelliniRossi: 2,
        velocitàMassima: "31.8 km/h",
        passaggiChiave: 134,
        xG: 77.5
    },
        "Antonio Candreva": {
            presenze: 89,
            gol: 19,
            assist: 28,
            tiriPartita: 2.4,
            cross: 242,
            assistPiazzati: 11,
            conversioneTiriGol: "15%",
            minutiGiocati: 7590,
            cartelliniGialli: 18,
            cartelliniRossi: 1,
            passaggiChiave: 211,
            velocitàMassima: "30.9 km/h",
            xA: 24.3
        },
        "Tomás Rincón": {
            presenze: 33,
            gol: 1,
            assist: 2,
            passaggiRiusciti: "87%",
            tackle: 78,
            intercetti: 45,
            chilometriPartita: 11.3,
            palleRecuperate: 198,
            cartelliniGialli: 10,
            cartelliniRossi: 1
        },
        "Abdelhamid Sabiri": {
            presenze: 23,
            gol: 3,
            assist: 2,
            passaggiRiusciti: "82%",
            tiriPartita: 1.7,
            dribbling: 34,
            chilometriPartita: 10.8,
            passaggiChiave: 41,
            cartelliniGialli: 4,
            cartelliniRossi: 0
        },
        "Gonzalo Villar": {
            presenze: 15,
            gol: 0,
            assist: 1,
            passaggiRiusciti: "91%",
            tackle: 23,
            intercetti: 19,
            chilometriPartita: 11.1,
            palleRecuperate: 87,
            cartelliniGialli: 2,
            cartelliniRossi: 0
        },
        "Morten Thorsby": {
            presenze: 74,
            gol: 7,
            assist: 3,
            duelliVinti: "67%",
            recuperi: 198,
            kmPartita: 11.8,
            passaggiRiusciti: "84%",
            cartelliniGialli: 16,
            cartelliniRossi: 1
        },
        "Lucas Torreira": {
            presenze: 71,
            gol: 4,
            assist: 1,
            passaggiRiusciti: "89%",
            tackle: 187,
            intercetti: 124,
            chilometriPartita: 11.5,
            recuperi: 267,
            dribblingRiusciti: 112,
            cartelliniGialli: 22,
            cartelliniRossi: 1
        },
        "Dennis Praet": {
            presenze: 98,
            gol: 4,
            assist: 6,
            passaggiRiusciti: "86%",
            dribbling: 112,
            kmPartita: 10.7,
            cartelliniGialli: 8,
            cartelliniRossi: 0
        },
        "Karol Linetty": {
            presenze: 132,
            gol: 11,
            assist: 13,
            passaggiRiusciti: "85%",
            tackle: 201,
            recuperi: 267,
            chilometriPartita: 11.2,
            cartelliniGialli: 12,
            cartelliniRossi: 0
        },
        "Roberto Soriano": {
            presenze: 104,
            gol: 17,
            assist: 8,
            tiriPartita: 1.8,
            passaggiRiusciti: "84%",
            kmPartita: 11.2,
            cartelliniGialli: 7,
            cartelliniRossi: 0
        },
        "Gastón Ramírez": {
            presenze: 95,
            gol: 17,
            assist: 11,
            golPunizione: 8,
            dribbling: 132,
            passaggiChiave: 87,
            chilometriPartita: 10.9,
            cartelliniGialli: 10,
            cartelliniRossi: 1
        },
        "Toninho Cerezo": {
            presenze: 146,
            gol: 19,
            assist: 31,
            passaggiRiusciti: "92%",
            tackle: 312,
            intercetti: 278,
            chilometriPartita: 12.1,
            cartelliniGialli: 9,
            cartelliniRossi: 0
        },
        "Siniša Mihajlović": {
            presenze: 110,
            gol: 12,
            assist: 18,
            golPunizione: 9,
            passaggiRiusciti: "84%",
            tackle: 189,
            chilometriPartita: 10.4,
            cross: 243,
            cartelliniGialli: 31,
            cartelliniRossi: 5
        },
        "Fausto Pari": {
            presenze: 245,
            gol: 12,
            assist: 18,
            passaggiRiusciti: "86%",
            tackle: 456,
            recuperi: 534,
            chilometriPartita: 11.9,
            cartelliniGialli: 14,
            cartelliniRossi: 0
        },
        "Vladimir Jugović": {
            presenze: 110,
            gol: 14,
            assist: 21,
            passaggiRiusciti: "88%",
            tackle: 234,
            kmPartita: 11.7,
            cartelliniGialli: 12,
            cartelliniRossi: 0
        },
        "Sergio Volpi": {
            presenze: 196,
            gol: 19,
            assist: 23,
            passaggiRiusciti: "89%",
            tackle: 345,
            intercetti: 278,
            chilometriPartita: 11.3,
            cartelliniGialli: 18,
            cartelliniRossi: 1
        },
        "Angelo Palombo": {
            presenze: 449,
            gol: 22,
            assist: 31,
            passaggiRiusciti: "87%",
            tackle: 876,
            recuperi: 1023,
            chilometriPartita: 11.7,
            cartelliniGialli: 47,
            cartelliniRossi: 3
        },
        "Daniele Mannini": {
            presenze: 102,
            gol: 17,
            assist: 14,
            tiriPartita: 1.8,
            cross: 187,
            dribbling: 156,
            chilometriPartita: 10.6,
            cartelliniGialli: 5,
            cartelliniRossi: 0
        },
        "Gennaro Delvecchio": {
            presenze: 142,
            gol: 11,
            assist: 16,
            passaggiRiusciti: "83%",
            tackle: 267,
            recuperi: 312,
            chilometriPartita: 10.9,
            cartelliniGialli: 9,
            cartelliniRossi: 1
        },

        "Albin Ekdal": {
            presenze: 154,
            gol: 8,
            assist: 14,
            passaggiRiusciti: "89%",
            recuperi: 267,
            tackle: 234,
            chilometriPartita: 11.6,
            cartelliniGialli: 38,
            cartelliniRossi: 2
        },
        "Attila Lombardo": {
            presenze: 98,
            gol: 23,
            assist: 31,
            dribbling: 187,
            cross: 245,
            kmPartita: 11.3,
            passaggiRiusciti: "86%",
            cartelliniGialli: 15,
            cartelliniRossi: 0
        },
        "Ruud Gullit": {
            presenze: 85,
            gol: 31,
            assist: 22,
            tiriPartita: 2.8,
            duelliVinti: "71%",
            passaggiChiave: 98,
            chilometriPartita: 11.0,
            cartelliniGialli: 10,
            cartelliniRossi: 1
        },
        "David Platt": {
            presenze: 55,
            gol: 17,
            assist: 9,
            passaggiRiusciti: "87%",
            tackle: 112,
            kmPartita: 11.2,
            cartelliniGialli: 6,
            cartelliniRossi: 0
        },
            "Omar Colley": {
                presenze: 143,
                gol: 3,
                tackle: 246,
                intercetti: 312,
                duelliVinti: "72%",
                respinte: 486,
                palleRecuperate: 417,
                cartelliniGialli: 27,
                cartelliniRossi: 3,
                chilometriPartita: 9.2
            },
            "Bartosz Bereszyński": {
                presenze: 145,
                gol: 1,
                assist: 7,
                tackle: 312,
                cross: 187,
                duelliVinti: "64%",
                palleRecuperate: 412,
                cartelliniGialli: 18,
                cartelliniRossi: 0
            },
            "Alex Ferrari": {
                presenze: 78,
                gol: 1,
                tackle: 134,
                intercetti: 156,
                duelliVinti: "68%",
                respinte: 267,
                palleRecuperate: 289,
                cartelliniGialli: 9,
                cartelliniRossi: 1
            },
            "Tommaso Augello": {
                presenze: 102,
                gol: 2,
                assist: 9,
                cross: 201,
                tackle: 178,
                intercetti: 123,
                palleRecuperate: 354,
                cartelliniGialli: 12,
                cartelliniRossi: 0
            },
            "Maya Yoshida": {
                presenze: 72,
                gol: 3,
                tackle: 156,
                intercetti: 187,
                duelliVinti: "70%",
                respinte: 312,
                palleRecuperate: 398,
                cartelliniGialli: 10,
                cartelliniRossi: 0
            },
            "Joachim Andersen": {
                presenze: 42,
                gol: 1,
                tackle: 87,
                intercetti: 112,
                duelliVinti: "69%",
                respinte: 178,
                palleRecuperate: 221,
                cartelliniGialli: 5,
                cartelliniRossi: 0
            },
            "Milan Škriniar": {
                presenze: 35,
                gol: 2,
                tackle: 76,
                intercetti: 98,
                duelliVinti: "73%",
                respinte: 156,
                palleRecuperate: 132,
                cartelliniGialli: 8,
                cartelliniRossi: 0,
                chilometriPartita: 9.8
            },
            "Matías Silvestre": {
                presenze: 78,
                gol: 3,
                tackle: 167,
                intercetti: 201,
                duelliVinti: "66%",
                respinte: 289,
                palleRecuperate: 345,
                cartelliniGialli: 14,
                cartelliniRossi: 1
            },
            "Vasco Regini": {
                presenze: 107,
                gol: 2,
                assist: 3,
                tackle: 234,
                intercetti: 178,
                duelliVinti: "62%",
                palleRecuperate: 297,
                cartelliniGialli: 11,
                cartelliniRossi: 0
            },
            "Pietro Vierchowod": {
                presenze: 493,
                gol: 21,
                tackle: 876,
                intercetti: 1023,
                duelliVinti: "76%",
                respinte: 1567,
                palleRecuperate: 1045,
                cartelliniGialli: 38,
                cartelliniRossi: 4,
                passaggiRiusciti: "85%"
            },
            "Moreno Mannini": {
                presenze: 377,
                gol: 11,
                assist: 23,
                tackle: 678,
                intercetti: 534,
                duelliVinti: "68%",
                palleRecuperate: 876,
                cartelliniGialli: 27,
                cartelliniRossi: 2
            },
            "Marco Lanna": {
                presenze: 289,
                gol: 7,
                assist: 12,
                tackle: 578,
                intercetti: 456,
                duelliVinti: "65%",
                palleRecuperate: 734,
                cartelliniGialli: 22,
                cartelliniRossi: 1
            },

                "Emil Audero": {
                    presenze: 168,
                    cleanSheet: 44,
                    parate: 498,
                    rigoriParati: 8,
                    minutiImbattuto: 511,
                    uscite: 324,
                    percentualeParate: "74%",
                    erroriGravi: 4,
                    duelliAereiVinti: "63%",
                    tocchiPalla: 2368
                },
                "Wladimiro Falcone": {
                    presenze: 27,
                    cleanSheet: 7,
                    parate: 89,
                    rigoriParati: 1,
                    minutiImbattuto: 203,
                    uscite: 67,
                    percentualeParate: "69%",
                    erroriGravi: 2,
                    duelliAereiVinti: "58%",
                    tocchiPalla: 689
                },
                "Christian Puggioni": {
                    presenze: 18,
                    cleanSheet: 4,
                    parate: 54,
                    rigoriParati: 0,
                    minutiImbattuto: 156,
                    uscite: 43,
                    percentualeParate: "71%",
                    erroriGravi: 1,
                    duelliAereiVinti: "55%",
                    tocchiPalla: 478
                },
                "Emiliano Viviano": {
                    presenze: 115,
                    cleanSheet: 31,
                    parate: 342,
                    rigoriParati: 5,
                    minutiImbattuto: 412,
                    uscite: 278,
                    percentualeParate: "73%",
                    erroriGravi: 3,
                    duelliAereiVinti: "62%",
                    tocchiPalla: 1762
                },
                "Gianluca Pagliuca": {
                    presenze: 198,
                    cleanSheet: 67,
                    parate: 623,
                    rigoriParati: 12,
                    minutiImbattuto: 678,
                    uscite: 412,
                    percentualeParate: "77%",
                    erroriGravi: 5,
                    duelliAereiVinti: "70%",
                    tocchiPalla: 2789
                }
            
        };
        





// Database delle domande
const questions = [
    {
        text: "Chi ha segnato più gol in carriera con la Sampdoria?",
        compare: (a, b) => (playerStats[a.name].gol || 0) - (playerStats[b.name].gol || 0),
        detail: player => `${playerStats[player.name].gol || 0} gol totali con la Sampdoria`
    },
    {
        text: "Chi ha fornito più assist in carriera?",
        compare: (a, b) => (playerStats[a.name].assist || 0) - (playerStats[b.name].assist || 0),
        detail: player => `${playerStats[player.name].assist || 0} assist totali`
    },
    {
        text: "Chi ha giocato più partite con la maglia della Sampdoria?",
        compare: (a, b) => (playerStats[a.name].presenze || 0) - (playerStats[b.name].presenze || 0),
        detail: player => `${playerStats[player.name].presenze || 0} presenze totali`
    },
    {
        text: "Chi ha segnato più gol su punizione?",
        compare: (a, b) => (playerStats[a.name].golPunizione || 0) - (playerStats[b.name].golPunizione || 0),
        detail: player => `${playerStats[player.name].golPunizione || 0} gol su punizione`
    },
    {
        text: "Chi ha effettuato più dribbling riusciti in carriera?",
        compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
        detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
    },
    {
        text: "Chi ha segnato più gol di testa?",
        compare: (a, b) => (playerStats[a.name].golTesta || 0) - (playerStats[b.name].golTesta || 0),
        detail: player => `${playerStats[player.name].golTesta || 0} gol di testa`
    },
    {
        text: "Chi ha vinto più duelli aerei?",
        compare: (a, b) => parseFloat(playerStats[a.name].duelliVinti || 0) - parseFloat(playerStats[b.name].duelliVinti || 0),
        detail: player => `${playerStats[player.name].duelliVinti || 0}% di duelli aerei vinti`
    },
    {
        text: "Chi ha subito più falli in una stagione?",
        compare: (a, b) => (playerStats[a.name].falliSubiti || 0) - (playerStats[b.name].falliSubiti || 0),
        detail: player => `${playerStats[player.name].falliSubiti || 0} falli subiti in una stagione`
    },
    {
        text: "Chi ha effettuato più intercetti in carriera?",
        compare: (a, b) => (playerStats[a.name].intercetti || 0) - (playerStats[b.name].intercetti || 0),
        detail: player => `${playerStats[player.name].intercetti || 0} intercetti totali`
    },
    {
        text: "Chi ha più clean sheet in carriera?",
        compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
        detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
    },
    {
        text: "Chi ha parato più rigori?",
        compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
        detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati`
    },
    {
        text: "Chi ha effettuato più cross in carriera?",
        compare: (a, b) => (playerStats[a.name].cross || 0) - (playerStats[b.name].cross || 0),
        detail: player => `${playerStats[player.name].cross || 0} cross totali`
    },
    {
        text: "Chi ha corso più km in una partita?",
        compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
        detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in una partita`
    },
    {
        text: "Chi ha ricevuto più cartellini gialli?",
        compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
        detail: player => `${playerStats[player.name].cartelliniGialli || 0} cartellini gialli`
    },
    {
        text: "Chi ha segnato più gol nei minuti finali (80'+)?",
        compare: (a, b) => (playerStats[a.name].golUltimi10Min || 0) - (playerStats[b.name].golUltimi10Min || 0),
        detail: player => `${playerStats[player.name].golUltimi10Min || 0} gol negli ultimi 10 minuti`
    },
    {
        text: "Chi ha effettuato più tackle in carriera?",
        compare: (a, b) => (playerStats[a.name].tackle || 0) - (playerStats[b.name].tackle || 0),
        detail: player => `${playerStats[player.name].tackle || 0} tackle riusciti`
    },
    {
        text: "Chi ha fatto più recuperi palla?",
        compare: (a, b) => (playerStats[a.name].recuperi || 0) - (playerStats[b.name].recuperi || 0),
        detail: player => `${playerStats[player.name].recuperi || 0} recuperi di palla`
    },
    {
        text: "Chi ha la percentuale più alta di passaggi riusciti?",
        compare: (a, b) => parseFloat(playerStats[a.name].passaggiRiusciti || 0) - parseFloat(playerStats[b.name].passaggiRiusciti || 0),
        detail: player => `${playerStats[player.name].passaggiRiusciti || 0}% di passaggi riusciti`
    },
    {
        text: "Chi ha giocato più stagioni consecutive con la Sampdoria?",
        compare: (a, b) => (playerStats[a.name].stagioniConsecutive || 0) - (playerStats[b.name].stagioniConsecutive || 0),
        detail: player => `${playerStats[player.name].stagioniConsecutive || 0} stagioni consecutive`
    },
        {
            text: "Chi ha segnato più gol in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].maxGolStagione || 0) - (playerStats[b.name].maxGolStagione || 0),
            detail: player => `${playerStats[player.name].maxGolStagione || 0} gol in una stagione`
        },
        {
            text: "Chi ha servito più assist in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].maxAssistStagione || 0) - (playerStats[b.name].maxAssistStagione || 0),
            detail: player => `${playerStats[player.name].maxAssistStagione || 0} assist in una stagione`
        },
        {
            text: "Chi ha parato più rigori in una stagione?",
            compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
            detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati in una stagione`
        },
        {
            text: "Chi ha effettuato più dribbling riusciti in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
            detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
        },
        {
            text: "Chi ha il record di clean sheet in una stagione?",
            compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
            detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
        },
        {
            text: "Chi ha segnato più gol nell'area di rigore?",
            compare: (a, b) => (playerStats[a.name].golArea || 0) - (playerStats[b.name].golArea || 0),
            detail: player => `${playerStats[player.name].golArea || 0} gol in area di rigore`
        },
        {
            text: "Chi ha segnato più gol al debutto con la Sampdoria?",
            compare: (a, b) => (playerStats[a.name].golDebutto || 0) - (playerStats[b.name].golDebutto || 0),
            detail: player => `${playerStats[player.name].golDebutto || 0} gol al debutto`
        },
        {
            text: "Chi ha toccato più palloni in una stagione?",
            compare: (a, b) => (playerStats[a.name].tocchiPalla || 0) - (playerStats[b.name].tocchiPalla || 0),
            detail: player => `${playerStats[player.name].tocchiPalla || 0} tocchi di palla in stagione`
        },
        {
            text: "Chi ha il record di partite consecutive giocate?",
            compare: (a, b) => (playerStats[a.name].partiteConsecutive || 0) - (playerStats[b.name].partiteConsecutive || 0),
            detail: player => `${playerStats[player.name].partiteConsecutive || 0} partite consecutive`
        },
        {
            text: "Chi ha corso più chilometri in una stagione?",
            compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
            detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in media a partita`
        },
        {
            text: "Chi ha realizzato più assist su calcio d'angolo?",
            compare: (a, b) => (playerStats[a.name].assistPiazzati || 0) - (playerStats[b.name].assistPiazzati || 0),
            detail: player => `${playerStats[player.name].assistPiazzati || 0} assist su calcio d'angolo`
        },
        {
            text: "Chi ha commesso più falli in carriera?",
            compare: (a, b) => (playerStats[a.name].falliCommessi || 0) - (playerStats[b.name].falliCommessi || 0),
            detail: player => `${playerStats[player.name].falliCommessi || 0} falli commessi`
        },
        {
            text: "Chi ha il record di più passaggi chiave effettuati?",
            compare: (a, b) => (playerStats[a.name].passaggiChiave || 0) - (playerStats[b.name].passaggiChiave || 0),
            detail: player => `${playerStats[player.name].passaggiChiave || 0} passaggi chiave`
        },
        {
            text: "Chi ha segnato più gol da fuori area?",
            compare: (a, b) => (playerStats[a.name].golFuoriArea || 0) - (playerStats[b.name].golFuoriArea || 0),
            detail: player => `${playerStats[player.name].golFuoriArea || 0} gol da fuori area`
        },
        {
            text: "Chi ha la percentuale più alta di conversione tiri/gol?",
            compare: (a, b) => parseFloat(playerStats[a.name].conversioneTiriGol || 0) - parseFloat(playerStats[b.name].conversioneTiriGol || 0),
            detail: player => `${playerStats[player.name].conversioneTiriGol || 0}% di conversione tiri/gol`
        },
        {
            text: "Chi ha giocato il maggior numero di minuti in una stagione?",
            compare: (a, b) => (playerStats[a.name].minutiGiocati || 0) - (playerStats[b.name].minutiGiocati || 0),
            detail: player => `${playerStats[player.name].minutiGiocati || 0} minuti giocati in una stagione`
        },
        {
            text: "Chi ha effettuato più respinte difensive?",
            compare: (a, b) => (playerStats[a.name].respinte || 0) - (playerStats[b.name].respinte || 0),
            detail: player => `${playerStats[player.name].respinte || 0} respinte difensive`
        },
        {
            text: "Chi ha subito più ammonizioni in una stagione?",
            compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
            detail: player => `${playerStats[player.name].cartelliniGialli || 0} ammonizioni`
        },
        {
            text: "Chi ha giocato più partite senza essere sostituito?",
            compare: (a, b) => (playerStats[a.name].partiteIntere || 0) - (playerStats[b.name].partiteIntere || 0),
            detail: player => `${playerStats[player.name].partiteIntere || 0} partite giocate per intero`
        },
        {
            text: "Chi ha mantenuto più minuti di imbattibilità?",
            compare: (a, b) => (playerStats[a.name].minutiImbattuto || 0) - (playerStats[b.name].minutiImbattuto || 0),
            detail: player => `${playerStats[player.name].minutiImbattuto || 0} minuti di imbattibilità`
        }
    ];
    

        


// Componente Header separato
const Header = ({ playerProfile, onLogout }) => (
    <nav className="bg-blue-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img 
                    src="/images/logo/sampdoria-logo.png" 
                    alt="Logo Sampdoria" 
                    className="h-12 w-12" 
                />
                <h1 className="text-2xl font-bold">NFooTball per Sampdoria</h1>
            </div>
            {playerProfile.name && (
                <div className="flex items-center space-x-4">
                    <img 
                        src={playerProfile.avatar} 
                        alt="Avatar" 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                    />
                    <span className="font-bold">{playerProfile.name}</span>
                    <button 
                        onClick={onLogout}
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            )}
        </div>
    </nav>
);

const StatsModal = ({ player, isOpen, onClose }) => {
    const stats = playerStats[player?.name];
    
    if (!stats || !player) return null;

    const formatStatLabel = (key) => {
        const labels = {
            presenze: 'Presenze',
            gol: 'Gol',
            assist: 'Assist',
            tiriPartita: 'Tiri/Partita',
            golTesta: 'Gol di testa',
            golPunizione: 'Gol punizione',
            golUltimi10Min: 'Gol ultimi 10\'',
            cleanSheet: 'Clean sheet',
            parate: 'Parate',
            rigoriParati: 'Rigori parati',
            minutiImbattuto: 'Minuti imbattuto',
            uscite: 'Uscite',
            tackle: 'Tackle',
            intercetti: 'Intercetti',
            duelliVinti: 'Duelli vinti',
            passaggiRiusciti: 'Pass. riusciti',
            respinte: 'Respinte',
            recuperi: 'Recuperi',
            cross: 'Cross',
            assistPiazzati: 'Assist da piazzati',
            golArea: 'Gol in area'
        };
        return labels[key] || key;
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-3xl">
                <div className="flex justify-between items-start">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex items-center gap-4">
                                <img 
                                    src={player.image} 
                                    alt={player.name}
                                    className="w-16 h-16 rounded-full border-2 border-blue-900"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position} • {player.years}</p>
                                </div>
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{formatStatLabel(key)}</p>
                            <p className="text-lg font-bold text-blue-900">{value}</p>
                        </div>
                    ))}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};


const avatars = [
    '/images/avatars/avatar1.png',
    '/images/avatars/avatar2.png',
    '/images/avatars/avatar3.png'
];

const Setup = () => {
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    
    const handleSave = () => {
        if (username.trim()) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('playerName', username);
                localStorage.setItem('playerAvatar', selectedAvatar);
            }
            setPlayerProfile({ name: username, avatar: selectedAvatar });
            setGameState('selection');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Personalizza il tuo profilo</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">Nome Giocatore:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded text-gray-900 bg-white"
                            placeholder="Inserisci il tuo nome"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900">Scegli il tuo Avatar</label>
                        <div className="flex justify-center space-x-4">
                            {avatars.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedAvatar(avatar)}
                                    className={`p-2 rounded-full border-4 transition-all ${
                                        selectedAvatar === avatar 
                                        ? 'border-blue-900 scale-110' 
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <img 
                                        src={avatar} 
                                        alt={`Avatar ${index + 1}`} 
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                        disabled={!username.trim()}
                    >
                        Salva Profilo
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModeSelection = ({ onSelectMode }) => {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Scegli la modalità di gioco</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <button
            onClick={() => onSelectMode('singleplayer')}
            className="w-full py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Gioca contro il Computer
          </button>
          <button
            onClick={() => onSelectMode('multiplayer')}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Gioca contro un Amico
          </button>
        </CardContent>
      </Card>
    );
  };

  const PlayerSelection = ({ 
    selectedPlayers, 
    setSelectedPlayers, 
    setGameState,
    setSelectedPlayerStats,
    gameMode,
    currentPlayer,
    nextState
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handlePlayerSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(prev => prev.filter(p => p !== player));
        } else if (selectedPlayers.length < 5) {
            setSelectedPlayers(prev => [...prev, player]);
        }
    };

    const handleContinue = () => {
        setGameState(nextState);
    };

    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="w-full max-w-6xl mx-auto shadow-xl">
            <CardHeader className="bg-blue-900 text-white p-6 rounded-t-lg">
    <div>
        <CardTitle className="text-2xl font-bold">
            {gameMode === 'multiplayer' 
                ? `Giocatore ${currentPlayer}: Forma la tua squadra` 
                : 'Forma la tua squadra'}
        </CardTitle>
        <p className="text-blue-200 mt-2">Seleziona 5 giocatori blucerchiati degli ultimi 10 anni</p>
    </div>
</CardHeader>
            
            <div className="sticky top-0 z-40 bg-white shadow-md">
    <div className="w-full bg-gray-200 h-1.5">
        <div 
            className="bg-blue-600 h-1.5 transition-all duration-300" 
            style={{width: `${(selectedPlayers.length / 5) * 100}%`}}
        ></div>
    </div>
    <div className="flex justify-between items-center p-4 bg-white">
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Cerca un giocatore..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-blue-900/20 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900/50" size={20} />
        </div>
        <div className="flex items-center space-x-4 ml-4">
            <div className="text-right">
                <div className="text-sm text-blue-900/80">Giocatori selezionati</div>
                <div className={`text-2xl font-bold ${
                    selectedPlayers.length === 0 ? 'text-red-400' :
                    selectedPlayers.length < 3 ? 'text-yellow-400' :
                    selectedPlayers.length < 5 ? 'text-gray-900' :
                    'text-green-400'
                }`}>
                    {selectedPlayers.length}/5
                </div>
            </div>
            <button
                onClick={handleContinue}
                disabled={selectedPlayers.length !== 5}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-800 transition-colors font-bold"
            >
                Continua
            </button>
        </div>
    </div>
</div>

            <CardContent className="p-6">
                {['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'].map(position => (
                    <div key={position} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900/20 pb-2">{position}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredPlayers
                                .filter(p => p.position === position)
                                .map(player => (
                                    <div
                                        key={player.name}
                                        className={`relative p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl cursor-pointer group ${
                                            selectedPlayers.includes(player) 
                                            ? 'border-2 border-blue-900 bg-blue-50' 
                                            : 'hover:border-blue-900/30 hover:bg-blue-50/20'
                                        }`}
                                        onClick={(e) => {
                                            // Se il click è sull'icona info, non selezionare il giocatore
                                            if (e.target.closest('button')) return;
                                            
                                            // Se il click è sul pulsante info, mostrare le statistiche
                                            if (e.target.closest('button')) {
                                                setSelectedPlayerStats(player);
                                                return;
                                            }
                                            
                                            // Altrimenti, seleziona/deseleziona il giocatore
                                            handlePlayerSelect(player);
                                        }}
                                    >
                                        <button 
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 mobile:opacity-100"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Impedisce la selezione del giocatore
                                                setSelectedPlayerStats(player);
                                            }}
                                        >
                                            <Info className="h-4 w-4 text-blue-900" />
                                        </button>

                                        <img 
                                            src={player.image}
                                            alt={player.name}
                                            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-900/20 object-cover aspect-square group-hover:scale-105 transition-transform"
                                        />
                                        <div className="mt-3 text-center">
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-900">{player.name}</h3>
                                            <p className="text-sm text-gray-600">{player.position}</p>
                                            <p className="text-xs text-gray-500">{player.years}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const TeamDisplay = ({ player1Team, player2Team, onStartQuiz, gameMode, player1Name, player2Name }) => {
    const [isLoading, setIsLoading] = useState(gameMode === 'singleplayer');

    useEffect(() => {
        if (gameMode === 'singleplayer') {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [gameMode]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900 mb-4"></div>
                <p className="text-gray-700 text-lg">Il computer sta scegliendo la sua squadra...</p>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-2xl text-gray-900">Le Squadre</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Squadra Giocatore 1 */}
                    <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-900">{player1Name}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {player1Team.map(player => (
                                <div 
                                    key={player.name} 
                                    className="flex flex-col items-center bg-white rounded-lg p-3 shadow transition-transform hover:scale-105"
                                >
                                    <img 
                                        src={player.image}
                                        alt={player.name}
                                        className="w-24 h-24 rounded-full object-cover aspect-square border-4 border-blue-500 mb-2"
                                    />
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-900 text-sm">{player.name}</p>
                                        <p className="text-xs text-gray-600">{player.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divisore */}
                    <div className="hidden md:block w-0.5 h-96 bg-gray-300"></div>

                    {/* Squadra Giocatore 2 o Computer */}
                    <div className="w-full md:w-1/2 bg-red-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-red-900">
                            {gameMode === 'singleplayer' ? 'Squadra Computer' : player2Name}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {player2Team.map(player => (
                                <div 
                                    key={player.name} 
                                    className="flex flex-col items-center bg-white rounded-lg p-3 shadow transition-transform hover:scale-105"
                                >
                                    <img 
                                        src={player.image}
                                        alt={player.name}
                                        className="w-24 h-24 rounded-full object-cover aspect-square border-4 border-red-500 mb-2"
                                    />
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-900 text-sm">{player.name}</p>
                                        <p className="text-xs text-gray-600">{player.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onStartQuiz}
                        className="bg-blue-900 text-white px-10 py-3 rounded-lg hover:bg-blue-800 transition-colors text-lg font-bold shadow-md"
                    >
                        Inizia Quiz
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

const Countdown = ({ timeLeft, totalTime = 10 }) => {
    const percentage = (timeLeft / totalTime) * 100;
    const strokeColor = timeLeft <= 3 ? '#EF4444' : '#1E3A8A'; // Rosso quando sotto 3 secondi, blu altrimenti

    return (
        <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#E6E6E6" strokeWidth="3" />
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="3"
                        strokeDasharray="100 100"
                        strokeDashoffset={percentage}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                    <span className={`${timeLeft <= 3 ? 'text-red-500' : 'text-blue-900'}`}>
                        {timeLeft}
                    </span>
                </div>
                <div 
                    className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"
                    style={{ 
                        display: timeLeft <= 3 ? 'block' : 'none',
                        animationDuration: '1s' 
                    }}
                />
            </div>
            <span className="text-gray-600">Secondi rimanenti</span>
        </div>
    );
};

const QuizSection = ({ player1Team, player2Team, onComplete, gameMode, player1Name, player2Name }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [player1SelectedForQuestion, setPlayer1SelectedForQuestion] = useState(null);
    const [player2SelectedForQuestion, setPlayer2SelectedForQuestion] = useState(null);
    const [winner, setWinner] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1);

    useEffect(() => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
    }, []);

    useEffect(() => {
        let timer;
        if (!answered && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !answered) {
            handleAnswer(null);
        }
        return () => clearInterval(timer);
    }, [timeLeft, answered]);

    const getComputerAnswer = () => {
        return player2Team[Math.floor(Math.random() * player2Team.length)];
    };

    const handleAnswer = (playerAnswer) => {
        if (answered) return;
        
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        if (gameMode === 'singleplayer') {
            setAnswered(true);
            setPlayer1SelectedForQuestion(playerAnswer);
            const computerAnswer = getComputerAnswer();
            setPlayer2SelectedForQuestion(computerAnswer);

            if (playerAnswer && computerAnswer) {
                const comparisonResult = currentQuestion.compare(playerAnswer, computerAnswer);
                
                if (comparisonResult > 0) {
                    setPlayer1Score(prev => prev + 3);
                    setWinner(playerAnswer);
                } else if (comparisonResult < 0) {
                    setPlayer2Score(prev => prev + 3);
                    setWinner(computerAnswer);
                } else {
                    setPlayer1Score(prev => prev + 1);
                    setPlayer2Score(prev => prev + 1);
                    setWinner(null);
                }
            } else if (playerAnswer) {
                setPlayer1Score(prev => prev + 3);
                setWinner(playerAnswer);
            } else if (computerAnswer) {
                setPlayer2Score(prev => prev + 3);
                setWinner(computerAnswer);
            }
        } else {
            if (currentPlayer === 1) {
                setPlayer1SelectedForQuestion(playerAnswer);
                setCurrentPlayer(2);
                setTimeLeft(10);
            } else {
                setAnswered(true);
                setPlayer2SelectedForQuestion(playerAnswer);
                if (player1SelectedForQuestion && playerAnswer) {
                    const comparisonResult = currentQuestion.compare(player1SelectedForQuestion, playerAnswer);
                    if (comparisonResult > 0) {
                        setPlayer1Score(prev => prev + 3);
                        setWinner(player1SelectedForQuestion);
                    } else if (comparisonResult < 0) {
                        setPlayer2Score(prev => prev + 3);
                        setWinner(playerAnswer);
                    } else {
                        setPlayer1Score(prev => prev + 1);
                        setPlayer2Score(prev => prev + 1);
                        setWinner(null);
                    }
                }
            }
        }

        if (answered || gameMode === 'singleplayer' || currentPlayer === 2) {
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setAnswered(false);
                    setTimeLeft(10);
                    setPlayer1SelectedForQuestion(null);
                    setPlayer2SelectedForQuestion(null);
                    setWinner(null);
                    setCurrentPlayer(1);
                } else {
                    onComplete({ player1Score, player2Score });
                }
            }, 3000);
        }
    };

    if (quizQuestions.length === 0) return null;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">
                        <span className="text-blue-900">Domanda </span>
                        <span className="text-blue-900 font-bold text-xl">{currentQuestionIndex + 1}</span>
                        <span className="text-blue-900"> di </span>
                        <span className="text-blue-900 font-bold text-xl">5</span>
                    </div>
                    <Countdown timeLeft={timeLeft} />
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                        className="h-2 bg-blue-900 rounded-full transition-all"
                        style={{ width: `${((currentQuestionIndex + 1) / 5) * 100}%` }}
                    />
                </div>
            </div>
    
            <Card className="mb-8 border border-blue-300 shadow-lg">
                <CardContent className="p-6 flex items-center justify-center min-h-[150px]">
                    <h2 className="text-3xl font-bold text-center text-blue-900">
                        {currentQuestion.text}
                    </h2>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-blue-50">
                    <CardHeader>
                        <CardTitle className="text-center text-blue-900">{player1Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        {player1Team.map((player, index) => (
                            <div
                                key={`player1-${player.name}-${player.position}-${index}`}
                                className={`relative p-4 bg-white rounded-lg shadow transition-transform hover:scale-105 cursor-pointer ${
                                    player1SelectedForQuestion?.name === player.name ? 'border-4 border-blue-500' : ''
                                }`}
                                onClick={() => !answered && (gameMode === 'singleplayer' || currentPlayer === 1) && handleAnswer(player)}
                            >
                                <img 
                                    src={player.image}
                                    alt={player.name}
                                    className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500 object-cover aspect-square"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position}</p>
                                    <p className="text-xs text-gray-500">{player.years}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className={gameMode === 'singleplayer' ? 'bg-red-50' : 'bg-green-50'}>
                    <CardHeader>
                        <CardTitle className="text-center text-red-900">{player2Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        {player2Team.map((player, index) => (
                            <div 
                                key={`player2-${player.name}-${player.position}-${index}`}
                                className={`p-4 bg-white rounded-lg shadow ${
                                    player2SelectedForQuestion?.name === player.name ? 'border-4 border-red-500' : ''
                                } ${gameMode === 'multiplayer' ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                                onClick={() => gameMode === 'multiplayer' && !answered && currentPlayer === 2 && handleAnswer(player)}
                            >
                                <img 
                                    src={player.image}
                                    alt={player.name}
                                    className="w-20 h-20 mx-auto rounded-full border-4 border-red-500 object-cover aspect-square"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position}</p>
                                    <p className="text-xs text-gray-500">{player.years}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {answered && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full relative">
                        <h3 className="text-2xl font-bold text-center mb-6 text-white">Risultato</h3>
                        <div className="flex justify-between items-center">
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibold mb-4 text-white">{player1Name}</h4>
                                {player1SelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${player1SelectedForQuestion === winner ? 'border-green-500 bg-green-700' : winner ? 'border-red-500 bg-red-700' : 'border-yellow-500 bg-yellow-700'}`}>
                                        <img 
                                            src={player1SelectedForQuestion.image}
                                            alt={player1SelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{player1SelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{player1SelectedForQuestion.position}</p>
                                        <p className="text-sm text-gray-300">{currentQuestion.detail(player1SelectedForQuestion)}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibold mb-4 text-white">{player2Name}</h4>
                                {player2SelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${player2SelectedForQuestion === winner ? 'border-green-500 bg-green-700' : winner ? 'border-red-500 bg-red-700' : 'border-yellow-500 bg-yellow-700'}`}>
                                        <img 
                                            src={player2SelectedForQuestion.image}
                                            alt={player2SelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{player2SelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{player2SelectedForQuestion.position}</p>
                                        <p className="text-sm text-gray-300">{currentQuestion.detail(player2SelectedForQuestion)}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            {winner ? (
                                <p className="text-xl text-white">
                                    Vincitore: <span className="font-bold text-green-400">{winner.name}</span>
                                </p>
                            ) : (
                                <p className="text-xl text-yellow-400">Pareggio</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Results = ({ scores, onRestart, gameMode, player1Name, player2Name }) => {
    console.log("Dati ricevuti in Results:", scores, gameMode, player1Name, player2Name);

    const { player1Score, player2Score } = scores;
    let resultType, title, description, iconEmoji;

    if (player1Score > player2Score) {
        resultType = 'Vittoria';
        if (gameMode === 'singleplayer') {
            title = 'Hai Vinto! 🏆';
            description = 'Complimenti! Hai dimostrato di conoscere alla perfezione la storia della Sampdoria.';
        } else {
            title = `${player1Name} ha vinto! 🏆`;
            description = `Grande partita! ${player1Name} si è aggiudicato la sfida.`;
        }
        iconEmoji = '🎉';
    } else if (player1Score < player2Score) {
        resultType = 'Sconfitta';
        if (gameMode === 'singleplayer') {
            title = 'Ha Vinto il Computer 🤖';
            description = 'Non scoraggiarti, c\'è sempre spazio per imparare di più sulla tua squadra del cuore.';
        } else {
            title = `${player2Name} ha vinto! 🏆`;
            description = `Grande partita! ${player2Name} si è aggiudicato la sfida.`;
        }
        iconEmoji = '💡';
    } else {
        resultType = 'Pareggio';
        title = 'Avete Pareggiato! ⚖️';
        description = 'Nessuno ha avuto la meglio. Un risultato che dimostra la vostra grande conoscenza.';
        iconEmoji = '🤝';
    }

    return (
        <Card className="max-w-xl mx-auto border-2 border-blue-900 shadow-lg">
            <CardContent className="p-8 space-y-6">
                <div className="text-center">
                    <div className="text-6xl mb-4">{iconEmoji}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-gray-700 mb-6">{description}</p>

                    <div className="flex justify-center space-x-8 mb-6">
                        <div className="text-center">
                            <span className="block text-lg font-semibold text-gray-600 mb-2">{player1Name}</span>
                            <div className={`text-4xl font-bold ${player1Score > player2Score ? 'text-green-700' : 'text-gray-900'}`}>
                                {player1Score} punti
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-semibold text-gray-600 mb-2">{player2Name}</span>
                            <div className={`text-4xl font-bold ${player1Score < player2Score ? 'text-red-700' : 'text-gray-900'}`}>
                                {player2Score} punti
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-6 border-2 border-blue-900 text-blue-900 
                        rounded-lg font-bold hover:bg-blue-900 hover:text-white 
                        transition-colors duration-300"
                    >
                        Gioca Ancora
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

const SampdoriaQuiz = () => {
    const [computerTeam, setComputerTeam] = useState([]);
    const [gameState, setGameState] = useState('setup');
    const [gameMode, setGameMode] = useState(null);
    const [playerProfile, setPlayerProfile] = useState({    
        name: '',
        avatar: '/api/placeholder/40/40'
    });
    const [player2Profile, setPlayer2Profile] = useState(null);
    const [player1SelectedPlayers, setPlayer1SelectedPlayers] = useState([]);
    const [player2SelectedPlayers, setPlayer2SelectedPlayers] = useState([]);
    const [selectedPlayerStats, setSelectedPlayerStats] = useState(null);
    const [finalScores, setFinalScores] = useState(null);

    useEffect(() => {
        const storedName = typeof window !== 'undefined' ? localStorage.getItem('playerName') : null;
        const storedAvatar = typeof window !== 'undefined' ? localStorage.getItem('playerAvatar') : null;
        
        if (storedName) {
            setPlayerProfile({
                name: storedName,
                avatar: storedAvatar || '/api/placeholder/40/40'
            });
            setGameState('modeSelection');
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('playerName');
            localStorage.removeItem('playerAvatar');
        }
        setGameState('setup');
        setPlayerProfile({ name: '', avatar: '/api/placeholder/40/40' });
        setPlayer1SelectedPlayers([]);
        setPlayer2SelectedPlayers([]);
        setFinalScores(null);
        setGameMode(null);
        setPlayer2Profile(null);
    };

    const handleQuizComplete = (scores) => {
        console.log("Quiz completato, punteggi finali:", scores); // <--- Aggiunto Debug
        setFinalScores(scores);
        setGameState('results');
    };

    const handleRestart = () => {
        setPlayer1SelectedPlayers([]);
        setPlayer2SelectedPlayers([]);
        setFinalScores(null);
        setGameState('modeSelection');
    };

    const selectComputerTeam = () => {
        const computerSelection = [];
        
        while (computerSelection.length < 5) {
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            computerSelection.push(randomPlayer);
        }
        
        setComputerTeam(computerSelection);
    };

    const handleModeSelection = (mode) => {
        setGameMode(mode);
        if (mode === 'multiplayer') {
            setGameState('player2Setup');
        } else {
            selectComputerTeam(); // AGGIUNTO: Seleziona la squadra del computer
            setGameState('player1Selection');
        }
    };

    const Setup = ({ onComplete, playerNumber }) => {
        const [username, setUsername] = useState('');
        
        const handleSave = () => {
            if (username.trim()) {
                const profile = { name: username, avatar: '/api/placeholder/40/40' };
                if (playerNumber === 1) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('playerName', username);
                        localStorage.setItem('playerAvatar', '/api/placeholder/40/40');
                    }
                    setPlayerProfile(profile);
                } else {
                    setPlayer2Profile(profile);
                }
                onComplete(profile);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 w-96">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        {playerNumber === 2 ? "Profilo Giocatore 2" : "Personalizza il tuo profilo"}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-900">Nome Giocatore:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded text-gray-900 bg-white"
                                placeholder="Inserisci il tuo nome"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                        >
                            Salva Profilo
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ModeSelection = ({ onSelectMode }) => {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Seleziona la Modalità di Gioco
                </h1>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Modalità Singleplayer */}
                    <div 
                        className="relative w-80 h-96 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border-4 border-blue-600"
                        onClick={() => onSelectMode('singleplayer')}
                    >
                        {/* Immagine di sfondo */}
                        <img 
                            src="/images/modes/singleplayer.png" 
                            alt="Singleplayer" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay con GRADIENTE Nero */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        {/* Leggera sfumatura blu per dare un tocco di colore */}
                        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
                        {/* Contenuto */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Gioca contro il Computer</h2>
                            <p className="text-lg mb-6">
                                Sfida un'intelligenza artificiale nella battaglia di statistiche blucerchiate!
                            </p>
                            <button className="px-6 py-2 bg-white text-blue-900 font-semibold rounded-lg shadow-md hover:bg-gray-300">
                                Seleziona
                            </button>
                        </div>
                    </div>
    
                    {/* Modalità Multiplayer */}
                    <div 
                        className="relative w-80 h-96 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border-4 border-green-600"
                        onClick={() => onSelectMode('multiplayer')}
                    >
                        {/* Immagine di sfondo */}
                        <img 
                            src="/images/modes/multiplayer.png" 
                            alt="Multiplayer" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay con GRADIENTE Nero */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        {/* Leggera sfumatura verde per dare un tocco di colore */}
                        <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
                        {/* Contenuto */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Gioca contro un Amico</h2>
                            <p className="text-lg mb-6">
                                Metti alla prova la tua conoscenza della Sampdoria sfidando un altro giocatore!
                            </p>
                            <button className="px-6 py-2 bg-white text-green-900 font-semibold rounded-lg shadow-md hover:bg-gray-300">
                                Seleziona
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    
    

    return (
        <div className="min-h-screen bg-gray-100">
            <Header playerProfile={playerProfile} onLogout={handleLogout} />
            <main className="container mx-auto py-8 px-4">
                {(!playerProfile.name || gameState === 'setup') && 
                    <Setup onComplete={() => setGameState('modeSelection')} playerNumber={1} />}
                {gameState === 'modeSelection' && <ModeSelection onSelectMode={handleModeSelection} />}
                {gameState === 'player2Setup' && 
                    <Setup onComplete={() => setGameState('player1Selection')} playerNumber={2} />}
                {gameState === 'player1Selection' && (
                    <PlayerSelection 
                        selectedPlayers={player1SelectedPlayers}
                        setSelectedPlayers={setPlayer1SelectedPlayers}
                        setGameState={setGameState}
                        setSelectedPlayerStats={setSelectedPlayerStats}
                        gameMode={gameMode}
                        currentPlayer={1}
                        nextState={gameMode === 'singleplayer' ? 'team-display' : 'player2Selection'}
                    />
                )}
                {gameState === 'player2Selection' && (
                    <PlayerSelection 
                        selectedPlayers={player2SelectedPlayers}
                        setSelectedPlayers={setPlayer2SelectedPlayers}
                        setGameState={setGameState}
                        setSelectedPlayerStats={setSelectedPlayerStats}
                        gameMode={gameMode}
                        currentPlayer={2}
                        nextState="team-display"
                    />
                )}
                {gameState === 'team-display' && (
                    <TeamDisplay 
                        player1Team={player1SelectedPlayers}
                        player2Team={gameMode === 'singleplayer' ? computerTeam : player2SelectedPlayers}
                        onStartQuiz={() => setGameState('quiz')}
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                )}
                {gameState === 'quiz' && (
                    <QuizSection 
                        player1Team={player1SelectedPlayers} 
                        player2Team={gameMode === 'singleplayer' ? computerTeam : player2SelectedPlayers}
                        onComplete={handleQuizComplete} 
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                )}
                {gameState === 'results' && finalScores && 
                    <Results 
                        scores={finalScores} 
                        onRestart={handleRestart} 
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                }
                
                <StatsModal 
                    player={selectedPlayerStats}
                    isOpen={!!selectedPlayerStats}
                    onClose={() => setSelectedPlayerStats(null)}
                />
            </main>
            <footer className="bg-blue-900 text-white p-4 text-center mt-auto">
                <p>&copy; 2024 Sfida Sampdoriana. Un quiz game sulle statistiche della Sampdoria.</p>
            </footer>
        </div>
    );
};

export default SampdoriaQuiz;