const films = [
    {
        title: "Pulp Fiction",
        year: 1994,
        director: "Quentin Tarantino",
        duration: 154
    },
    {
        title: "Interstellar",
        year: 2014,
        director: "Christopher Nolan",
        duration: 169
    },
    {
        title: "Forrest Gump",
        year: 1994,
        director: "Robert Zemeckis",
        duration: 142
    },
    {
        title: "Spirited Away",
        year: 2001,
        director: "Hayao Miyazaki",
        duration: 125
    },
    {
        title: "Matrix",
        year: 1999,
        director: "Lana & Lilly Wachowski",
        duration: 136
    },
    {
        title: "Inception",
        year: 2010,
        director: "Christopher Nolan",
        duration: 148
    },
    {
        title: "Les évadés",
        year: 1994,
        director: "Frank Darabont",
        duration: 142
    },
    {
        title: "Parasite",
        year: 2019,
        director: "Bong Joon-ho",
        duration: 132
    },
    {
        title: "Fight Club",
        year: 1999,
        director: "David Fincher",
        duration: 139
    },
    {
        title: "Les affranchis",
        year: 1990,
        director: "Martin Scorsese",
        duration: 146
    }
    ];

function filterMovie(movies, filter) {
    
    const filteredMovie = movies.filter(filter);
    return filteredMovie;
}

console.log(filterMovie(films, film => film.duration < 140))
console.log(filterMovie(films, film => film.director.includes("Christopher")))