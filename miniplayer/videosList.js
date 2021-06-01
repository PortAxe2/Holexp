var videoIDs;
var apiKey = "AIzaSyDjg7tek3j4d5XfvvA0r1loAhZ9UwkdoRg";
var mainContainer;
var wrapperDiv;
var videoDetail;
var backButton;
var popUpWindow;
var elementsWrap = null;
var oldX;
var oldY;

window.onload = function() {

    
    getVideoIds();
    
    popUpWindow = document.getElementById('mainContainer');
    document.getElementById('windowOpen').onclick = function() {
        if(elementsWrap){
            popUpWindow.prepend(elementsWrap);
        }else{
            insertVideos();
            elementsWrap = document.getElementById('elementsWrap').cloneNode(true);
        }
        popUpWindow.style.display = "block";
        popUpWindow.classList.add('mainContainer-show');
        popUpWindow.classList.remove('mainContainer-hidden');
        backButton  = document.getElementById('backPage');
        wrapperDiv  = document.getElementById('wrapperDiv');
        videoDetail = document.getElementById('videoDetail');
        try{
            document.getElementById('closeWindow').onclick = function() {
                popUpWindow.classList.add('mainContainer-hidden');
                popUpWindow.classList.remove('mainContainer-show');
                setTimeout(function() {
                    popUpWindow.style.display = "none";
                    if(videoDetail.style.display == "block"){
                        transitionLeft();
                    }
                    document.getElementById('elementsWrap').remove();
                },350);
            };
        }catch(err){
            console.log(err);
        }
    
        try{
            backButton.onclick = function() {
                if (backButton.innerHTML == "fullscreen") {
                    maximize();
                }else{
                    transitionLeft();
                }
            }
        }catch(err){
            console.log(err);
        }
    };

};


function transitionRight(){
    
    popUpWindow.classList.add('mainContainer-vidDets');
    wrapperDiv.classList.remove('wrapperDiv-ogPosition');
    wrapperDiv.classList.add('wrapperDiv-movedLeft');
    
    
    let displayPromise = new Promise(function(res,rej) {
        setTimeout(function() {
            wrapperDiv.style.display = "none";
            videoDetail.style.display = "block";
            res("OK");
        }, 350);
    });
    
    
    displayPromise.then(
        function(value) {
            setTimeout(function(){
                videoDetail.classList.remove('videoDetail-ogPosition');
                videoDetail.classList.add('videoDetail-movedLeft');
                document.getElementById('mainContainer').classList.add('mainContainer-smaller');
            }, 50);
        }
    );
    
    document.getElementById('itemName').classList.add('itemID-show');
    document.getElementById('itemName').classList.remove('itemID-btnHide');
    
}

function transitionLeft(){
    
    popUpWindow.classList.remove('mainContainer-vidDets');
    videoDetail.classList.remove('videoDetail-movedLeft');
    videoDetail.classList.add('videoDetail-ogPosition');

    let displayPromise = new Promise(function(res,rej) {
        setTimeout(function() {
            wrapperDiv.style.display = "block";
            videoDetail.style.display = "none";
            res("OK");
        }, 350);
    });

    displayPromise.then(
        function(value) {
            setTimeout(function(){
                wrapperDiv.classList.remove('wrapperDiv-movedLeft');
                wrapperDiv.classList.add('wrapperDiv-ogPosition');
                document.getElementById('mainContainer').classList.remove('mainContainer-smaller');
                document.getElementById('expandedYT').setAttribute('src', '');
            }, 50);
        }
    );
    document.getElementById('itemName').classList.remove('itemID-show');
    document.getElementById('itemName').classList.add('itemID-btnHide');

    
}


function expandVideo(e){
    var videoClickedID =  e.getElementsByClassName('videoID')[0].innerHTML;
    document.getElementById('expandedYT').setAttribute('src', `https://www.youtube.com/embed/${videoClickedID}?modestbranding=1&showinfo=0&rel=0`);
    transitionRight();
    console.log(videoClickedID);
}

function minimize(){
    popUpWindow.classList.add('mainContainer-videoMinimized');
    document.getElementById('expandedTextDiv').style.display = "none";
    document.getElementById('headerBar').classList.add('closeBar-minimized');
    document.getElementById('backPage').innerHTML = "fullscreen";
}

function maximize(){
    popUpWindow.classList.remove('mainContainer-videoMinimized');
    document.getElementById('expandedTextDiv').style.display = "block";
    document.getElementById('headerBar').classList.remove('closeBar-minimized');
    document.getElementById('backPage').innerHTML = "arrow_back";
}

function getVideoIds() {
   videoIDs = [
               {
                   videoID:"AJmt7S6x298",
                   title:"Ratchet & Clank: Rift Apart - The Final Preview",
                   description:"Ratchet & Clank: Rift Apart is shaping up to be a PS5 showpiece. Our in-depth preview delves into environments, weapons, and how Spider-Man shaped it.",
                   thumbnail:"https://wallpaperaccess.com/full/5871133.jpg"
               },
               {
                   videoID:"xOpuDhWzV1I",
                   title:"ILM: Behind the Magic of Marvel Studios' Avengers: Infinity War",
                   description:"A look behind the magic of Marvel Studios' Avengers: Infinity War featuring the visual effects work by artists at Industrial Light & Magic that brought this epic battle to life. ",
                   thumbnail:"https://artofvfx.com/wp-content/uploads/2018/05/Avengers3_ILM_ITW_06A.jpg"
               },
               {
                   videoID:"n8OxyKNBsuQ",
                   title:"Dua Lipa - Future Nostalgia Medley",
                   description:"Subscribe to the Dua Lipa channel for all the best and latest official music videos, behind the scenes and live performances. ",
                   thumbnail:"https://wallpaperaccess.com/full/3490589.jpg"
               },
               {
                   videoID:"n8i53TtQ6IQ",
                   title:"Mass Effect™ Legendary Edition Official Reveal Trailer",
                   description:"Relive the legend of Commander Shepard in the highly acclaimed Mass Effect trilogy with the Mass Effect™ Legendary Edition.",
                   thumbnail: "http://cdn.cloudflare.steamstatic.com/steam/apps/1328670/capsule_616x353.jpg?t=1612449050"
               },
           ];
}


function insertVideos() {
    for (let i = 0 ; i < videoIDs.length ; i++) {
        var newVideo = `<div onclick="expandVideo(this)" class="video">
                            <img class="thumbnail" src="${videoIDs[i].thumbnail}" alt="">
                            <p style="display: none" class="videoID">${videoIDs[i].videoID}</p>
                            <div class="textInfo">
                                <h3 class="videoTitle">${videoIDs[i].title}</h3>
                                <hr/>
                                <p>${videoIDs[i].description}</p>
                            </div>
                        </div>`;
        document.getElementById('videos').innerHTML += newVideo;
     }
}

