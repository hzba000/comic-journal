let MOCK_USER_POSTS = {
  "posts":[
      {   
          "id": "1111111",
          "email": "jack_simpson@gmail.com",
          "comicId": 2100,
          "text": "lorem",
          "publishedAt": 210000
      },

      {   
          "id": "2222222",
          "email": "andre_rodriguez@gmail.com",
          "comicId": 2200,
          "text": "lorem",
          "publishedAt": 220000
      },

      {   
          "id": "3333333",
          "email": "tim_campbell@gmail.com",
          "comicId": 2300,
          "text": "lorem",
          "publishedAt": 230000
      },

      {   
          "id": "4444444",
          "email": "tim_campbell@gmail.com",
          "comicId": 2400,
          "text": "lorem",
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
  for(index in data.posts){
      $('body').append(
          `<p> ${data.posts[index].text}</p>`
      );
  }
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
$('.submitButton').on('submit', function(){
    window.alert("Thanks, your post has been submitted")
})