counter = 0;

let MOCK_USER_POSTS = {
    "posts":[
        {   
            "id": "1111111",
            "username": "bonnie hayland",
            "comicId": 2100,
            "text": "0 Text",
            "publishedAt": 210000
        },
  
        {   
            "id": "2222222",
            "username": "bonnie_hayland",
            "comicId": 2200,
            "text": "1 Text",
            "publishedAt": 220000
        },
  
        {   
            "id": "3333333",
            "username": "bonnie_hayland",
            "comicId": 2300,
            "text": "2 Text",
            "publishedAt": 230000
        },
  
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "3 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "4 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "5 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "6 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "7 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "8 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "9 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "10 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "11 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "12 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "13 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "14 Text",
            "publishedAt": 240000
        },
        {   
            "id": "4444444",
            "username": "bonnie_hayland",
            "comicId": 2400,
            "text": "15 Text",
            "publishedAt": 240000
        },
    ]
  }
  
  //This will eventually pull data from API, but right now it pulls data from the object above
  //This will change in this way: instead of setting a timeout and returning mock data, it will use jQuery to make an AJAX call to our endpoint.
  function getDataApi(callbackFn){
    setTimeout(function(){
        callbackFn(MOCK_USER_POSTS)}, 100);
    }
  
  //This is the callback function for getDataApi, which takes data (array of objects)
  //For every post object in the array (called posts), append the text to body
  function displayDataApi(data){
        $('#TextHolder').val(
         `${data.posts[data.posts.length-1].text}`
    )
    counter = data.posts.length -1

        $('.previousPost').click(function(){
            counter--;
            if(counter <= 0){
            counter = 0;

            $('#TextHolder').val(
                `${data.posts[0].text}`
           )
        }
            else{
                $('#TextHolder').val(
                    `${data.posts[counter].text}`
            )
        }
        console.log(counter);

   })

        $('.nextPost').click(function(){
            counter++;
            if(counter >= data.posts.length){
                $('#TextHolder').val(
                    `${data.posts[data.posts.length-1].text}`
               )
               counter = data.posts.length -1;
            }
            else{
            $('#TextHolder').val(
                `${data.posts[counter].text}`
           )
        }
        console.log(counter);

   })
  }

  
  //This feeds the callback function necessary for ajax call, which receives data
  //and process it for displaying on screen
  function feedDataToDisplay(){
    getDataApi(displayDataApi);
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

  $('.updatePost').click(function(){
    $('#TextHolder').attr('disabled', true);
})



let test = $('#TextHolder').val();
console.log(test);
