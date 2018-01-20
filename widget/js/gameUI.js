//by danielhindi on 1/10/18.

var gameUI= {
    init:function(user,scoreboard){
        this.user=user;
        this.scoreboard=scoreboard;
        this.focusSection = document.getElementById("focusSection");
        this.shapesSection = document.getElementById("shapesSection");
        this.actionBar = document.getElementById("actionBar");
        this.btnYes = document.getElementById("btnYes");
        this.btnNo = document.getElementById("btnNo");
        this.score=document.getElementById("score");
        this.arc=document.getElementById("arc");
        this.gameTmr=null;

        var shapeBaseURL= "./css/shapes/";
        game.showFocusSymbol = function (symbol, cb) {

            gameUI.focusSection.innerHTML =
                "<div>Is there a " + symbol.color + " " + symbol.shape + "</div>"
                + '<img style="background-color:' + symbol.color  + '" class="shape" src="' + shapeBaseURL + symbol.shape + '.png" />';

            gameUI.shapesSection.innerHTML='Get Ready...';
            gameUI.actionBar.classList.add("hidden");
            gameUI.btnYes.onclick=null;
            gameUI.btnNo.onclick=null;
            ///pause for 3 sec for the user to focus
            setTimeout(function(){
                cb.call(game);
            },3000);

        };

        game.showSymbols = function(symbols,seconds,userAnsweredFn){
            var html='';
            var ts = new Date();

            symbols.forEach(function(s){
                html += '<img style="background-color:' + s.color  + '" class="shape" src="' + shapeBaseURL + s.shape + '.png" />';
            });
            gameUI.shapesSection.innerHTML=html;
            gameUI.actionBar.classList.remove("hidden");
            gameUI.arc.style.animationDuration = seconds+ 's';
            setTimeout(function() {
                gameUI.arc.classList.add('timeBomb');
            },10);

            if(gameUI.gameTmr)clearTimeout(gameUI.gameTmr);

            gameUI.gameTmr = setTimeout(function() {/// time limit
                userAnsweredFn.call(game,null);
            },seconds * 1000);

            function getBonus(){
                var ms = new Date() - ts;
                var bonus = 5000 - ms;
                if(bonus<0)bonus=0;
                return Math.round(bonus/100) ;
            }

            function fnYes() {
                gameUI.arc.classList.remove('timeBomb');
                if(gameUI.gameTmr)clearTimeout(gameUI.gameTmr);
                userAnsweredFn.call(game,true,getBonus());
            };

            function fnNo() {
                gameUI.arc.classList.remove('timeBomb');
                if(gameUI.gameTmr)clearTimeout(gameUI.gameTmr);
                userAnsweredFn.call(game,false,getBonus());
            };



            if( location.protocol.indexOf('http')==0) {
                gameUI.btnYes.onclick = fnYes;
                gameUI.btnNo.onclick = fnNo;
            }
            else{
                gameUI.btnYes.ontouchstart = fnYes;
                gameUI.btnNo.ontouchstart = fnNo;
            }

        };

        game.showNewScore = function(newScore,level,cb){
            score.innerHTML="Level: " + (Math.floor(level / 10)+1) + " Score: " + newScore;
            cb.call(game);
        };

        game.showGameOver = function (score) {

            gameUI.scoreboard.logScore(gameUI.user, score,function(err,result){

                if(result && result.rankedAt >= 0){
                    /// means you made top 10 list
                    gameUI.shapesSection.innerHTML='';

                    var span = document.createElement('span');
                    span.innerHTML="Congratulations! You ranked #" + (result.rankedAt +1) ;
                    gameUI.shapesSection.appendChild(span);

                    var btn = document.createElement('button');
                    btn.innerHTML="See High Score!";
                    btn.onclick=function(){location = "index.html";};
                    gameUI.shapesSection.appendChild(btn);


                }
                else {
                    gameUI.shapesSection.innerHTML = "Game Over! <button onclick='location.reload()'>Start Over</button>";
                }
            });


            gameUI.actionBar.style.display="none";
        };


    }
};


