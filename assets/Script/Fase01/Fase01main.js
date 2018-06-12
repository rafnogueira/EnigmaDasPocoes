

//TODO:  
/*  terminar estados do jogo gameisOVer  e running arrumar
 aparecimento da janela de vitória */

// Para variáveis globais mas não foi utilizado ainda
// window.Global = {};
cc.Class({
      extends: cc.Component,
      properties: {

        //temporário
        lblCorretas: {
          default: null,
          type: cc.Label
        },
        lblErradas: {
          default: null,
          type: cc.Label
        },
        lblQuestao: 
        {
          default: null,
          type: cc.Label
        },
        //Número gerado de forma aleatória para ser usado como questão
        perguntaGeradaDecimal: 0,
        //Resposta de forma decimal, número que falta para completar o caldeirão
        respostaGeradaDecimal: 0,
        //Index da poção escolhida para ser a resposta
        respostaGeradaPocao: 0,
        //Magic number é o valor escondido que multiplicará a fração em cima
        //e embaixo para dificultar a resposta
        magicNumber: 0,
        //Segundos decorridos na fase
        segundos: 0,
        //Poderes para mudar as frações para uma mais fácil
        respostaSegundos: 60,
        total: 4,
        questaoAtual: 0,
        respostaCorretas: 0,
        respostaErradas: 0,
        gameIsOver: false,
        gameRunning: false,
        atualizandoPontos: true,
        pontos: 0,
        //---------------------janelas dentro da fase

        helpWinFrame: {
          default: null,
          type: cc.Node
        },
        gameIsOverFrame: {
          default: null,
          type: cc.Node
        },
        //=-------------------------------- Botões Interface
        btnAddFraction: {
          default: null,
          type: cc.Button
        },
        
        btnQuit: {
          default: null,
          type: cc.Button
        },
        btnShowHelp: {
          default: null,
          type: cc.Button
        },
        btnStopAudio:
        {
          default: null,
          type: cc.Button
        },
        btnGameIsOverFrameQuit:
        { 
          default: null,
          type: cc.Button
        },
        
        btnGameIsOverFrameReload:
        { 
          default: null,
          type: cc.Button
        },

        //=-------------------------------- Botões Interface
        lblTimer: {
          default: null,
          type: cc.Label
        },
        smokeNode: {
          default: null,
          type: cc.Sprite
        },
        caldeira: {
          default: null,
          type: cc.Sprite
        },
        lblStatus: {
          default: null,
          type: cc.Label
        },
        fundoBiblioteca: {
          default: null,
          type: cc.Sprite
        },
        Pocao_A: {
          default: null,
          type: cc.Sprite
        },
        Pocao_B: {
          default: null,
          type: cc.Sprite
        },
        Pocao_C: {
          default: null,
          type: cc.Sprite
        },
        Pocao_D: {
          default: null,
          type: cc.Sprite
        },
        fracaoCaldeirao: {
          default: null,
          type: cc.Layout
        },
        fracaoPocaoA: {
          default: null,
          type: cc.Layout
        },
        fracaoPocaoB: {
          default: null,
          type: cc.Layout
        },
        fracaoPocaoC: {
          default: null,
          type: cc.Layout
        },
        fracaoPocaoD: {
          default: null,
          type: cc.Layout
        },

        progressResposta: {
          default: null,
          type: cc.ProgressBar
        },
        // Falas do Mago
        lblFalasMago: {
          default: null,
          type: cc.RichText
        },
        cursorSprite: {
          default: null,
          type: cc.Sprite
        },
        cursorAtlas: {
          default: null,
          type: cc.SpriteAtlas
        },

      },

  // LIFE-CYCLE CALLBACKS:
  onLoad: function () {
    
    this.resetStates();
    this.gameRunning = true;
    // var quote = this.getComponent("MageQuotes").getSomeQuote();
    
    cc.director.preloadScene("Scene/Menu");
    //Ativa As físicas, colisões e também redimensiona o fundo para o tamanho da
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;

    //Redimensiona o sprite do fundo
    this.fundoBiblioteca.node.setContentSize(this.node.width, this.node.height);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);

    //Deixa o objeto da animação invisivel
    this.smokeNode.enabled = false;
    this.smokeAnimation = this.smokeNode.getComponent(cc.Animation).play("smokeAnimation");

    
    this.getComponent("SoundManager").playSoundMusicaFase01();

    this.btnStopAudio.node.on('touchstart',  function(event){
      
      this.getComponent("SoundManager").stopAllSounds();

    }, this) ;

    this.btnQuit.node.on('touchstart', function(event)
    {
      this.backToMenu();
    }, this); 
    this.btnShowHelp.node.on('touchstart', function(event)
    {
      this.mostrarAjuda();
    }, this);

    this.btnGameIsOverFrameQuit.node.on('touchstart', function(event)
    {
      this.backToMenu();
    }, this); 

    
    this.btnGameIsOverFrameReload.node.on('touchstart', function(event)
    {
      
      cc.director.loadScene("Scene/Fase01");
      // this.gerarQuestao();
      // mostrarJanelaPontos();

    }, this); 


    this.node.on('mousemove', function(event)
    {
      this.cursorSprite.node.x = event.getLocation().x;
      this.cursorSprite.node.y = event.getLocation().y;

    }, this);

    this.node.on('touchstart', function(event)
    {
      this.cursorSprite.spriteFrame = this.cursorAtlas.getSpriteFrame('hand02');
    }, this);

    this.node.on('touchend', function(event)
    {
      this.cursorSprite.spriteFrame = this.cursorAtlas.getSpriteFrame('hand01');      
    }, this);


    //Adiciona ações de cliques na Pocao_A
    this.Pocao_A.node.on("touchstart", function () {
      
      this.Pocao_A.node.opacity = 60;
      this.getComponent("SoundManager").playSoundColetandoPocao();

    }, this);

    this.Pocao_A.node.on("touchmove", function (event) {
      var delta = event.touch.getDelta();
      cc.director.getPhysicsManager().enabled = false;
      this.Pocao_A.node.x += delta.x;
      this.Pocao_A.node.y += delta.y;
      this.Pocao_A.node.opacity = 255;
    }, this);

    this.Pocao_A.node.on("touchend", function () {
      cc.director.getPhysicsManager().enabled = true;
      this.Pocao_A.node.opacity = 255;
    }, this);

    //Adiciona ações de cliques na Pocao_B
    this.Pocao_B.node.on("touchstart", function () {
      this.Pocao_B.node.opacity = 60;
      this.getComponent("SoundManager").playSoundColetandoPocao();
    }, this);

    this.Pocao_B.node.on("touchmove", function (event) {
      var delta = event.touch.getDelta();
      cc.director.getPhysicsManager().enabled = false;
      this.Pocao_B.node.x += delta.x;
      this.Pocao_B.node.y += delta.y;
      this.Pocao_B.node.opacity = 255;

    }, this);

    this.Pocao_B.node.on("touchend", function () {
      cc.director.getPhysicsManager().enabled = true;
      this.Pocao_B.node.opacity = 255;
    }, this);


    //Adiciona ações de cliques na Pocao_C
    this.Pocao_C.node.on("touchstart", function () {

      this.Pocao_C.node.opacity = 60;
      this.getComponent("SoundManager").playSoundColetandoPocao();
    }, this);

    this.Pocao_C.node.on("touchmove", function (event) {
      var delta = event.touch.getDelta();
      cc.director.getPhysicsManager().enabled = false;
      this.Pocao_C.node.x += delta.x;
      this.Pocao_C.node.y += delta.y;
      this.Pocao_C.node.opacity = 255;
    }, this);

    this.Pocao_C.node.on("touchend", function () {
      cc.director.getPhysicsManager().enabled = true;
      this.Pocao_C.node.opacity = 255;
    }, this);

    //Adiciona ações de cliques na Pocao_D
    this.Pocao_D.node.on("touchstart", function () {
      this.Pocao_D.node.opacity = 60;
      
      this.getComponent("SoundManager").playSoundColetandoPocao();
    }, this);

    this.Pocao_D.node.on("touchmove", function (event) {
      var delta = event.touch.getDelta();
      cc.director.getPhysicsManager().enabled = false;
      this.Pocao_D.node.x += delta.x;
      this.Pocao_D.node.y += delta.y;
      this.Pocao_D.node.opacity = 255;
    }, this);

    this.Pocao_D.node.on("touchend", function () {
      cc.director.getPhysicsManager().enabled = true;
      this.Pocao_D.node.opacity = 255;
    }, this);

    //Script------------------------------------------------------------
    this.btnAddFraction.node.on("touchstart", function () {

      this.gerarQuestao();
      // console.log((new Fraction(0.25)).add(new Fraction(1,6)).toString());
    }, this);


    this.gerarQuestao();

  },

  start : function() 
  {

    this.respostaSegundos = 122220;
    this.lblFalasMago.string = this.getComponent("MageQuotes").getSomeQuote();

    this.segundos =  this.respostaSegundos;

  },

  gerarFracaoAleatoria: function (lengthMax) {
      var tamanho;
      var fracaoTest
      if (lengthMax <= 0) {
        cc.log("não se pode gerar uma fração com 0 digitos");
      } else {
        while (tamanho != lengthMax) {
          var numero = Math.random().toFixed(4);

          var fracaoTest = math.fraction(numero);
          tamanho = fracaoTest['d'].toString().length;
          // cc.log("gerando aleatório" + numero);

        }
      }
      // Log gerando fração aleatória
      // cc.log("Finalizado" + numero);
      // cc.log("Fracao " + fracaoTest['n'] + "/" + fracaoTest['d']);
      // cc.log("Tamanho Numerado" + fracaoTest['n'].toString().length)
      // cc.log("Tamanho Denominador" + fracaoTest['d'].toString().length)
      // Log gerando fração aleatória
      
      return fracaoTest
    },

    gerarFracaoAleatoriaBetween: function (lengthMin, lengthMax) {
      var tamanho;
      var fracaoTest
      if (lengthMin <= 0) {
        cc.log("não se pode gerar uma fração com 0 digitos");
      } else {
        while (tamanho > lengthMax || tamanho < lengthMin) {
          var numero = Math.random().toFixed(4);

          var fracaoTest = math.fraction(numero);
          tamanho = fracaoTest['d'].toString().length;
          cc.log("gerando aleatório" + numero);

        }
      }
      cc.log("Finalizado" + numero);
      cc.log("Fracao " + fracaoTest['n'] + "/" + fracaoTest['d']);

      cc.log("Tamanho Numerado" + fracaoTest['n'].toString().length)
      cc.log("Tamanho Denominador" + fracaoTest['d'].toString().length)

      return fracaoTest;
    },

    gerarQuestao: function () {

      this.resetGame();
      this.segundos = this.respostaSegundos;
      // math.type.Fraction.REDUCE = true;
    // Gerar pergunta e resposta
    this.perguntaGeradaDecimal = Math.random().toFixed(2);
    this.respostaGeradaDecimal = (1 - this.perguntaGeradaDecimal).toFixed(2);

    //Qual das poção será a resposta
    this.respostaGeradaPocao = Math.round(Math.random() * 3);
    //Gerar a fração da pergunta e resposta
    // var perguntaGeradaFracao = new Fraction(this.perguntaGeradaDecimal);
    var perguntaGeradaFracao =  math.fraction(this.perguntaGeradaDecimal);
    var respostaGeradaFracao =  math.fraction(this.respostaGeradaDecimal);

    this.progressResposta.progress = this.perguntaGeradaDecimal;
    // this.respostaGeradaDecimal = resposta.toFixed(2);
    //this.magicNumber = (Math.round(Math.random() * 3) + 1);
    this.magicNumber =  1;

    var numerador = new cc.Label();
    var denominador = new cc.Label();

    numerador = this.fracaoCaldeirao.node.getChildByName("lblNumerador").getComponent(cc.Label);
    denominador = this.fracaoCaldeirao.node.getChildByName("lblDenominador").getComponent(cc.Label);
    numerador.string = perguntaGeradaFracao['n'];
    denominador.string =  perguntaGeradaFracao['d'];

    cc.log("Gerando frações aleatórias");

    respostaGeradaFracao['n'] = respostaGeradaFracao['n'] * this.magicNumber; 
    respostaGeradaFracao['d'] = respostaGeradaFracao['d'] * this.magicNumber; 
    //var dificuldadeFracao = 3;
    //var fracaoAleatoria = this.gerarFracaoAleatoria(2);
    var fracaoAleatoria;
    
    if(this.respostaGeradaPocao == 0)
    {
      
      // var respostaAleatoria = math.fraction(Math.random().toFixed(2) * (Math.random() * 10));
      numerador = this.fracaoPocaoA.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoA.node.getChildByName("lblDenominador").getComponent(cc.Label);
      numerador.string = respostaGeradaFracao['n'] * this.magicNumber;
      denominador.string =  respostaGeradaFracao['d'] * this.magicNumber;
      
      numerador = this.fracaoPocaoB.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoB.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoC.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoC.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoD.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoD.node.getChildByName("lblDenominador").getComponent(cc.Label);
            fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

    }
    if(this.respostaGeradaPocao == 1)
    {
      // var respostaAleatoria = math.fraction(Math.random().toFixed(2) * (Math.random() * 10));
      numerador = this.fracaoPocaoA.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoA.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoB.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoB.node.getChildByName("lblDenominador").getComponent(cc.Label);
      numerador.string = respostaGeradaFracao['n'] * this.magicNumber;
      denominador.string =  respostaGeradaFracao['d'] * this.magicNumber;

      numerador = this.fracaoPocaoC.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoC.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoD.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoD.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

    }
    if(this.respostaGeradaPocao == 2)
    {
      // var respostaAleatoria = math.fraction(Math.random().toFixed(2) * (Math.random() * 10));
      numerador = this.fracaoPocaoA.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoA.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoB.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoB.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoC.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoC.node.getChildByName("lblDenominador").getComponent(cc.Label);
      numerador.string = respostaGeradaFracao['n'] * this.magicNumber;
      denominador.string =  respostaGeradaFracao['d'] * this.magicNumber;

      numerador = this.fracaoPocaoD.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoD.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

    }
    if(this.respostaGeradaPocao == 3)
    {
      // var respostaAleatoria = math.fraction(Math.random().toFixed(2) * (Math.random() * 10));
      numerador = this.fracaoPocaoA.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoA.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoB.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoB.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoC.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoC.node.getChildByName("lblDenominador").getComponent(cc.Label);
      fracaoAleatoria = this.gerarFracaoAleatoria(2);
      numerador.string =  fracaoAleatoria['n'];
      denominador.string = fracaoAleatoria['d'];

      numerador = this.fracaoPocaoD.node.getChildByName("lblNumerador").getComponent(cc.Label);
      denominador = this.fracaoPocaoD.node.getChildByName("lblDenominador").getComponent(cc.Label);
      numerador.string = respostaGeradaFracao['n'] * this.magicNumber;
      denominador.string =  respostaGeradaFracao['d'] * this.magicNumber;
    }

  },

  // start: function (){},

  update: function (dt) {

    //cc.log("X" +  this.Pocao_A.node.x);
    //cc.log("Y"+ this.Pocao_A.node.y); 
    if (this.gameRunning) {

      this.lblCorretas.string = this.respostaCorretas;
      this.lblErradas.string = this.respostaErradas;
      this.lblQuestao.string = this.questaoAtual;

      this.quoteSeconds += dt;
      this.segundos -= dt;
      this.lblTimer.string = this.segundos.toFixed();
      
      cc.log("Pontos:"+this.pontos);

      if (this.quoteSeconds > 6) {

        // console.log("Pegando uma citação" + this.getComponent("MageQuotes").getSomeQuote());
        // var quote = this.getComponent("MageQuotes").getSomeQuote();
        this.lblFalasMago.string = this.getComponent("MageQuotes").getSomeQuote();

        this.quoteSeconds = 0;
      }

      if(this.segundos <= 0)
      {
        this.adicionarRespostaErradaTempo();
        this.gerarQuestao();
      }


      if(this.questaoAtual >=4 )
      {
        this.gameIsOver = true;
      }


      //Caldeirão na fase01 sempre estará fixo em um local apenas.
      var caldeira_ColliderBox = this.caldeira.node.getBoundingBox();

      if (this.Pocao_A.node.active) {
        var pocao_A_ColliderRect = this.Pocao_A.node.getBoundingBox();
        if (cc.rectIntersectsRect(pocao_A_ColliderRect, caldeira_ColliderBox)) {

          // Ativar depois
          this.Pocao_A.node.active = false;
          this.smokeNode.enabled = true;
          this.smokeAnimation.play();
          //this.animateCaldeirao();
          //var labelTest = this.Pocao_A.node.getChildByName("A");
          // labelTest.active  = false;

          //Se a resposta gerada era esta então foi jogada a poção correta
          if (this.respostaGeradaPocao == 0) {
            this.adicionarRespostaCorreta();
          } else {
            this.adicionarRespostaErrada();
          }

        }
      }

      if (this.Pocao_B.node.active) {
        var pocao_B_ColliderRect = this.Pocao_B.node.getBoundingBox();
        if (cc.rectIntersectsRect(pocao_B_ColliderRect, caldeira_ColliderBox)) {

          // Ativar depois
          this.Pocao_B.node.active = false;
          this.smokeNode.enabled = true;
          this.smokeAnimation.play();
          //this.animateCaldeirao();
          //var labelTest = this.Pocao_B.node.getChildByName("A");
          // labelTest.active  = false;


          //Se a resposta gerada era esta então foi jogada a poção correta
          if (this.respostaGeradaPocao == 1) {
            this.adicionarRespostaCorreta();
          } else {
            this.adicionarRespostaErrada();
          }


        }
      }

      if (this.Pocao_C.node.active) {
        var Pocao_C_ColliderRect = this.Pocao_C.node.getBoundingBox();
        if (cc.rectIntersectsRect(Pocao_C_ColliderRect, caldeira_ColliderBox)) {

          // Ativar depois 
         this.Pocao_C.node.active = false;
          this.smokeNode.enabled = true;
          this.smokeAnimation.play();
          //this.animateCaldeirao();
          //var labelTest = this.Pocao_C.node.getChildByName("A");
          // labelTest.active  = false;

          //Se a resposta gerada era esta então foi jogada a poção correta
          if (this.respostaGeradaPocao == 2) {
            this.adicionarRespostaCorreta();
          } else {
            this.adicionarRespostaErrada();
          }

        }
      }

      if (this.Pocao_D.node.active) {
        var pocao_D_ColliderRect = this.Pocao_D.node.getBoundingBox();
        if (cc.rectIntersectsRect(pocao_D_ColliderRect, caldeira_ColliderBox)) {

          // Ativar depois
          this.Pocao_D.node.active = false;
          this.smokeNode.enabled = true;
          this.smokeAnimation.play();
          //this.animateCaldeirao();
          //var labelTest = this.Pocao_D.node.getChildByName("A");
          // labelTest.active  = false;

          //Se a resposta gerada era esta então foi jogada a poção correta
          if (this.respostaGeradaPocao == 3) {
            this.adicionarRespostaCorreta();
          } else {
            this.adicionarRespostaErrada();
          }

        }
      }

      /*
      //Resetando as poções
      var pocao_A_ColliderRect = this.Pocao_A.node.getBoundingBox();
      var pocao_C_ColliderRect = this.Pocao_B.node.getBoundingBox();
      var pocao_B_ColliderRect = this.Pocao_C.node.getBoundingBox();
      var pocao_D_ColliderRect = this.Pocao_D.node.getBoundingBox();
      

      if(this.Pocao_A.node.x >  -150  &&  this.Pocao_A.node.y < 0)
      {

        cc.log("Deveria resetar aqui"); 

        this.resetStates();
      }
      */

    }


    if (this.gameIsOver) {

      cc.log("O jogo terminou");

      this.mostrarJanelaPontos();

    }

    //var PocaoADisabled = this.Pocao_A.getComponent("Potion").disabled;
    // var PocaoBDisabled = this.Pocao_B.getComponent("Potion").disabled;
    //var PocaoCDisabled = this.Pocao_C.getComponent("Potion").disabled;
    //var PocaoDDisabled = this.Pocao_D.getComponent("Potion").disabled;


    //Versão simpolificada sem o javascript externo
    var PocaoADisabled = this.Pocao_A.node.active;
    var PocaoBDisabled = this.Pocao_B.node.active;
    var PocaoCDisabled = this.Pocao_C.node.active;
    var PocaoDDisabled = this.Pocao_D.node.active;

    if (!PocaoADisabled && !PocaoBDisabled && !PocaoCDisabled && !PocaoDDisabled) {

      this.mostrarJanelaPontos();

    }

  },

  adicionarRespostaErrada : function() 
  {
    this.respostaErradas ++;
    //this.lblFalasMago.string = "Não deu certo, temos que tentar novamente!";
    
    this.lblFalasMago.string = this.getComponent("MageQuotes").getWrongQuestionQuote();
    this.questaoAtual ++ ;

    //this.resetGame();
    this.gerarQuestao();
  },
  adicionarRespostaErradaTempo : function()
    {
      
    this.respostaErradas ++;
    //this.lblFalasMago.string = "Não deu certo, temos que tentar novamente!";
    
    this.lblFalasMago.string = "Nosso tempo acabou, não nós perdemos aquela receita, vamos tentar outra vez.";
    this.questaoAtual ++;

    //this.resetGame();
        this.gerarQuestao();
    },
  
  adicionarRespostaCorreta : function() 
  {
    this.respostaCorretas ++ ;
    //this.lblFalasMago.string = "Você Acertou a poção está completa! Vamos tentar continuar a fazer mais!"
    this.lblFalasMago.string = this.getComponent("MageQuotes").getCorrectQuestionQuote();
    this.questaoAtual ++ ;
    //this.resetGame();
        this.gerarQuestao();
  },

  backToMenu: function () {
    cc.director.loadScene("Scene/Menu");
  },

  removerJanelaPontos: function()
  {
    this.gameIsOverFrame.setPosition(1300 , 390);
    this.gameIsOverFrame.active = false;
    this.gameIsOver = false;
  
  },
  
  mostrarJanelaPontos: function()
  {
    
  //  this.gameIsOverFrame.active = true;
//    this.gameIsOverFrame.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
    
    if(this.atualizandoPontos)
    {
      this.pontos  =  (this.segundos * this.respostaCorretas).toFixed(0);
      this.atualizandoPontos = false;
    }

      this.gameIsOverFrame.getComponent("GameIsOver").questoes = this.respostaCorretas;
      this.gameIsOverFrame.getComponent("GameIsOver").segundosConclusao  = this.segundos;

      this.gameIsOverFrame.getComponent("GameIsOver").pontos = this.pontos;

      this.gameIsOverFrame.setPosition(0,0);
      this.gameIsOverFrame.active = true;
      
      // this.gameIsOver = true;

  },
  resetStates: function () {
    this.gameRunning = false;
    this.gameIsOver = false;
    this.atualizandoPontos = true;
  },

  runningGame: function () {

  },

  mostrarAjuda : function()
  {
    
    // this.helpWinFrame.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
    this.helpWinFrame.setPosition(0,0);
    this.helpWinFrame.active = true;  
  },

  mostrarVit: function () {
  

  },

  winGame: function () {

  },

  lostGame: function () {

  },
  keyDown: function (event) {

    switch (event.keyCode) {
      case cc.KEY.escape:
        this.backToMenu();
        break;
        //Running
        case cc.KEY.t:
        this.resetStates();
        this.gameIsOver = true;
        this.adicionarRespostaErrada();
        break;
        case cc.KEY.r:
        this.resetStates();
        this.gameIsOver = true;
        this.adicionarRespostaCorreta();
        break;
        case cc.KEY.d:
        this.gameIsOver = true;
        break;

        case cc.KEY.s:
        this.gameIsOverFrame.getComponent("GameIsOver").questoes ++;
        break;
    }

  },

  keyUp: function (event) {

  },

  restartGame : function()
  {

  },
  resetGame: function () {
    // Original positions
    /*-120 ,  55
    -42 , 55
    38 , 55
    116 , 55 
    */
   
    this.resetStates();
    this.gameRunning = true; 
    this.Pocao_A.node.setPosition(-120, 55);
    this.Pocao_B.node.setPosition(-42, 55);
    this.Pocao_C.node.setPosition(38, 55);
    this.Pocao_D.node.setPosition(116, 55);
    
    this.Pocao_A.node.rotation = 0 ;
    this.Pocao_B.node.rotation = 0 ;
    this.Pocao_C.node.rotation = 0 ;
    this.Pocao_D.node.rotation = 0 ;
    
    this.Pocao_A.node.active = true;
    this.Pocao_B.node.active = true;
    this.Pocao_C.node.active = true;
    this.Pocao_D.node.active = true;


  },
  printRatio: function (value) {

    console.log(math.format(value, {
      fraction: 'ratio'
    }));

  }
});