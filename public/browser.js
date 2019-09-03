document.addEventListener('click', function(e) {
   
    
    //delete feature

    if(e.target.classList.contains('delete-me')) {
        
            axios.post('/delete-item', {id: e.target.getAttribute('data-id')}).then(()=> {
                e.target.parentElement.parentElement.remove()         
            }).catch(() => {
                console.log('There was an error, please try again later')
            })
        
      }

      //update feature
    if(e.target.classList.contains('edit-me')) {
        let adjustment = prompt('Enter adjustment to task:', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
       
    // axios returns a promise. the first arugment is the url to post, then an object. In this cast, the task (which is what the item is called in the database, and its value (the value from the prompt. ))
        if (adjustment) {
        axios.post('/update-item', {task: adjustment, id: e.target.getAttribute('data-id')}).then(()=> {
            e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = adjustment
        }).catch(() => {
            console.log('There was an error, please try again later')
        })
    }
  }
})