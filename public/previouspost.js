counter = 0;
let userData = null;

// let MOCK_USER_POSTS = {
//     "posts":[
//         {   
//             "id": "1111111",
//             "username": "bonnie hayland",
//             "comicId": 2100,
//             "text": "0 Text",
//             "publishedAt": 210000
//         },
  
//         {   
//             "id": "2222222",
//             "username": "bonnie_hayland",
//             "comicId": 2200,
//             "text": "1 Text",
//             "publishedAt": 220000
//         },
  
//         {   
//             "id": "3333333",
//             "username": "bonnie_hayland",
//             "comicId": 2300,
//             "text": "2 Text",
//             "publishedAt": 230000
//         },
  
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "3 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "4 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "5 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "6 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "7 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "8 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "9 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "10 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "11 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "12 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "13 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "14 Text",
//             "publishedAt": 240000
//         },
//         {   
//             "id": "4444444",
//             "username": "bonnie_hayland",
//             "comicId": 2400,
//             "text": "15 Text",
//             "publishedAt": 240000
//         },
//     ]
//   }
  
  //This will eventually pull data from API, but right now it pulls data from the object above
  //This will change in this way: instead of setting a timeout and returning mock data, it will use jQuery to make an AJAX call to our endpoint.
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
  //This is the callback function for getDataApi, which takes data (array of objects)
  //For every post object in the array (called posts), append the text to body
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

   })
           //Format Date
        //    var date = new Date(data[counter].createDate);

        //    var year = date.getFullYear();
        //    var month = date.getMonth()+1;
        //    var day = date.getDate();
           
        //    if (day < 10) {
        //      day = '0' + day;
        //    }
        //    if (month < 10) {
        //      month = '0' + month;
        //    }
           
        //    var formattedDate = month + '-' + day + '-' + year
        //    console.log(formattedDate);
        //    //Display Date
        //    $('.date').html(formattedDate);
        //    console.log(data[counter].createDate);
        $('.date').html(`${new Date(data[counter].createDate).toLocaleDateString()}`);
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

  //Felicia said that this is sending data twice, not necessary
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
    for(i = userData.length-1; i > -1; i--){
        if(userData[i].content.length > 120){
        $(".test").append(`<div class="${i}"><p>${i}</p><img class="${i}" src='${userData[i].title}'><p class="${i}">${userData[i].content.substring(0,30)+'...'}</p></div>`)
        }
        else{
        $(".test").append(`<div class="${i}"><p>${i}</p><img class="${i}" src='${userData[i].title}'><p class="${i}">${userData[i].content}</p></div>`)
        }
    }
})

//This works, but results in a bad user experience because any ill placed click will lead them to the wrong page
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

//set the counter = the array value of the thing clicked on; 
//when the user goes back to scroll view it will have the right counter number, and simply replace the content

// $('.test').click(function(){
//     $('.PostHolder').attr('hidden', false);
//     $('.listHolder').html('');
//     $('.comicHome').html($(event.target).val());

// })

//When the user clicks on a link -- Switch to scroll view -- Populate with that content -- Make sure counter is aligned so buttons still work






// if (noteSummary.length > 120) {
//     noteSummary = `${note.content.substring(0, 120)}...`;
// }

// $('.deletePost').click(function(){
//     $('#TextHolderForm').on('submit', function(event){
//         event.preventDefault();
//             const data = { id:"5be3aa6317c8ec1ac0b442be"};
//             $.ajax({
//                 url: `/posts/${data.id}`,
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' },
//                 data: JSON.stringify(data),
//                 success: (response) => {
//                     console.log("DELETED!");
//                 },
    
//                 error: (err) => {
//                     console.log("NOT DELETED");
//                 }
    
//             });
//     })
// })


// history.replaceState(undefined, undefined, `${counter}`)
