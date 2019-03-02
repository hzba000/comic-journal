'use strict'
let counter = 0;
let userData = null;

//On page load this calls the function that handles our initial AJAX get request and feeds it a callback function
    function setupArrival(){
        getDataApi(prepareDataApi);
        alert("Okay! Redirecting to your previous posts!");
        $('.updatePost').attr('hidden', true);
} 

//This grabs data from our API to be used in our app, on successful retrieval calls prepareDataAPI
    function getDataApi() {
    $.ajax({
        type: 'GET',
        url: `/api/comic`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
        },
        success: prepareDataApi,
        error: err => {
            if (onError) {
                onError(err);
            }
        }
    });
}

//This sorts our data by creation date and sets up a global variable equivalent for our data
    function prepareDataApi(data){
        //Sorts data in database by creation date
        data.sort(compare);
  
        //clones data to global variable
        userData = data;
  
        //Sets up initial display for app
        initialDisplay();
}


//Used by prepareDataApi() to sort our data by creation date
    function compare(a,b){
        if (a.createDate < b.createDate){return -1;}
        if (a.createDate > b.createDate){return 1;}
        return 0;
}

//This sets up our initial display, it also sets up our counter for navigation throughout the app
    function initialDisplay(){
        //Matches counter to most recent comic in array
        counter = userData.length -1
        //Sets initial comic and content (Most recent appears first because of sort)
        $('#TextHolder').val(`${userData[userData.length-1].content}`)
        $('.ComicHome').html(`<img src = "${userData[userData.length-1].title}" alt="cartoon strip">`);
}

//Navigation

   //Handles previous post button click
   function previousPost(){
        $('.previousPost').click(function(){
            $('#TextHolder').attr('disabled', true); // locks text area again.
            $('.editPost').attr('hidden', false); // starts with edit button revealed
            $('.updatePost').attr('hidden', true); // starts with update button hidden

            //Announcement if user tries to press previous button when they only have one post
            if(userData.length == 1){
                alert("Sorry, you only have one post!");
        }

            //Adjusts counter for previous button clicks
            counter--;

            //If the user is on their first ever post, continue to show them that post if they attempt to click 'previous'
            if(counter <= 0){ 
                counter = 0;
                $('#TextHolder').val(`${userData[0].content}`);
                $('.ComicHome').html(`<img src = "${userData[0].title}" alt="cartoon strip">`);
                alert("You are now on your earliest post.");
        }
            //If they are not on their first post, match the comic and content to the post with the counter value that matches data array
            else{
                $('#TextHolder').val(`${userData[counter].content}`);
                $('.ComicHome').html(`<img src = "${userData[counter].title}" alt="comic-${counter}">`);
                $('.date').html(`${new Date(userData[counter].createDate).toLocaleDateString()}`); //Set the date
                $(window).scrollTop(0); // Scroll to top so comic has better visibility
        }           
    })
}

    //Handles Next Button Click
    function nextPost(){
        $('.nextPost').click(function(){            
            $('#TextHolder').attr('disabled', true); //Locks text area again
            $('.editPost').attr('hidden', false);    //starts with edit button revealed
            $('.updatePost').attr('hidden', true);   //starts with update button hidden

            //Informs user if they are on their most recent post
            if(userData.length-1 == counter){
                alert("This is your most recent post!");
        }

            //Adjusts counter for next button clicks
            counter++;

            //If user is on their most recent post, display most recent comic and content
            if(counter >= userData.length){
                $('#TextHolder').val(`${userData[userData.length-1].content}`);
                $('.ComicHome').html(`<img src = "${userData[userData.length-1].title}" alt="cartoon strip">`);

            //Makes sure counter stays at same position as data array
            counter = userData.length -1;
        }

            //If user is not on their most recent post, display comic and content that matches counter, which matches data array position
            else{
            $('#TextHolder').val(`${userData[counter].content}`);
            $('.ComicHome').html(`<img src = "${userData[counter].title}" alt="comic-${counter}">`);
            $('.date').html(`${new Date(userData[counter].createDate).toLocaleDateString()}`);//Displays date
            $(window).scrollTop(0);//Scrolls to top to clearly display comic to user
        }
    })
}

    //Event listeners for buttons
    function editPost(){
    $('.editPost').click(function(){
        $('#TextHolder').removeAttr('disabled');
        $('.updatePost').attr('hidden', false);
        $('.editPost').attr('hidden', true);
    })
}


    function deletePost(){
    $('.deletePost').click(function(){
        $('.TextHolderForm').on('submit', function(event){
            event.preventDefault();
            const data = { id:`${userData[counter].id}`};
            var checkDelete = confirm("Are you sure you want to delete your post?");
            if (checkDelete === true){
                $.ajax({
                    url: `/api/comic/${userData[counter].id}`,
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(data),
                    beforeSend:function(xhr){
                        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
                    },
                    success: (response) => {
                    },
            
                    error: (err) => {
                    }
                        
                });
                    window.location.reload();
            }
                $('.TextHolderForm').off('submit');
        })
    })
}

    function updatePost(){
    $('.updatePost').click(function(){
        $('.editPost').attr('hidden', false);
        $('.updatePost').attr('hidden', true);
        $('#TextHolder').attr('disabled', true);
        $('.TextHolderForm').on('submit', function(event){
            event.preventDefault();
            const userSubmission = $('#TextHolder').val();
            const data = { id:`${userData[counter].id}`, content: `${userSubmission}`, title:`${userData[counter].title}`};
            $.ajax({
                url: `/api/comic/${userData[counter].id}`,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(data),
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
                },
                success: (response) => {
                    console.log("UPDATED");
                },
        
                error: (err) => {
                    console.log("NOTE UPDATED");

                }
            });
                $('.TextHolderForm').off('submit');
                window.location.reload();
        })
    })
}

    //Handles Library View (Formerly list view)
    function displayListViewImage(){
        $('.listView').click(function(){
            $('.PostHolder').attr('hidden', true);
            $(".individual-lib-item").html('');
            for(let i = userData.length-1; i > -1; i--){
                if(userData[i].content.length > 25){
                    $(".individual-lib-item").append(`<div class="${i} gallery-frame"><img class="${i}" src='${userData[i].title}' alt="comic-${i}"'><p class="${i}">${userData[i].content.substring(0,25)+'...'}</p></div>`);
            }
                else{
                    $(".individual-lib-item").append(`<div class="${i} gallery-frame"><img class="${i}" src='${userData[i].title}' alt="comic-${i}"'><p class="${i}">${userData[i].content}</p></div>`);
            }
        }
            $(window).scrollTop(0); //Directs you to top, where comic clicked on is displayed

    })
}

    function clickListViewImage(){
    $('.gallery-item').on('click', function(event){
            event.stopPropagation();
            window.scrollTo(0,0);
            $('.PostHolder').attr('hidden', false);
            $('.listHolder').attr('hidden', false);
            let postValue = ($(event.target).attr('class'));
            counter = postValue;
            $('.ComicHome').html(`<img src = "${userData[counter].title}" alt="comic-${counter}">`);
            $('#TextHolder').val(`${userData[counter].content}`); 
    })
}

  //DROP DOWN MENU STUFF
  
  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  function dropDown() {
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

  function handleFunctions(){
      setupArrival();
      displayListViewImage();
      clickListViewImage();
      updatePost();
      deletePost();
      editPost();
      nextPost();
      previousPost();
}

$(handleFunctions);
