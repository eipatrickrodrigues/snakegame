window.onload = function(){

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush());
    
    setInterval(game, 60) /* O jogo funciona formando diferentes telas ao longo do tempo, definido aqui 60 quadros por segundo. */

    const vel = 1;
    var vx = vy = 0; /* Velocidade inicial */
    var px = py = 10; /* Posição inicial da cabeça da cobra */
    var dim = 20;  /* Dimensão de cada quadrado componente do canva */
    var qtdade = 20; /* Quantidade de quadrados por cada linha/coluna */
    var apple_x = apple_y = 15 /* Localização inicial da maçã */

    var trail = []; /* O rastro deixado pela cobra começa zerado */
    tail = 5; /* Tamanho da calda */

    function game(){

        /* Cada nova vez que a funcção game for chamada, irá atualizar a posição da cabeça da cobra, nomeada como variável px */
        px += vx; /* A posição segue na direção da velocidade */
        py += vy;

        /* Quando a cobra encostar na parede, deve reaperecer do outro lado */
        if (px<0){
            px = qtdade - 1;
        }
        if (px>dim){
            px = 0
        }
        if (py<0){
            py = qtdade - 1;
        }
        if (py>dim){
            py = 0
        }

        /* Configuração do Canvas */
        context.fillStyle = "black";
        context.fillRect(0,0,canvas.width,canvas.height);

        /* Configuração da maçã */
        context.fillStyle = "red";
        context.fillRect(apple_x*dim, apple_y*dim, dim,dim);


        /* Configuração do rastro da cobra */
        context.fillStyle = "gray";

        for(var i = 0; i<trail.length; i++){
            context.fillRect(trail[i].x*dim, trail[i].y*dim, dim,dim);

            /* Verificação se a cobra bate em si mesma. */
            if (trail[i].x == px && trail[i].y == py){
                vx = vy = 0;
            } 

            /* Movimento da cobra é dado por um objeto */
            trail.push({x:px,y:py});
            while (trail.length > tail){
                trail.shift(); /* Se o trilho for maior que a calda, é retirado o último quadrado do rastro. */
            }

            if (apple_x==px && apple_y==py){
                tail ++

                /* Após comer a maçã, esta precisa ser reposicionada randomicamente. */
                apple_x = Math.floor(Math.random()*dim); /* floor é para arredondamento para baixo */
                apple_y = Math.floor(Math.random()*dim);
            }
        }

        /* A movimentação do jogo */
        function keyPush(event){

            switch (event.keyCode) {
                /* Tecla 37 é a direcional para esquerda */
                case 37: 
                    vx = -vel;
                    vy = 0;
                    break;
                /* Tecla 38 é a direcional para cima */
                case 38: 
                    vx = 0;
                    vy = -vel;
                    break;
                /* Tecla 39 é a direcional para direita */
                case 39: 
                    vx = vel;
                    vy = 0;
                    break;
                /* Tecla 40 é a direcional para baixo */
                case 40: 
                    vx = 0;
                    vy = vel;
                    break;
                default:
                    break;
            }
        }



    }
    
    
    
    

    
}