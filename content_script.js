var port = chrome.runtime.connect();

port.onMessage.addListener(function(msg) {
    if (msg.question == "Who's there?")
      port.postMessage({answer: "Madame"});
    else if (msg.question == "Madame who?")
      port.postMessage({answer: "Madame... Bovary"});
  });

function clickLoadMoreComments() {
    var loadMoreCommentsButton = document.getElementsByClassName("_m3m1c _1s3cd")[0];
    var timerId = setTimeout(function clickAgain() {
        if (document.body.contains(loadMoreCommentsButton)){
        loadMoreCommentsButton.click();
        }
        timerId = setTimeout(clickAgain, 1000);
        if (!document.body.contains(loadMoreCommentsButton)){
            clearTimeout(timerId);
            port.postMessage({commentsCount: 
                (document.getElementsByClassName("_ezgzd").length-1).toString()});
        }
      });
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function getRandomComment(){
    var comments = document.getElementsByClassName("_ezgzd");
    var commentsCount = comments.length - 1;
    var randomCommentIndex = randomInteger(1, commentsCount);
    return comments[randomCommentIndex];
}
clickLoadMoreComments();