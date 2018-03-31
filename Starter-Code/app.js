$(document).ready( ()=> {
    // getLocalStorage()
    // checkForDeletions()
    // updateLists()

})
let movieList = {};



// add new movie item
const addNewMovie = (e) => {
    e.preventDefault()
    // console.log(e)
    const newMovie = $('#search').val()
    // console.log(e.timeStamp)
    movieList.timeStamp = e.timeStamp
    movieList.title = $('#search').val() 
    $('#search').val('')
    $('#movieUl').append(
        '<li class="listItem">' + newMovie + '<span><i class="fas fa-check "></i></span></li>'
    )
    $('.list-item').hover(()=>{
        console.log('hover')
    })
}

// dsiplay X on hover 
// const handleHover = (e) => {
//     console.log()
//     console.log('hovered')
// }

// setting local storage

//  const checkForMovieTitles = () => jQuery.each($('.listItem'), (index, val) => {
//     console.log(val)
//     $('.listItem')[index].click( handleHover )
// })
$('#addForm').submit(addNewMovie)
