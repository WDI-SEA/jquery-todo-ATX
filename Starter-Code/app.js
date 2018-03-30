$(document).ready( ()=> {
    getLocalStorage()
    checkForDeletions()
    updateLists()

})
let movieList = {};



// add new movie item
const addNewMovie = (e) => {
    e.preventDefault()
    console.log(e)
    const newMovie = $('#search').val()
    console.log(e.timeStamp)
    movieList.timeStamp = e.timeStamp
    movieList.title = $('#search').val() 
    $('#search').val('')
    $('#movieUl').append(
        '<li>' + newMovie + '<span><i class="fas fa-check hide"></i></span></li>'
    )
}

// setting local storage

$()
$('#addForm').submit(addNewMovie)
