let entriesObj = {};
// var list = $('#entry-list');

const getLocalStorage = () => {
   let savedPostsStr = localStorage.getItem('storedTodoList');
   if (savedPostsStr) {
      entriesObj = JSON.parse(savedPostsStr);
      for (let key in entriesObj) {
         $('#entry-list').append(`<label><li><i class="far fa-square"></i>&nbsp;&nbsp;${entriesObj[key].value}</li></label>`);
      };
   };
}

const setLocalStorage = (entriesObj) => {
   localStorage.setItem('storedTodoList', JSON.stringify(entriesObj));
}

const deleteEntry = () => {
   // <i class="far fa-check-square"></i>
   console.log('clicked delete');

}

const listenForEntryDeletions = () => {
   let closeButtonsArr = $('.remove-item');
   // for (let i = 0; i < closeButtonsArr.length; i++) {
   //    closeButtonsArr[i].click(deleteEntry);
   // };
   jQuery.each(closeButtonsArr), function(index,value) {
      closeButtonsArr[index].click(deleteEntry);
   };
}

const updateList = () => {
   $('form').submit((e) => {
      e.preventDefault();
      let postText = $('.input-box').val();
      if (postText !== '') {
         if (jQuery.isEmptyObject(entriesObj)) {
            entriesObj[0] = {};
            entriesObj[0].value = postText;
         } else {
            //TODO: convert the below to jQuery
            let objLength = Object.keys(entriesObj).length;
            entriesObj[objLength] = {};
            entriesObj[objLength].value = postText;
         }
         $('ul').append(`<label><li><i class="far fa-square"></i>&nbsp;&nbsp;${postText}</li></label>`);
         $('.input-box').val('');
      };
      setLocalStorage(entriesObj);
   })
   listenForEntryDeletions();
}

$(document).ready(function(){
   getLocalStorage();
   listenForEntryDeletions();
   updateList();
})