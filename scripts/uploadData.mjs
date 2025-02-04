import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1Am-FyplaRvgOPglnVl8QQFxV4nF83TU",
    authDomain: "nfootball-f9aa9.firebaseapp.com",
    projectId: "nfootball-f9aa9",
    storageBucket: "nfootball-f9aa9.firebasestorage.app",
    messagingSenderId: "184681880001",
    appId: "1:184681880001:web:c1bc9b626a47766cca3740"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function extractStatToCompare(compareFunction) {
    // Converte la funzione in stringa
    const funcString = compareFunction.toString();
    // Cerca il pattern playerStats[a.name].QUALCOSA
    const match = funcString.match(/playerStats\[a\.name\]\.(\w+)/);
    if (match) {
        return match[1]; // Ritorna il nome della statistica
    }
    return null;
}

function processQuestions(originalQuestions) {
    return originalQuestions.map(question => {
        const statToCompare = extractStatToCompare(question.compare);
        const detailFunc = question.detail.toString();
        
        // Estrai il nome della statistica dal detailFunc
        const detailMatch = detailFunc.match(/playerStats\[player\.name\]\.(\w+)/);
        const statInDetail = detailMatch ? detailMatch[1] : statToCompare;

        return {
            text: question.text,
            statToCompare: statToCompare,
            detailTemplate: `\${value} ${detailFunc.includes('totali') ? 'totali' : ''}`
        };
    });
}

async function uploadData() {
    try {
        console.log('Iniziando il caricamento dei dati...');
        console.log('Verifico i dati da caricare...');
        
        if (!Array.isArray(players) || players.length === 0) {
            throw new Error('Nessun giocatore da caricare');
        }
        
        console.log(`Trovati ${players.length} giocatori`);
        console.log(`Trovate ${Object.keys(playerStats).length} statistiche`);
        console.log(`Trovate ${questions.length} domande`);

        const batch = writeBatch(db);
        const playerRefs = {};

        // 1. Carica i giocatori
        console.log('\nCaricamento giocatori...');
        for (const player of players) {
            console.log(`Preparazione giocatore: ${player.name}`);
            const playerRef = doc(collection(db, 'players'));
            playerRefs[player.name] = playerRef;
            batch.set(playerRef, {
                name: player.name,
                position: player.position,
                years: player.years,
                image: player.image
            });
        }

        // 2. Carica le statistiche
        console.log('\nCaricamento statistiche...');
        for (const [playerName, stats] of Object.entries(playerStats)) {
            if (playerRefs[playerName]) {
                console.log(`Preparazione statistiche per: ${playerName}`);
                const statsRef = doc(collection(db, 'playerStats'));
                batch.set(statsRef, {
                    ...stats,
                    playerId: playerRefs[playerName].id
                });
            }
        }

        // 3. Carica le domande
        console.log('\nCaricamento domande...');
        const processedQuestions = processQuestions(questions);
        for (const question of processedQuestions) {
            console.log(`Preparazione domanda: ${question.text}`);
            const questionRef = doc(collection(db, 'questions'));
            batch.set(questionRef, {
                text: question.text,
                statToCompare: question.statToCompare,
                detailTemplate: question.detailTemplate
            });
        }

        console.log('\nEseguo il commit del batch...');
        await batch.commit();
        console.log('Caricamento completato con successo!');

    } catch (error) {
        console.error('Errore durante il caricamento:', error);
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
    }
}


