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