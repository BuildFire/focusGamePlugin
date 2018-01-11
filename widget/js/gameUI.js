/**
 * Created by danielhindi on 1/10/18.
 */

var gameUI= {
    init:function(){
        this.focusSection = document.getElementById("focusSection");
        this.shapesSection = document.getElementById("shapesSection");
        this.actionBar = document.getElementById("actionBar");
        this.btnYes = document.getElementById("btnYes");
        this.btnNo = document.getElementById("btnNo");
        this.score=document.getElementById("score");
        this.arc=document.getElementById("arc");
        this.gameTmr=null;

        game.showFocusSymbol = function (symbol, cb) {

            gameUI.focusSection.innerHTML =
                "Is there a " + symbol.color + " " + symbol.shape
                + '<div style="background-color:' + symbol.color  + '" class="shape  ' + symbol.shape + '"></div>';
            ;

            gameUI.shapesSection.innerHTML='Get Ready...';
            gameUI.actionBar.classList.add("hidden");
            gameUI.btnYes.onclick=null;
            gameUI.btnNo.onclick=null;
            ///pause for 3 sec for the user to ficus
            setTimeout(function(){
                cb.call(game);}
            ,3000);

        };


        game.showSymbols = function(symbols,seconds,userAnsweredFn){
            var html='';
            symbols.forEach(function(s){
                html += '<div style="background-color:' + s.color  + '" class="shape  ' + s.shape + '"></div>';
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

            gameUI.btnYes.onclick=function () {
                gameUI.arc.classList.remove('timeBomb');
                if(gameUI.gameTmr)clearTimeout(gameUI.gameTmr);
                userAnsweredFn.call(game,true)
            };
            gameUI.btnNo.onclick=function () {
                gameUI.arc.classList.remove('timeBomb');
                if(gameUI.gameTmr)clearTimeout(gameUI.gameTmr);
                userAnsweredFn.call(game,false)
            };

        };

        game.showNewScore = function(newScore,cb){
            score.innerHTML=newScore;
            cb.call(game);
        }

        game.showGameOver = function () {
            gameUI.shapesSection.innerHTML ="Game Over! <button onclick='location.reload()'>Start Over</button>"
        }


    }
};


gameUI.init();
game.start({});