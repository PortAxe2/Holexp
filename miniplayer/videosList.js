var videoIDs;
var apiKey = "";
var mainContainer;
var wrapperDiv;
var videoDetail;
var backButton;
var popUpWindow;

window.onload = function() {

    backButton  = document.getElementById('backPage');
    wrapperDiv  = document.getElementById('wrapperDiv');
    videoDetail = document.getElementById('videoDetail');
    
    getVideoIds();

    popUpWindow = document.getElementById('mainContainer');
    document.getElementById('windowOpen').onclick = function() {
        popUpWindow.style.display = "block";
        popUpWindow.classList.add('mainContainer-show');
        popUpWindow.classList.remove('mainContainer-hidden');
    };

    document.getElementById('closeWindow').onclick = function() {
        popUpWindow.classList.add('mainContainer-hidden');
        popUpWindow.classList.remove('mainContainer-show');
        setTimeout(function() {
            popUpWindow.style.display = "none";
        },400);
    };
    
    backButton.onclick = transitionLeft;

};


function transitionRight(){
    
    wrapperDiv.classList.remove('wrapperDiv-ogPosition');
    wrapperDiv.classList.add('wrapperDiv-movedLeft');
    console.log("Checkpoint 1");
    
    
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
    
    backButton.classList.remove('ctrlButton-btnHide');
    backButton.classList.add('ctrlButton-show');
    document.getElementById('itemName').classList.add('itemID-show');
    document.getElementById('itemName').classList.remove('itemID-btnHide');
    
}

function transitionLeft(){
    
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
            }, 50);
        }
    );

    backButton.classList.remove('ctrlButton-show');
    backButton.classList.add('ctrlButton-btnHide');
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
    document.getElementById('videoDivMin').innerHTML += "";
    var iframeToAdd = `<iframe id="ytEmbedMin" src="" width="100%" height="100%" frameborder="0"></iframe>`;
    document.getElementById('videoDivMin').innerHTML += iframeToAdd;
    document.getElementById('ytEmbedMin').setAttribute('src', document.getElementById('expandedYT').getAttribute('src'));
    popUpWindow.classList.add('mainContainer-hidden');
    popUpWindow.classList.remove('mainContainer-show');
    setTimeout(function() {
        popUpWindow.style.display = "none";
        document.getElementById('minimizedVideoDiv').style.display = "block";
        document.getElementById('minimizedVideoDiv').classList.remove('minimizedVideoDiv-hidden');
        document.getElementById('minimizedVideoDiv').classList.add('minimizedVideoDiv-show');
    },400);
}

function closeMinimize(){
    document.getElementById('minimizedVideoDiv').classList.remove('minimizedVideoDiv-show');
    document.getElementById('minimizedVideoDiv').classList.add('minimizedVideoDiv-hidden');
    setTimeout(function() {
        popUpWindow.style.display = "block";
        popUpWindow.classList.remove('mainContainer-hidden');
        popUpWindow.classList.add('mainContainer-show');
        document.getElementById('minimizedVideoDiv').style.display = "none";
        setTimeout(function(){
            document.getElementById('videoDivMin').innerHTML += "";
        }, 50);
    },400);
}

function maximize(){
    document.getElementById('minimizedVideoDiv').classList.remove('minimizedVideoDiv-show');
    document.getElementById('minimizedVideoDiv').classList.add('minimizedVideoDiv-hidden');
    setTimeout(function() {
        document.getElementById('minimizedVideoDiv').style.display = "none";
        setTimeout(function(){
            document.getElementById('videoDivMin').innerHTML += "";
        }, 50);
    },380);
}

function getVideoIds() {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var videoIDs = JSON.parse(this.response);
            console.log(videoIDs);
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
    };
    ajaxRequest.open("GET", "http://localhost:8080/videosList", true);
    ajaxRequest.send();
}

