const getLocalStorage = () => {
    let savedPostsStr = localStorage.getItem('movieList');
    if (savedPostsStr) {
        movieList = JSON.parse(savedPostsStr);
        for (let key in movieList ) {
            console.log(movieList[key])
            $('#moviesUl').append(`<li class="listItem">${movieList[key].title}<span><i class="fas fa-check "></i></span></li>`);
        };
    };
}

$(document).ready(() => {
    getLocalStorage()
    // checkForDeletions()
    // updateLists()


    let movieList = [];

    const setLocalStorage = (entriesObj) => {
        console.log(entriesObj)
        localStorage.setItem('movieList', JSON.stringify(entriesObj));
    }
    

    


    // add new movie title to watch 
    $('#addForm').submit((e) => {
        e.preventDefault()

        const newMovie = $('#search').val()
        let newMovieTitle = {
            title: $('#search').val(),
            timeStamp: e.timeStamp,
        }
        movieList.pop(newMovieTitle)
        // movieList.timeStamp = e.timeStamp
        // movieList.title = $('#search').val()
        $('#search').val('')
        $('#movieUl').append
            (   // does jQuery not accept template literals? idk why it worked ealier
            '<li class="listItem">' + newMovie + '<span><i class="fas fa-check "></i></span></li>'
            )
            console.log(movieList)
        // add new item to local storage
        setLocalStorage(newMovie)
    })

    // check off watched film by clicking
    $('ul').on('click', 'li', function () {
        console.log(this)
        $(this).toggleClass('completed')
    })

    // click check to delete. I had trouble targeting the span element without 
    // using es5 function and using 'this' keyword
    $('ul').on('click', 'span', function () {
        $(this)
            .parent()
            .fadeOut(500, function () {
                $(this).remove();
            });
    })
    // setLocalStorage(newMovie)

})
