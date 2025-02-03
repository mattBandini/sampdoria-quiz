'use client'

import React, { useState, useEffect } from 'react';
import { LogOut, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
        position: "Attaccante",
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
        golPunizione: 7
    },
    "Manolo Gabbiadini": {
        presenze: 182,
        gol: 58,
        assist: 24,
        tiriPartita: 2.9,
        golTesta: 8,
        golUltimi10Min: 9
    },
    "Antonio Candreva": {
        presenze: 89,
        gol: 19,
        assist: 28,
        tiriPartita: 2.4,
        cross: 242,
        assistPiazzati: 11
    },
    "Francesco Caputo": {
        presenze: 76,
        gol: 27,
        assist: 12,
        tiriPartita: 2.6,
        golTesta: 5,
        golArea: 22
    },
    "Emil Audero": {
        presenze: 168,
        cleanSheet: 44,
        parate: 498,
        rigoriParati: 8,
        minutiImbattuto: 511,
        uscite: 324
    },
    "Omar Colley": {
        presenze: 143,
        tackle: 246,
        intercetti: 312,
        duelliVinti: "72%",
        passaggiRiusciti: "86%",
        respinte: 486
    },
    "Albin Ekdal": {
        presenze: 154,
        gol: 8,
        assist: 14,
        passaggiRiusciti: "89%",
        recuperi: 267,
        tackle: 234
    },

    "Francesco Caputo": {
        presenze: 76,
        gol: 27,
        assist: 12,
        tiriPartita: 2.6,
        golTesta: 5,
        golArea: 22
    },
    "Antonio Candreva": {
        presenze: 89,
        gol: 19,
        assist: 28,
        tiriPartita: 2.4,
        cross: 242,
        assistPiazzati: 11
    },
    "Sam Lammers": {
        presenze: 33,
        gol: 8,
        assist: 3,
        tiriPartita: 1.8,
        golTesta: 2,
        golArea: 6
    },
    "Federico Bonazzoli": {
        presenze: 112,
        gol: 19,
        assist: 7,
        tiriPartita: 1.5,
        golTesta: 4,
        golUltimi10Min: 5
    },
    "Duván Zapata": {
        presenze: 37,
        gol: 11,
        assist: 5,
        tiriPartita: 2.7,
        golTesta: 4,
        golArea: 9
    },
    "Luis Muriel": {
        presenze: 79,
        gol: 21,
        assist: 15,
        tiriPartita: 2.3,
        dribbling: 87,
        golArea: 17
    },
    "Patrik Schick": {
        presenze: 32,
        gol: 11,
        assist: 3,
        tiriPartita: 2.1,
        golTesta: 2,
        golArea: 9
    },
    "Eder": {
        presenze: 135,
        gol: 49,
        assist: 18,
        tiriPartita: 2.5,
        golPunizione: 4,
        golUltimi10Min: 7
    },
    "Stefano Okaka": {
        presenze: 37,
        gol: 4,
        assist: 2,
        tiriPartita: 1.2,
        golTesta: 2,
        duelliVinti: "58%"
    },
    "Tomás Rincón": {
        presenze: 33,
        gol: 1,
        assist: 2,
        passaggiRiusciti: "87%",
        tackle: 78,
        intercetti: 45
    },
    "Abdelhamid Sabiri": {
        presenze: 23,
        gol: 3,
        assist: 2,
        passaggiRiusciti: "82%",
        tiriPartita: 1.7,
        dribbling: 34
    },
    "Gonzalo Villar": {
        presenze: 15,
        gol: 0,
        assist: 1,
        passaggiRiusciti: "91%",
        tackle: 23,
        intercetti: 19
    },
    "Morten Thorsby": {
        presenze: 74,
        gol: 7,
        assist: 3,
        duelliVinti: "67%",
        recuperi: 198,
        kmPartita: 11.8
    },
    "Lucas Torreira": {
        presenze: 71,
        gol: 4,
        assist: 1,
        passaggiRiusciti: "89%",
        tackle: 187,
        intercetti: 124
    },
    "Dennis Praet": {
        presenze: 98,
        gol: 4,
        assist: 6,
        passaggiRiusciti: "86%",
        dribbling: 112,
        kmPartita: 10.7
    },
    "Karol Linetty": {
        presenze: 132,
        gol: 11,
        assist: 13,
        passaggiRiusciti: "85%",
        tackle: 201,
        recuperi: 267
    },
    "Roberto Soriano": {
        presenze: 104,
        gol: 17,
        assist: 8,
        tiriPartita: 1.8,
        passaggiRiusciti: "84%",
        kmPartita: 11.2
    },
    "Gastón Ramírez": {
        presenze: 95,
        gol: 17,
        assist: 11,
        golPunizione: 8,
        dribbling: 132,
        passaggiChiave: 87
    },
    "Omar Colley": {
        presenze: 143,
        gol: 3,
        tackle: 246,
        intercetti: 312,
        duelliVinti: "72%",
        respinte: 486
    },
    "Bartosz Bereszyński": {
        presenze: 145,
        gol: 1,
        assist: 7,
        tackle: 312,
        cross: 187,
        duelliVinti: "64%"
    },
    "Alex Ferrari": {
        presenze: 78,
        gol: 1,
        tackle: 134,
        intercetti: 156,
        duelliVinti: "68%",
        respinte: 267
    },
    "Tommaso Augello": {
        presenze: 102,
        gol: 2,
        assist: 9,
        cross: 201,
        tackle: 178,
        intercetti: 123
    },
    "Maya Yoshida": {
        presenze: 72,
        gol: 3,
        tackle: 156,
        intercetti: 187,
        duelliVinti: "70%",
        respinte: 312
    },
    "Joachim Andersen": {
        presenze: 42,
        gol: 1,
        tackle: 87,
        intercetti: 112,
        duelliVinti: "69%",
        respinte: 178
    },
    "Milan Škriniar": {
        presenze: 35,
        gol: 2,
        tackle: 76,
        intercetti: 98,
        duelliVinti: "73%",
        respinte: 156
    },
    "Matías Silvestre": {
        presenze: 78,
        gol: 3,
        tackle: 167,
        intercetti: 201,
        duelliVinti: "66%",
        respinte: 289
    },
    "Vasco Regini": {
        presenze: 107,
        gol: 2,
        assist: 3,
        tackle: 234,
        intercetti: 178,
        duelliVinti: "62%"
    },
    "Emil Audero": {
        presenze: 168,
        cleanSheet: 44,
        parate: 498,
        rigoriParati: 8,
        minutiImbattuto: 511,
        uscite: 324
    },
    "Wladimiro Falcone": {
        presenze: 27,
        cleanSheet: 7,
        parate: 89,
        rigoriParati: 1,
        minutiImbattuto: 203,
        uscite: 67
    },
    "Christian Puggioni": {
        presenze: 18,
        cleanSheet: 4,
        parate: 54,
        rigoriParati: 0,
        minutiImbattuto: 156,
        uscite: 43
    },
    "Emiliano Viviano": {
        presenze: 115,
        cleanSheet: 31,
        parate: 342,
        rigoriParati: 5,
        minutiImbattuto: 412,
        uscite: 278
    },

    "Roberto Mancini": {
        presenze: 424,
        gol: 132,
        assist: 87,
        tiriPartita: 2.7,
        golPunizione: 23,
        passaggiChiave: 412
    },
    "Gianluca Vialli": {
        presenze: 223,
        gol: 85,
        assist: 34,
        tiriPartita: 3.2,
        golTesta: 18,
        duelliVinti: "64%"
    },
    "Attila Lombardo": {
        presenze: 98,
        gol: 23,
        assist: 31,
        dribbling: 187,
        cross: 245,
        kmPartita: 11.3
    },
    "Ruud Gullit": {
        presenze: 85,
        gol: 31,
        assist: 22,
        tiriPartita: 2.8,
        duelliVinti: "71%",
        passaggiChiave: 98
    },
    "Gianluca Pagliuca": {
        presenze: 198,
        cleanSheet: 67,
        parate: 623,
        rigoriParati: 12,
        minutiImbattuto: 678,
        uscite: 412
    },
    "Pietro Vierchowod": {
        presenze: 493,
        gol: 21,
        tackle: 876,
        intercetti: 1023,
        duelliVinti: "76%",
        respinte: 1567
    },
    "Toninho Cerezo": {
        presenze: 146,
        gol: 19,
        assist: 31,
        passaggiRiusciti: "92%",
        tackle: 312,
        intercetti: 278
    },
    "Moreno Mannini": {
        presenze: 377,
        gol: 11,
        assist: 23,
        tackle: 678,
        intercetti: 534,
        duelliVinti: "68%"
    },
    "Fausto Pari": {
        presenze: 245,
        gol: 12,
        assist: 18,
        passaggiRiusciti: "86%",
        tackle: 456,
        recuperi: 534
    },
    "Vladimir Jugović": {
        presenze: 110,
        gol: 14,
        assist: 21,
        passaggiRiusciti: "88%",
        tackle: 234,
        kmPartita: 11.7
    },
    "Enrico Chiesa": {
        presenze: 138,
        gol: 45,
        assist: 17,
        tiriPartita: 2.9,
        golTesta: 7,
        dribbling: 167
    },
    "Marco Lanna": {
        presenze: 289,
        gol: 7,
        assist: 12,
        tackle: 578,
        intercetti: 456,
        duelliVinti: "65%"
    },
    "Vincenzo Montella": {
        presenze: 83,
        gol: 54,
        assist: 13,
        tiriPartita: 3.1,
        golTesta: 11,
        golArea: 46
    },
    "David Platt": {
        presenze: 55,
        gol: 17,
        assist: 9,
        passaggiRiusciti: "87%",
        tackle: 112,
        kmPartita: 11.2
    },
    "Siniša Mihajlović": {
        presenze: 110,
        gol: 12,
        assist: 18,
        golPunizione: 9,
        passaggiRiusciti: "84%",
        tackle: 189
    },
    "Francesco Flachi": {
        presenze: 280,
        gol: 110,
        assist: 45,
        tiriPartita: 2.6,
        golPunizione: 11,
        dribbling: 312
    },
    "Sergio Volpi": {
        presenze: 196,
        gol: 19,
        assist: 23,
        passaggiRiusciti: "89%",
        tackle: 345,
        intercetti: 278
    },
    "Angelo Palombo": {
        presenze: 449,
        gol: 22,
        assist: 31,
        passaggiRiusciti: "87%",
        tackle: 876,
        recuperi: 1023
    },
    "Daniele Mannini": {
        presenze: 102,
        gol: 17,
        assist: 14,
        tiriPartita: 1.8,
        cross: 187,
        dribbling: 156
    },
    "Gennaro Delvecchio": {
        presenze: 142,
        gol: 11,
        assist: 16,
        passaggiRiusciti: "83%",
        tackle: 267,
        recuperi: 312
    }
};


