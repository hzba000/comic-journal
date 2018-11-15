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
    const url = `/api/post`
    $.getJSON(url, callbackFn)

    }    
  

//This is the callback function for getDataApi, which takes data (array of objects)
//For every post object in the array (called posts), append the text to body
function displayDataApi(data){
    console.log(data);
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

//When submit form, make a POST to db
$('#TextHolderForm').on('submit', function(event){
    event.preventDefault();
        const userSubmission = $('#TextHolder').val();
        const data = { comicId: `123456`, content: `${userSubmission}`, email: `happy@happy.com` };
        $.ajax({
            url: '/api/post',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(data),
            success: (response) => {
                console.log("POSTED!");
            },

            error: (err) => {
                console.log("NOT POSTED");
            }

        });
})

        //Display Date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) {
            dd = '0'+dd
        } 
        
        if(mm<10) {
            mm = '0'+mm
        } 
        
        today = mm + '/' + dd + '/' + yyyy;
        document.write(today);
        console.log("today is" + today);

        $('.date').html(today);

