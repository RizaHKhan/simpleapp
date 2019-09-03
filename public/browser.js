document.addEventListener('click', function(e) {
    e.preventDefault();

    if(e.target.classList.contains('edit-me')) {
        let adjustment = prompt('Enter adjustment to task:')
        axios.post('/update-item', {task: adjustment}).then(()=> {
            //do something interesting here in the next video
        }).catch(() => {
            console.log('There was an error, please try again later')
        })
    }

})