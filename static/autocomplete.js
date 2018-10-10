
allMovies = [
  {
    genre: "sci-fi",
    movie_id: 1,
    poster_image_url: "https://image.tmdb.org/t/p/original/hLudzvGfpi6JlwUnsNhXwKKg4j.jpg",
    release_year: 2016,
    summary: "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
    title: "Arrival"
  },
  {
    genre: "family",
    movie_id: 4,
    poster_image_url: "https://image.tmdb.org/t/p/original/fyy1nDC8wm553FCiBDojkJmKLCs.jpg",
    release_year: 2017,
    summary: "Blindsided by a new generation of blazing-fast racers, the legendary Lightning McQueen is suddenly pushed out of the sport he loves. To get back in the game, he will need the help of an eager young race technician with her own plan to win, inspiration from the late Fabulous Hudson Hornet, and a few unexpected turns. Proving that #95 isn't through yet will test the heart of a champion on Piston Cup Racing's biggest stage!",
    title: "Cars 3"
  },
  {
    genre: "sci-fi",
    movie_id: 2,
    poster_image_url: "https://image.tmdb.org/t/p/original/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    release_year: 2017,
    summary: "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage.",
    title: "Guardians of the Galaxy Vol. 2"
  },
  {
    genre: "family",
    movie_id: 3,
    poster_image_url: "https://image.tmdb.org/t/p/original/z4x0Bp48ar3Mda8KiPD1vwSY3D8.jpg",
    release_year: 2016,
    summary: "In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain's daughter's island, she answers the Ocean's call to seek out the demigod to set things right.",
    title: "Moana"
  }
]

setSearchResults = (results) => {
  const titles = results.map(r => "<li>" + r.title + "</li>");
  $("#search-results").html(titles.join(" "));
}

// search an in-memory data structure
simpleSearch = () => {
  let query = $("#autocomplete").val();
  const result = allMovies.filter(m => m.title.toLowerCase().includes(query));
  setSearchResults(result);
}

// search by querying the server
ajaxSearch = () => {
  let query = $("#autocomplete").val();
  $.ajax({
    url: "/api/title-autocomplete",
    type: "get",
    data: {
      query: query
    },
    success: function(response) {
      setSearchResults(response);
    }
  });
}