// Database delle domande
const questions = [
    {
        text: "Chi ha segnato più gol complessivi in campionato?",
        answer: "Fabio Quagliarella",
        detail: "105 gol totali in campionato"
    },
    {
        text: "Chi ha realizzato più assist in una singola stagione?",
        answer: "Antonio Candreva",
        detail: "12 assist nella stagione 2021/22"
    },
    {
        text: "Chi ha il record di minuti giocati in una stagione?",
        answer: "Emil Audero",
        detail: "3420 minuti nella stagione 2020/21"
    },
    {
        text: "Chi ha il record di rigori parati?",
        answer: "Emil Audero",
        detail: "5 rigori parati in una stagione"
    },
    {
        text: "Chi ha segnato più gol in una singola partita?",
        answer: "Fabio Quagliarella",
        detail: "4 gol contro l'Udinese nel 2017"
    },
    {
        text: "Chi ha il record di partite consecutive giocate?",
        answer: "Bartosz Bereszyński",
        detail: "95 partite consecutive tra il 2019 e il 2021"
    },
    {
        text: "Chi ha segnato più gol di testa in una stagione?",
        answer: "Duván Zapata",
        detail: "7 gol di testa nella stagione 2017/18"
    },
    {
        text: "Chi ha il record di km percorsi in una partita?",
        answer: "Morten Thorsby",
        detail: "13.2 km contro il Milan nel 2021"
    },
    {
        text: "Chi ha effettuato più cross in una stagione?",
        answer: "Antonio Candreva",
        detail: "242 cross nella stagione 2021/22"
    },
    {
        text: "Chi ha il record di clean sheet in una stagione?",
        answer: "Emil Audero",
        detail: "14 clean sheet nella stagione 2020/21"
    },
    {
        text: "Chi ha segnato più gol su punizione?",
        answer: "Gastón Ramírez",
        detail: "8 gol su punizione diretta"
    },
    {
        text: "Chi ha il record di tackle vincenti in una stagione?",
        answer: "Lucas Torreira",
        detail: "98 tackle vincenti nel 2017/18"
    },
    {
        text: "Chi ha la percentuale più alta di duelli aerei vinti?",
        answer: "Omar Colley",
        detail: "72% di duelli aerei vinti"
    },
    {
        text: "Chi ha fatto più recuperi palla in una stagione?",
        answer: "Albin Ekdal",
        detail: "267 recuperi nella stagione 2018/19"
    },
    {
        text: "Chi ha la media più alta di tiri per partita?",
        answer: "Fabio Quagliarella",
        detail: "3.8 tiri per partita nel 2018/19"
    },
    {
        text: "Chi ha segnato più gol nei minuti finali (80'+)?",
        answer: "Manolo Gabbiadini",
        detail: "9 gol negli ultimi 10 minuti"
    },
    {
        text: "Chi ha il record di assist da palla inattiva?",
        answer: "Antonio Candreva",
        detail: "11 assist da calcio piazzato"
    },
    {
        text: "Chi ha subito più falli in una stagione?",
        answer: "Gastón Ramírez",
        detail: "92 falli subiti nel 2019/20"
    },
    {
        text: "Chi ha la percentuale più alta di passaggi riusciti?",
        answer: "Lucas Torreira",
        detail: "91.3% di passaggi completati"
    },
    {
        text: "Chi ha il record di intercetti in una stagione?",
        answer: "Maya Yoshida",
        detail: "82 intercetti nel 2020/21"
    },
    {
        text: "Chi ha segnato più gol al debutto?",
        answer: "Patrik Schick",
        detail: "2 gol nella prima partita"
    },
    {
        text: "Chi ha il record di dribbling riusciti in una stagione?",
        answer: "Luis Muriel",
        detail: "87 dribbling riusciti nel 2015/16"
    },
    {
        text: "Chi ha più presenze totali nel periodo?",
        answer: "Fabio Quagliarella",
        detail: "236 presenze totali"
    },
    {
        text: "Chi ha il record di minuti di imbattibilità?",
        answer: "Emil Audero",
        detail: "511 minuti senza subire gol"
    },
    {
        text: "Chi ha più cartellini gialli accumulati?",
        answer: "Bartosz Bereszyński",
        detail: "35 cartellini gialli totali"
    },

    {
        text: "Chi detiene il record di presenze con la maglia della Sampdoria?",
        answer: "Roberto Mancini",
        detail: "424 presenze totali"
    },
    {
        text: "Quale giocatore ha segnato più gol su punizione nella storia della Sampdoria?",
        answer: "Roberto Mancini",
        detail: "23 gol su punizione"
    },
    {
        text: "Chi ha vinto più duelli aerei in percentuale?",
        answer: "Pietro Vierchowod",
        detail: "76% di duelli aerei vinti"
    },
    {
        text: "Quale portiere ha mantenuto più volte la porta inviolata in una singola stagione?",
        answer: "Gianluca Pagliuca",
        detail: "67 clean sheet totali"
    },
    {
        text: "Chi ha la media più alta di km percorsi per partita?",
        answer: "Morten Thorsby",
        detail: "11.8 km per partita"
    },
    {
        text: "Quale giocatore ha la percentuale più alta di passaggi riusciti?",
        answer: "Toninho Cerezo",
        detail: "92% di passaggi riusciti"
    },
    {
        text: "Chi ha segnato più gol in una singola stagione?",
        answer: "Gianluca Vialli",
        detail: "85 gol in totale con la Sampdoria"
    },
    {
        text: "Quale difensore ha segnato più gol nella storia della Sampdoria?",
        answer: "Pietro Vierchowod",
        detail: "21 gol totali"
    },
    {
        text: "Chi detiene il record di assist in una singola stagione?",
        answer: "Roberto Mancini",
        detail: "87 assist in totale"
    },
    {
        text: "Quale giocatore ha effettuato più dribbling riusciti in una stagione?",
        answer: "Attila Lombardo",
        detail: "187 dribbling riusciti"
    },
    {
        text: "Chi ha il record di rigori parati nella storia della Sampdoria?",
        answer: "Gianluca Pagliuca",
        detail: "12 rigori parati"
    },
    {
        text: "Quale centrocampista ha segnato più gol in una singola stagione?",
        answer: "Vladimir Jugović",
        detail: "14 gol in una stagione"
    },
    {
        text: "Chi ha giocato più stagioni consecutive con la maglia della Sampdoria?",
        answer: "Angelo Palombo",
        detail: "14 stagioni consecutive dal 2002 al 2016"
    },
    {
        text: "Quale attaccante ha la media gol più alta per partita?",
        answer: "Vincenzo Montella",
        detail: "54 gol in 83 presenze"
    },
    {
        text: "Chi ha effettuato più tackle in una singola stagione?",
        answer: "Lucas Torreira",
        detail: "187 tackle in una stagione"
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

const PlayerSelection = ({ 
    selectedPlayers, 
    setSelectedPlayers, 
    selectComputerTeam, 
    setGameState,
    setSelectedPlayerStats 
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handlePlayerSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(prev => prev.filter(p => p !== player));
        } else if (selectedPlayers.length < 5) {
            setSelectedPlayers(prev => [...prev, player]);
        }
    };

    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="text-gray-900">Forma la tua squadra</CardTitle>
                <p className="text-gray-600">Seleziona 5 giocatori blucerchiati degli ultimi 10 anni</p>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cerca un giocatore..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded text-gray-900 bg-white mb-4"
                    />
                </div>
                {['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'].map(position => (
                    <div key={position} className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{position}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredPlayers
                                .filter(p => p.position === position)
                                .map(player => (
                                    <div
                                        key={player.name}
                                        className={`relative p-4 bg-white rounded-lg shadow transition-transform hover:scale-105 cursor-pointer ${
                                            selectedPlayers.includes(player) ? 'border-2 border-blue-900' : ''
                                        }`}
                                        onClick={() => handlePlayerSelect(player)}
                                    >
                                        <button 
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPlayerStats(player);
                                            }}
                                        >
                                            <Info className="h-4 w-4 text-blue-900" />
                                        </button>

                                        <img 
                                            src={player.image}
                                            alt={player.name}
                                            className="w-20 h-20 mx-auto rounded-full border-2 border-blue-900 object-cover aspect-square"
                                        />
                                        <div className="mt-2 text-center">
                                            <h3 className="font-semibold text-gray-900">{player.name}</h3>
                                            <p className="text-sm text-gray-600">{player.position}</p>
                                            <p className="text-xs text-gray-500">{player.years}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
                <div className="mt-4 text-center">
                    <p className="mb-4 text-gray-900">
                        Giocatori selezionati: <span className="font-bold">{selectedPlayers.length}/5</span>
                    </p>
                    <button
                        onClick={() => {
                            selectComputerTeam();
                            setGameState('team-display');
                        }}
                        disabled={selectedPlayers.length !== 5}
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-800 transition-colors"
                    >
                        Continua
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

const TeamDisplay = ({ userTeam, computerTeam, onStartQuiz }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

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
                    {/* Squadra Umana */}
                    <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-900">La tua squadra</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {userTeam.map(player => (
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

                    {/* Squadra Computer */}
                    <div className="w-full md:w-1/2 bg-red-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-red-900">Squadra Computer</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {computerTeam.map(player => (
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
                <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth="3"
                    />
                    <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="3"
                        strokeDasharray={`${percentage}, 100`}
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

const QuizSection = ({ selectedPlayers, computerTeam, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [playerSelectedForQuestion, setPlayerSelectedForQuestion] = useState(null);
    const [computerSelectedForQuestion, setComputerSelectedForQuestion] = useState(null);

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

    const getComputerAnswer = (question) => {
        if (Math.random() > 0.3) {
            const correctAnswer = computerTeam.find(player => player.name === question.answer);
            return correctAnswer || computerTeam[Math.floor(Math.random() * computerTeam.length)];
        }
        return computerTeam[Math.floor(Math.random() * computerTeam.length)];
    };

    const handleAnswer = (playerAnswer) => {
        if (answered) return;
        setAnswered(true);

        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        setPlayerSelectedForQuestion(playerAnswer);
        
        const computerAnswer = getComputerAnswer(currentQuestion);
        setComputerSelectedForQuestion(computerAnswer);

        const isCorrect = playerAnswer?.name === currentQuestion.answer;
        const isComputerCorrect = computerAnswer?.name === currentQuestion.answer;

        if (isCorrect) setPlayerScore(prev => prev + 3);
        if (isComputerCorrect) setComputerScore(prev => prev + 3);

        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setAnswered(false);
                setTimeLeft(10);
                setPlayerSelectedForQuestion(null);
                setComputerSelectedForQuestion(null);
            } else {
                onComplete({ playerScore, computerScore });
            }
        }, 3000);
    };

    if (quizQuestions.length === 0) return null;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Parte del Quiz */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-gray-700">Domanda </span>
                        <span className="font-bold">{currentQuestionIndex + 1}</span>
                        <span className="text-gray-700"> di </span>
                        <span className="font-bold">5</span>
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

            <Card className="mb-8">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        {currentQuestion.text}
                    </h2>
                </CardContent>
            </Card>

            {/* Squadre */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
    {/* Squadra Giocatore */}
    <Card className="bg-blue-50">
        <CardHeader>
            <CardTitle className="text-center text-blue-900">La tua squadra</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
            {selectedPlayers.map((player, index) => (
                <div
                    key={`user-player-${player.name}-${player.position}-${index}`}
                    className={`relative p-4 bg-white rounded-lg shadow transition-transform hover:scale-105 cursor-pointer ${
                        playerSelectedForQuestion?.name === player.name ? 'border-4 border-blue-500' : ''
                    }`}
                    onClick={() => !answered && handleAnswer(player)}
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

    {/* Squadra Computer */}
    <Card className="bg-red-50">
        <CardHeader>
            <CardTitle className="text-center text-red-900">Squadra Computer</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
            {computerTeam.map((player, index) => (
                <div 
                    key={`computer-player-${player.name}-${player.position}-${index}`}
                    className={`p-4 bg-white rounded-lg shadow ${
                        computerSelectedForQuestion?.name === player.name ? 'border-4 border-red-500' : ''
                    }`}
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

            {answered && (playerSelectedForQuestion || computerSelectedForQuestion) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full relative">
                        <h3 className="text-2xl font-bold text-center mb-6 text-white">Scelte dei giocatori</h3>
                        <div className="flex justify-between items-center">
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibold mb-4 text-white">La tua scelta</h4>
                                {playerSelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${playerSelectedForQuestion.name === currentQuestion.answer ? 'border-green-500 bg-green-700' : 'border-red-500 bg-red-700'}`}>
                                        <img 
                                            src={playerSelectedForQuestion.image}
                                            alt={playerSelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{playerSelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{playerSelectedForQuestion.position}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibent mb-4 text-white">Scelta Computer</h4>
                                {computerSelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${computerSelectedForQuestion.name === currentQuestion.answer ? 'border-green-500 bg-green-700' : 'border-red-500 bg-red-700'}`}>
                                        <img 
                                            src={computerSelectedForQuestion.image}
                                            alt={computerSelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{computerSelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{computerSelectedForQuestion.position}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xl text-white">Risposta corretta: <span className="font-bold text-green-400">{currentQuestion.answer}</span></p>
                            <p className="text-gray-300 mt-2">{currentQuestion.detail}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Results = ({ scores, onRestart }) => {
    const { playerScore, computerScore } = scores;
    let resultType, title, description, iconEmoji;

    if (playerScore > computerScore) {
        // Vittoria
        resultType = 'Vittoria';
        title = 'Hai Vinto! 🏆';
        description = 'Complimenti! Hai dimostrato di conoscere alla perfezione la storia della Sampdoria.';
        iconEmoji = '🎉';
    } else if (playerScore < computerScore) {
        // Sconfitta
        resultType = 'Sconfitta';
        title = 'Ha Vinto il Computer 🤖';
        description = 'Non scoraggiarti, c\'è sempre spazio per imparare di più sulla tua squadra del cuore.';
        iconEmoji = '💡';
    } else {
        // Pareggio
        resultType = 'Pareggio';
        title = 'Che Sfida Equilibrata! ⚖️';
        description = 'Nessuno ha avuto la meglio. Un risultato che dimostra la tua grande conoscenza.';
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
                            <span className="block text-lg font-semibold text-gray-600 mb-2">Il tuo punteggio</span>
                            <div className={`text-4xl font-bold ${playerScore > computerScore ? 'text-green-700' : 'text-gray-900'}`}>
                                {playerScore} punti
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-semibold text-gray-600 mb-2">Punteggio Computer</span>
                            <div className={`text-4xl font-bold ${playerScore < computerScore ? 'text-red-700' : 'text-gray-900'}`}>
                                {computerScore} punti
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
    const [playerProfile, setPlayerProfile] = useState({    
        name: '',
        avatar: '/api/placeholder/40/40'
    });
    const [selectedPlayers, setSelectedPlayers] = useState([]);
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
            setGameState('selection');
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('playerName');
            localStorage.removeItem('playerAvatar');
        }
        setGameState('setup');
        setPlayerProfile({ name: '', avatar: '/api/placeholder/40/40' });
        setSelectedPlayers([]); 
        setFinalScores(null); 
    };

    const handleQuizComplete = (scores) => {
        setFinalScores(scores);
        setGameState('results');
    };

    const handleRestart = () => {
        setSelectedPlayers([]);
        setFinalScores(null);
        setGameState('selection');
    };

    const selectComputerTeam = () => {
        const computerSelection = [];
        
        while (computerSelection.length < 5) {
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            computerSelection.push(randomPlayer);
        }
        
        setComputerTeam(computerSelection);
    };

    const Setup = () => {
        const [username, setUsername] = useState('');
        
        const handleSave = () => {
            if (username.trim()) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('playerName', username);
                    localStorage.setItem('playerAvatar', '/api/placeholder/40/40');
                }
                setPlayerProfile({ name: username, avatar: '/api/placeholder/40/40' });
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

    return (
        <div className="min-h-screen bg-gray-100">
            <Header playerProfile={playerProfile} onLogout={handleLogout} />
            <main className="container mx-auto py-8 px-4">
                {(!playerProfile.name || gameState === 'setup') && <Setup />}
                {gameState === 'selection' && (
                    <PlayerSelection 
                        selectedPlayers={selectedPlayers}
                        setSelectedPlayers={setSelectedPlayers}
                        selectComputerTeam={selectComputerTeam}
                        setGameState={setGameState}
                        setSelectedPlayerStats={setSelectedPlayerStats}
                    />
                )}
                {gameState === 'team-display' && (
                    <TeamDisplay 
                        userTeam={selectedPlayers}
                        computerTeam={computerTeam}
                        onStartQuiz={() => setGameState('quiz')}
                    />
                )}
                {gameState === 'quiz' && (
                    <QuizSection 
                        selectedPlayers={selectedPlayers} 
                        computerTeam={computerTeam}
                        onComplete={handleQuizComplete} 
                    />
                )}
                {gameState === 'results' && finalScores && <Results scores={finalScores} onRestart={handleRestart} />}
                
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