$(document).ready( ()=> {
    getLocalStorage()
    // checkForDeletions()
    // updateLists()

})
let movieList = {};


const setLocalStorage = (entriesObj) => {
    localStorage.setItem('movieList', JSON.stringify(entriesObj));
 }

 const getLocalStorage = () => {
    let savedPostsStr = localStorage.getItem('movieList');
    if (savedPostsStr) {
       movieList = JSON.parse(savedPostsStr);
       for (let key in movieList) {
          $('#moviesUl').append(`<li class="listItem">${movieList[key].title}<span><i class="fas fa-check "></i></span></li>`);
       };
    };
 }


// add new movie item
$('#addForm').submit((e) => {
    e.preventDefault()
    // console.log(e)
    const newMovie = $('#search').val()
    // console.log(e.timeStamp)
    movieList.timeStamp = e.timeStamp
    movieList.title = $('#search').val() 
    $('#search').val('')
    $('#movieUl').append
    (   // does jQuery not accept template literals?
        '<li class="listItem">' + newMovie + '<span><i class="fas fa-check "></i></span></li>'
    )
    $('.list-item').hover(()=>{
        console.log('hover')
    })
    // add new item to local storage
    setLocalStorage(newMovie)
})

// check off watched film by clicking
$('ul').on('click', 'li', function() {
    console.log(this)
    $(this).toggleClass('completed')
})

// click check to delete. I had trouble targeting the span element without 
// using es5 function and using 'this' keyword
$('ul').on('click', 'span', function() {
    $(this)
        .parent()
        .fadeOut(500, function(){
            $(this).remove();
        });
})


// $('#addForm').submit(addNewMovie)
