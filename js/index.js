window.onload =  () => {
    //SELECT CANVAS elements
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')

    /////////////////////////
    //CREATE THE PADDLE
    //////////////////////////
    //First write the constant values like the width and height of the paddle
    const paddleWidth = 100
    const paddleHeight = 30
    const marginBottom = 30


    //First write the constant values like the width and height of the ball
    let ballRadius = 8

    //Second set the properties of the paddle
    let paddle = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: canvas.height - paddleHeight - marginBottom,
        width: paddleWidth,
        height: paddleHeight,
        step: 5
    }

    let ball = {
        x: canvas.width / 2,
        y: paddle.y - ballRadius,
        radius : ballRadius,
        dx : 3 * (Math.random() * 2 -1),
        dy : -3,
        speed : 3

    }

    drawPaddle(context, paddle)
    movePaddle(context,paddle)


    //drawBall(context,ball)
    //setInterval(moveBall, ball.speed);
    setInterval(() => {
        context.clearRect(0, 0, 800,500);
        
        drawPaddle(context, paddle)
        drawBall(context,ball) 
        // if (ball.x+ball.dx+ball.radius > canvas.width || ball.x+ball.dx-ball.radius <0) {
        //     ball.dx = -ball.dx
        //     console.log(ball.dx);
        //     //alert('stop')
            
        // }
        console.log(ball.x);
        
        ballWallCollision(ball,canvas,paddle)
        ballPaddleCollision(ball,paddle) 

        ball.x += ball.dx
        ball.y += ball.dy
    }, 10);
 
    //ballWallCollision(ball,canvas)
    //ballWallCollision(ball,canvas)
}



//DRAW PADDLE
function drawPaddle(context, paddle) {
    //create html image
    let img = document.createElement('img')
    //set src to the image
    img.src = './imgs/grass.png'

    //create onload events for img to add it inside convas after loading
    img.addEventListener('load', function () {
        context.drawImage(img,paddle.x, paddle.y, paddle.width, paddle.height)
    })
}

//MOVE THE PADDLE
function movePaddle(context,paddle) {
    
    document.onkeydown = (e) => {
        context.clearRect(paddle.x,paddle.y,paddle.width,paddle.height)

        if (e.key == 'ArrowRight' && paddle.x + paddle.width < canvas.width) {
            
            paddle.x += paddle.step
        
            
        } else if (e.key == 'ArrowLeft'  && paddle.x > 0) {
       
            paddle.x -= paddle.step
        }

        drawPaddle(context, paddle)
        
    }
}

//DRAW BALL
function drawBall(context,ball) {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius,0, Math.PI*2);
    context.fillStyle = "#ffcdo5"
    context.fill()
    context.closePath();

}

//BALL AND WALL DETECTION
function ballWallCollision(ball,canvas,paddle) {
    
    if (ball.x+ball.dx+ball.radius > canvas.width || ball.x+ball.dx-ball.radius <0) {
        ball.dx = -ball.dx
        console.log(ball.dx);
        
    }
    if (ball.y+ball.dy-ball.radius < 0) {
        ball.dy= -ball.dy
    }
    if (ball.y+ball.radius > canvas.height) {
        resetBall(ball,paddle,ball)
    }
}


function resetBall(ball,paddle,ball) {
    ball.x = canvas.width / 2
    ball.y = paddle.y- ball.radius
    ball.dx = 3* (Math.random() * 2 -1)
    ball.dy = -3
}


function ballPaddleCollision(ball,paddle) {
    if (ball.x <paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y +paddle.height && ball.y > paddle.y) {  //the ball is inside the paddle
        //CHECK WHERE THE BALL HIT THE PADDLE
        let collidepoint = ball.x - (paddle.x + paddle.width/2)

        //NORMALIZE THE VALUES
        collidepoint = collidepoint / (paddle.width/2)

        //CALCULATE THE ANGLE OF THE BALL
        let angle = collidepoint *Math.PI/3

        ball.dx = ball.speed * Math.sin(angle)
        ball.dy = - ball.speed * Math.cos(angle)
        
    }
}
//MOVE THE BALL
// function moveBall(ball,context) {
    
//         context.clearRect(0, 0, 800,500);
        
//         ball.x += ball.dx
//         ball.y += ball.dy
//         drawBall(context,ball) 
     
// }