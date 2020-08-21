function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            apikey: '9acdfcee',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response === "True") {
                let movies = result.Search;

                $.each(movies, function (index, data) {
                    $('#movie-list').append(`
                    <div class="card-group col-md-4">
                        <div class="card m-2">
                            <img src="`+ data.Poster + `" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year + `</h6>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted"><a href="#" class="card-link see-detail" data-toggle="modal"
                                        data-target="#exampleModal">See Detail</a></small>
                            </div>
                        </div>
                    </div>
                    `);
                });
                $('#search-input').val('');
            } else {
                $('#movie-list').html('<div class="col"><h1 class="text-center">' + result.Error + '</h1></div>')
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (event) {
    if (event.keyCode === 13) {
        searchMovie();
    }
});