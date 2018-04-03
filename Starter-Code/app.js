let toDoArr = [];

const setLocalStorage = (entriesObj) => {
   localStorage.setItem('storedTodoList', JSON.stringify(toDoArr));
}

// const checkOffEntry = function(e) {
//    let toDoItemToCheckOff = $(this).find('svg');
//    $(toDoItemToCheckOff).removeClass('fa fa-square fa-w-14');
//    $(toDoItemToCheckOff).addClass('far fa-check-square');
// }

const deleteEntry = function(e) {
   let toDoItemToRemove = $('li').index(this);
   this.remove(toDoItemToRemove);
   toDoArr.splice(toDoItemToRemove,1);
   setLocalStorage(toDoArr);
}

const listenForEntryDeletions = () => {
   //jQuery-ify the code below
   let toDoCheckboxArr = document.getElementsByClassName("todo-list-item");
   for (let i = 0; i < toDoCheckboxArr.length; i++) {
      toDoCheckboxArr[i].addEventListener("click",checkOffEntry);
   }
}

const updateList = () => {
   $('form').submit((e) => {
      e.preventDefault();
      
      let newToDo = {};
      newToDo.value = $('.input-box').val();
      newToDo.complete = false;
      
      if (newToDo.value !== '') {
         toDoArr.push(newToDo);

         $('ul').append(`<li class="todo-list-item"><i class="far fa-square"></i>&nbsp;&nbsp;${newToDo.value}</li>`);
         $('.input-box').val('');
      };
      setLocalStorage(toDoArr);
      listenForEntryDeletions();
   })
}

const getLocalStorage = () => {
   let savedPostsStr = localStorage.getItem('storedTodoList');
   if (savedPostsStr) {
      toDoArr = JSON.parse(savedPostsStr);
      
      toDoArr.forEach( (item) => {
         if (!item.completed) {
            $('#entry-list').append(`<li class="todo-list-item"><i class="far fa-square"></i>&nbsp;&nbsp;${item.value}</li>`);
         } else {
            $('#entry-list').append(`<li class="todo-list-item"><i class="far fa-check-square"></i>&nbsp;&nbsp;${item.value}</li>`);
         }
      });
   };
}

$(document).ready(function(){
   getLocalStorage();
   listenForEntryDeletions();
   updateList();
})