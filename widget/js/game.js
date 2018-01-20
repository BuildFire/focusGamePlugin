/**
 * Created by danielhindi on 1/7/18.
 */

var game= {
     currentLevel: 1
    , currentScore: 0
    , currentSymbol: null
    , currentStage: null
    , start: function (player) {
        this.currentPlayer = player;

        this.startLevel();
    }
    , startLevel:function(){
        this.currentStage = this.getStage();
        this.currentSymbol = this.getFocusSymbol();
         this.showFocusSymbol(this.currentSymbol, function () {
           game.startRound();
        });
    }
    , startRound:function(){
        var objSymbols = this.currentStage.getSymbols(this.currentSymbol);
        this.showSymbols(objSymbols.symbols,this.currentStage.seconds,function(answer,bonus){
            this.currentLevel++;

            if(objSymbols.hasFocusSymbol !== answer){
                this.showGameOver(this.currentScore);
            }
            else{
                this.currentScore+=this.currentStage.score + (0 || bonus);
                this.showNewScore(this.currentScore, this.currentLevel,function() {

                        if (game.currentLevel % 10 == 0)
                            game.startLevel();
                        else
                            game.startRound();

                });
            }
        });
    }
    , showSymbols:function(symbols,seconds){}
    , showNewScore:function(score){}
    , showGameOver:function(score){}
    , showFocusSymbol: function (symbol, cb) {}
    , getStage: function () {
        if(game.currentLevel <= 10)
            return new Stage(6, shapes.shuffle().slice(0,3), colors.slice(0,3),game.currentLevel );
        else if(game.currentLevel <= 20)
            return new Stage(5, shapes.shuffle().slice(0,6), colors.slice(0,4),game.currentLevel );
        else if(game.currentLevel <= 30)
            return new Stage(4, shapes.shuffle().slice(0,8), colors.slice(0,6),game.currentLevel );
        else if(game.currentLevel <= 40)
            return new Stage(3, shapes.shuffle().slice(0,12), colors,game.currentLevel );
        else if(game.currentLevel <= 50)
            return new Stage(2, shapes.shuffle().slice(0,12), colors,game.currentLevel );
        else
            return new Stage(1.5, shapes.shuffle().slice(0,12), colors,game.currentLevel );
    }
    , getFocusSymbol: function () {
        return {
            shape: this.currentStage.shapes[rnd (this.currentStage.shapes.length -1)]
            , color: this.currentStage.colors[rnd(this.currentStage.colors.length-1)]
        };
    }

};

var shapes = ['triangle', 'square', 'rectangle', 'circle', 'pentagon', 'hexagon', 'octagon', 'diamond', 'oval', 'parallel', 'trapezoid', 'star', 'halfCircle', 'question', 'arrow'];
var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'white','pink','purple','lightgray'];


function Stage(seconds, shapes, colors,score) {
    this.seconds = seconds;
    this.shapes = shapes;
    this.colors = colors;
    this.score = score || 10;
}

Stage.prototype = {
     getSymbols: function (focusSymbol) {

         var newArray =this.shapes.shuffle();
         var hasSymbolInNewArray=false;
         newArray=newArray.map(function(shape){ /// add Colors
             var symbol={shape:shape,color: this.colors.randomPick() };
             ///check if new array has the focus symbol
             if(symbol.color == focusSymbol.color && symbol.shape == focusSymbol.shape)hasSymbolInNewArray=true;
             return symbol;
         });

        var obj={
            symbols:newArray
            , hasFocusSymbol: hasSymbolInNewArray
        };

        return obj;
    }
};
