// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        quotesFirstScene: 
        {
            default : null,
            type: Array
        },
                
        quotesWrong: 
        {
            default : null,
            type: Array
        },
        quotesRight: 
        {
            default : null,
            type: Array
        },
                
        


    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {   
        // Strings de mensagens para questões respondidas corretamente
        var msg = "";
        var mensagensComunsPrimeiraFase  = new Array();
        var mensagensErro  = new Array();
        var mensagensAcerto = new Array();

        msg = "Me ajuda a encontrar a poção que falta para completar a minha receita que está no caldeirão meu aprendiz! Assim ajudaremos nosso rei a derrotar a Morgana!" ;
        mensagensComunsPrimeiraFase.push(msg);
        msg = "Meu livro de receita não me diz qual a fração igrediente eu preciso achar para completar o caldeirão, me ajude! Vamos ajudar nosso reino com estas poções. "
        mensagensComunsPrimeiraFase.push(msg);
        msg = "Não sei qual das poção é o igrediente final, não está no meu livro me ajude a descobrir qual destas poção completará  minha receita no caldeirão";
        mensagensComunsPrimeiraFase.push(msg);
        
        // Strings de mensagens para questões respondidas incorretamente.
        msg = "Não deu certo, temos que tentar novamente!";
        mensagensErro.push(msg);
        msg = "Não parece certo, vamos tentar novamente! Tente clicar no botão de ajuda caso você não tenha entendido como me ajudar";
        mensagensErro.push(msg);
        msg = "Não conseguimos, talves você devesse tentar novamente!";
        mensagensErro.push(msg);
        
        
        // Strings de mensagens para questões respondidascorretamente.        
        msg = "Você Acertou a nossa receita está completa! Vamos tentar continuar a fazer mais!";
        mensagensAcerto.push(msg);
        msg = "Você Acertou parabéns!  Está completa você descobriu qual ingrediente faltava!";
        mensagensAcerto.push(msg);
        msg = "Você conseguiu! Vamos tentar fazer muito mais!";
        mensagensAcerto.push(msg);

        this.quotesFirstScene = mensagensComunsPrimeiraFase;
        this.quotesWrong = mensagensErro;
        this.quotesRight = mensagensAcerto;


    },
    // start () {},
    // update (dt) {},
    getCorrectQuestionQuote : function()
    {
        var tamanhoMax = this.quotesRight.length - 1 ;
        var index = (Math.random() * tamanhoMax).toFixed(0);
        //console.log(index +"Index teste |  tamanho máximo -> "+  tamanhoMax ) ;
        return this.quotesRight[index];
    },
    getWrongQuestionQuote : function()
    {
        var tamanhoMax = this.quotesWrong.length - 1 ;
        var index = (Math.random() * tamanhoMax).toFixed(0);
        //console.log(index +"Index teste |  tamanho máximo -> "+  tamanhoMax ) ;
        return this.quotesWrong[index];
    },
    getSomeQuote :  function()
    {
        var tamanhoMax = this.quotesFirstScene.length - 1 ;
        var index = (Math.random() * tamanhoMax).toFixed(0);
        //console.log(index +"Index teste |  tamanho máximo -> "+  tamanhoMax ) ;
        return this.quotesFirstScene[index];
    },

});
