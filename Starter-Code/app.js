const addNewMovie = (e) => {
    if (e.which === 13) {
        console.log(e.target.value)
    }  else if (e.type === 'click') {
        const newMovie = $('input:first').val()
        console.log(newMovie)
    }
}










$('input').keypress(addNewMovie)
$("input[type='submit']").click(addNewMovie)
