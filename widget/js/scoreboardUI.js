/**
 * Created by danielhindi on 1/19/18.
 */

var scoreboardUI = {
    //container : document.getElementById("scoreboard")
    update:function(board) {
        function setTopWinner(selector, scoreObj) {
            document.querySelector(selector).classList.remove('hidden');
            document.querySelector(selector + ' > img').src = buildfire.imageLib.cropImage(scoreObj.user.imageUrl, {
                width: 200,
                height: 200
            });
            document.querySelector(selector + ' > div.score').innerHTML = scoreObj.user.displayName + " score: " + scoreObj.score;
        }


        if (!board || !board.topScores || !board.topScores.length) {
            document.getElementById('status').innerHTML = "empty scoreboard";
            return;
        }

        document.getElementById('status').classList.add("hidden");
        document.getElementById('scoreboard').classList.remove("hidden");


        setTopWinner('#firstPlace', board.topScores[0]);

        if (board.topScores.length > 1) setTopWinner('#secondPlace', board.topScores[1]);
        if (board.topScores.length > 2) setTopWinner('#thirdPlace', board.topScores[2]);

        var others = document.getElementById('others');
        others.innerHTML='';

        if (board.topScores.length > 3){
            others.classList.remove("hidden");
            for(var i = 3; i < board.topScores.length ; i++){
                var div = document.createElement('div');
                div.className="score";
                div.innerHTML=board.topScores[i].user.displayName + "<span>" + board.topScores[i].score + "</span>";
                others.appendChild(div);
            }
        }
    }
};