// I dati esistenti
const { players, playerStats, questions } = {
    // Copia qui i tuoi dati dal file SampdoriaQuiz.js
    players: [
        
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
        
            
        ],
    
        playerStats: {
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
                    
    },
    questions: [
        {
            id:1,
            text: "Chi ha segnato più gol in carriera con la Sampdoria?",
            compare: (a, b) => (playerStats[a.name].gol || 0) - (playerStats[b.name].gol || 0),
            detail: player => `${playerStats[player.name].gol || 0} gol totali con la Sampdoria`
        },
        {
            id:2,
            text: "Chi ha fornito più assist in carriera?",
            compare: (a, b) => (playerStats[a.name].assist || 0) - (playerStats[b.name].assist || 0),
            detail: player => `${playerStats[player.name].assist || 0} assist totali`
        },
        {
            id:3,
            text: "Chi ha giocato più partite con la maglia della Sampdoria?",
            compare: (a, b) => (playerStats[a.name].presenze || 0) - (playerStats[b.name].presenze || 0),
            detail: player => `${playerStats[player.name].presenze || 0} presenze totali`
        },
        {
            id:4,
            text: "Chi ha segnato più gol su punizione?",
            compare: (a, b) => (playerStats[a.name].golPunizione || 0) - (playerStats[b.name].golPunizione || 0),
            detail: player => `${playerStats[player.name].golPunizione || 0} gol su punizione`
        },
        {
            id:5,
            text: "Chi ha effettuato più dribbling riusciti in carriera?",
            compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
            detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
        },
        {
            id:6,
            text: "Chi ha segnato più gol di testa?",
            compare: (a, b) => (playerStats[a.name].golTesta || 0) - (playerStats[b.name].golTesta || 0),
            detail: player => `${playerStats[player.name].golTesta || 0} gol di testa`
        },
        {
            id:7,
            text: "Chi ha vinto più duelli aerei?",
            compare: (a, b) => parseFloat(playerStats[a.name].duelliVinti || 0) - parseFloat(playerStats[b.name].duelliVinti || 0),
            detail: player => `${playerStats[player.name].duelliVinti || 0}% di duelli aerei vinti`
        },
        {
            id:8,
            text: "Chi ha subito più falli in una stagione?",
            compare: (a, b) => (playerStats[a.name].falliSubiti || 0) - (playerStats[b.name].falliSubiti || 0),
            detail: player => `${playerStats[player.name].falliSubiti || 0} falli subiti in una stagione`
        },
        {
            id:9,
            text: "Chi ha effettuato più intercetti in carriera?",
            compare: (a, b) => (playerStats[a.name].intercetti || 0) - (playerStats[b.name].intercetti || 0),
            detail: player => `${playerStats[player.name].intercetti || 0} intercetti totali`
        },
        {
            id:10,
            text: "Chi ha più clean sheet in carriera?",
            compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
            detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
        },
        {
            id:11,
            text: "Chi ha parato più rigori?",
            compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
            detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati`
        },
        {
            id:12,
            text: "Chi ha effettuato più cross in carriera?",
            compare: (a, b) => (playerStats[a.name].cross || 0) - (playerStats[b.name].cross || 0),
            detail: player => `${playerStats[player.name].cross || 0} cross totali`
        },
        {
            id:13,
            text: "Chi ha corso più km in una partita?",
            compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
            detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in una partita`
        },
        {
            id:14,
            text: "Chi ha ricevuto più cartellini gialli?",
            compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
            detail: player => `${playerStats[player.name].cartelliniGialli || 0} cartellini gialli`
        },
        {
            id:15,
            text: "Chi ha segnato più gol nei minuti finali (80'+)?",
            compare: (a, b) => (playerStats[a.name].golUltimi10Min || 0) - (playerStats[b.name].golUltimi10Min || 0),
            detail: player => `${playerStats[player.name].golUltimi10Min || 0} gol negli ultimi 10 minuti`
        },
        {
            id:16,
            text: "Chi ha effettuato più tackle in carriera?",
            compare: (a, b) => (playerStats[a.name].tackle || 0) - (playerStats[b.name].tackle || 0),
            detail: player => `${playerStats[player.name].tackle || 0} tackle riusciti`
        },
        {
            id:17,
            text: "Chi ha fatto più recuperi palla?",
            compare: (a, b) => (playerStats[a.name].recuperi || 0) - (playerStats[b.name].recuperi || 0),
            detail: player => `${playerStats[player.name].recuperi || 0} recuperi di palla`
        },
        {
            id:18,
            text: "Chi ha la percentuale più alta di passaggi riusciti?",
            compare: (a, b) => parseFloat(playerStats[a.name].passaggiRiusciti || 0) - parseFloat(playerStats[b.name].passaggiRiusciti || 0),
            detail: player => `${playerStats[player.name].passaggiRiusciti || 0}% di passaggi riusciti`
        },
        {
            id:19,
            text: "Chi ha giocato più stagioni consecutive con la Sampdoria?",
            compare: (a, b) => (playerStats[a.name].stagioniConsecutive || 0) - (playerStats[b.name].stagioniConsecutive || 0),
            detail: player => `${playerStats[player.name].stagioniConsecutive || 0} stagioni consecutive`
        },
            {
                id:20,
                text: "Chi ha segnato più gol in una singola stagione?",
                compare: (a, b) => (playerStats[a.name].maxGolStagione || 0) - (playerStats[b.name].maxGolStagione || 0),
                detail: player => `${playerStats[player.name].maxGolStagione || 0} gol in una stagione`
            },
            {
                id:21,
                text: "Chi ha servito più assist in una singola stagione?",
                compare: (a, b) => (playerStats[a.name].maxAssistStagione || 0) - (playerStats[b.name].maxAssistStagione || 0),
                detail: player => `${playerStats[player.name].maxAssistStagione || 0} assist in una stagione`
            },
            {
                id:22,
                text: "Chi ha parato più rigori in una stagione?",
                compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
                detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati in una stagione`
            },
            {
                id:23,
                text: "Chi ha effettuato più dribbling riusciti in una singola stagione?",
                compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
                detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
            },
            {
                id:24,
                text: "Chi ha il record di clean sheet in una stagione?",
                compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
                detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
            },
            {
                id:25,
                text: "Chi ha segnato più gol nell'area di rigore?",
                compare: (a, b) => (playerStats[a.name].golArea || 0) - (playerStats[b.name].golArea || 0),
                detail: player => `${playerStats[player.name].golArea || 0} gol in area di rigore`
            },
            {
                id:26,
                text: "Chi ha segnato più gol al debutto con la Sampdoria?",
                compare: (a, b) => (playerStats[a.name].golDebutto || 0) - (playerStats[b.name].golDebutto || 0),
                detail: player => `${playerStats[player.name].golDebutto || 0} gol al debutto`
            },
            {
                id:27,
                text: "Chi ha toccato più palloni in una stagione?",
                compare: (a, b) => (playerStats[a.name].tocchiPalla || 0) - (playerStats[b.name].tocchiPalla || 0),
                detail: player => `${playerStats[player.name].tocchiPalla || 0} tocchi di palla in stagione`
            },
            {
                id:28,
                text: "Chi ha il record di partite consecutive giocate?",
                compare: (a, b) => (playerStats[a.name].partiteConsecutive || 0) - (playerStats[b.name].partiteConsecutive || 0),
                detail: player => `${playerStats[player.name].partiteConsecutive || 0} partite consecutive`
            },
            {
                id:29,
                text: "Chi ha corso più chilometri in una stagione?",
                compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
                detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in media a partita`
            },
            {
                id:30,
                text: "Chi ha realizzato più assist su calcio d'angolo?",
                compare: (a, b) => (playerStats[a.name].assistPiazzati || 0) - (playerStats[b.name].assistPiazzati || 0),
                detail: player => `${playerStats[player.name].assistPiazzati || 0} assist su calcio d'angolo`
            },
            {
                id:31,
                text: "Chi ha commesso più falli in carriera?",
                compare: (a, b) => (playerStats[a.name].falliCommessi || 0) - (playerStats[b.name].falliCommessi || 0),
                detail: player => `${playerStats[player.name].falliCommessi || 0} falli commessi`
            },
            {
                id:32,
                text: "Chi ha il record di più passaggi chiave effettuati?",
                compare: (a, b) => (playerStats[a.name].passaggiChiave || 0) - (playerStats[b.name].passaggiChiave || 0),
                detail: player => `${playerStats[player.name].passaggiChiave || 0} passaggi chiave`
            },
            {
                id:33,
                text: "Chi ha segnato più gol da fuori area?",
                compare: (a, b) => (playerStats[a.name].golFuoriArea || 0) - (playerStats[b.name].golFuoriArea || 0),
                detail: player => `${playerStats[player.name].golFuoriArea || 0} gol da fuori area`
            },
            {
                id:34,
                text: "Chi ha la percentuale più alta di conversione tiri/gol?",
                compare: (a, b) => parseFloat(playerStats[a.name].conversioneTiriGol || 0) - parseFloat(playerStats[b.name].conversioneTiriGol || 0),
                detail: player => `${playerStats[player.name].conversioneTiriGol || 0}% di conversione tiri/gol`
            },
            {
                id:35,
                text: "Chi ha giocato il maggior numero di minuti in una stagione?",
                compare: (a, b) => (playerStats[a.name].minutiGiocati || 0) - (playerStats[b.name].minutiGiocati || 0),
                detail: player => `${playerStats[player.name].minutiGiocati || 0} minuti giocati in una stagione`
            },
            {
                id:36,
                text: "Chi ha effettuato più respinte difensive?",
                compare: (a, b) => (playerStats[a.name].respinte || 0) - (playerStats[b.name].respinte || 0),
                detail: player => `${playerStats[player.name].respinte || 0} respinte difensive`
            },
            {
                id:37,
                text: "Chi ha subito più ammonizioni in una stagione?",
                compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
                detail: player => `${playerStats[player.name].cartelliniGialli || 0} ammonizioni`
            },
            {
                id:38,
                text: "Chi ha giocato più partite senza essere sostituito?",
                compare: (a, b) => (playerStats[a.name].partiteIntere || 0) - (playerStats[b.name].partiteIntere || 0),
                detail: player => `${playerStats[player.name].partiteIntere || 0} partite giocate per intero`
            },
            {
                id:39,
                text: "Chi ha mantenuto più minuti di imbattibilità?",
                compare: (a, b) => (playerStats[a.name].minutiImbattuto || 0) - (playerStats[b.name].minutiImbattuto || 0),
                detail: player => `${playerStats[player.name].minutiImbattuto || 0} minuti di imbattibilità`
            }
        ]
    };


    // Esegui il caricamento
    uploadData();