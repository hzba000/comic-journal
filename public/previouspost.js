counter = 0;
let userData = null;

  function getDataApi() {
    $.ajax({
        type: 'GET',
        url: `/api/note`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
        },
        success: displayDataApi,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

  function displayDataApi(data){
      function compare(a,b){
          if (a.createDate < b.createDate){
              return -1;
          }
          if(a.createDate > b.createDate){
              return 1;
          }
          return 0;
      }

      data.sort(compare);

      console.log(data);
      userData = data;
        $('#TextHolder').val(
         `${data[data.length-1].content}`
    )
        $('.ComicHome').html(`<img src = "${data[data.length-1].title}" alt="cartoon strip">`);

        counter = data.length -1

        $('.previousPost').click(function(){
            counter--;
            if(counter <= 0){
            counter = 0;

            $('#TextHolder').val(
                `${data[0].content}`
           )
           $('.ComicHome').html(`<img src = "${data[0].title}" alt="cartoon strip">`)
        }
            else{
                $('#TextHolder').val(
                    `${data[counter].content}`
            )
            $('.ComicHome').html(`<img src = "${data[counter].title}" alt="cartoon strip">`)
            $('.date').html(`${new Date(data[counter].createDate).toLocaleDateString()}`);
            $(window).scrollTop(0);


        }
        console.log(counter);
   })

        $('.nextPost').click(function(){
            counter++;
            if(counter >= data.length){
                $('#TextHolder').val(
                    `${data[data.length-1].content}`
               )
               $('.ComicHome').html(`<img src = "${data[data.length-1].title}" alt="cartoon strip">`)

               counter = data.length -1;
            }
            else{
            $('#TextHolder').val(
                `${data[counter].content}`
           )
           $('.ComicHome').html(`<img src = "${data[counter].title}" alt="cartoon strip">`)

        }
        console.log(counter);
        $('.date').html(`${new Date(data[counter].createDate).toLocaleDateString()}`);
        $(window).scrollTop(0);

   })

        // $('.date').html(`${new Date(data[counter].createDate).toLocaleDateString()}`);
  }
  

  
  //This feeds the callback function necessary for ajax call, which receives data
  //and process it for displaying on screen
  function feedDataToDisplay(){
    getDataApi(displayDataApi);
    alert("Okay! Redirecting to your post library!");
  } 
  
  //We want Ajax call to be made on page load, this does that with jquery
  $(feedDataToDisplay);
  
  
  //DROP DOWN MENU STUFF
  
  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  //DROP DOWN MENU STUFF END!

  //Event listeners for buttons
  $('.editPost').click(function(){
      $('#TextHolder').removeAttr('disabled');
  })

  $('.deletePost').click(function(){
    $('#TextHolderForm').on('submit', function(event){
        event.preventDefault();
            const data = { id:`${userData[counter].id}`};
            var checkDelete = confirm("Are you sure you want to delete your post?");
            if (checkDelete === true){
                $.ajax({
                    url: `/api/note/${userData[counter].id}`,
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(data),
                    beforeSend:function(xhr){
                        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
                    },
                    success: (response) => {
                        console.log("DELETED!");
                    },
        
                    error: (err) => {
                        console.log("NOT DELETED");
                    }
                    
                });
                    window.location.reload();
            }
    
            $('#TextHolderForm').off('submit');

            
    })
})

  $('.updatePost').click(function(){
    $('#TextHolder').attr('disabled', true);
    $('#TextHolderForm').on('submit', function(event){
        event.preventDefault();
            const userSubmission = $('#TextHolder').val();
            const data = { id:`${userData[counter].id}`, content: `${userSubmission}`, title:`${userData[counter].title}`};
            $.ajax({
                url: `/api/note/${userData[counter].id}`,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(data),
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
                },
                success: (response) => {
                    console.log("UPDATED!");
                },
    
                error: (err) => {
                    console.log("NOT UPDATED");
                }
            });
            $('#TextHolderForm').off('submit');
            window.location.reload();
    })
})

let submissionValue = null;
$('.listView').click(function(){
    $('.PostHolder').attr('hidden', true);
    $(".test").html('');
    for(i = userData.length-1; i > -1; i--){
        if(userData[i].content.length > 120){
        $(".test").append(`<div class="${i}"><p>${i}</p><img class="${i}" src='${userData[i].title}'><p class="${i}">${userData[i].content.substring(0,30)+'...'}</p></div>`)
        }
        else{
        $(".test").append(`<div class="${i}"><p>${i}</p><img class="${i}" src='${userData[i].title}'><p class="${i}">${userData[i].content}</p></div>`)
        }
    }
    $(window).scrollTop(0);

})

$('.test').on('click', function(event){
    event.stopPropagation();
    window.scrollTo(0,0);
    $('.PostHolder').attr('hidden', false);
    $('.listHolder').attr('hidden', false);
    let postValue = ($(event.target).attr('class'));
    console.log(postValue);
    counter = postValue;
    $('.ComicHome').html(`<img src = "${userData[counter].title}" alt="cartoon strip">`)
    $('#TextHolder').val(
        `${userData[counter].content}`
) 
})

