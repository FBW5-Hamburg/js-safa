var life = 3

var score = 0
var scoreAdd = 10


var level = 1
const maxLevel = 3

window.onload = () => {
    //SELECT CANVAS elements
    const paddleCanvas = document.querySelector('#paddleCanvas')
    const context1 = paddleCanvas.getContext('2d')

    const ballCanvas = document.querySelector('#ballCanvas')
    const context2 = ballCanvas.getContext('2d')

    const briksCanvas = document.querySelector('#briksCanvas')
    const context3 = briksCanvas.getContext('2d')

    /////////////////////////
    //CREATE THE PADDLE
    //////////////////////////
    //First write the constant values like the width and height of the paddle
    const paddleWidth = 100
    const paddleHeight = 30
    const marginBottom = 10



    let GAME_OVER = false


    //First write the constant values like the width and height of the ball
    let ballRadius = 8

    //Second set the properties of the paddle
    let paddle = {
        x: paddleCanvas.width / 2 - paddleWidth / 2,
        y: paddleCanvas.height - paddleHeight - marginBottom,
        width: paddleWidth,
        height: paddleHeight,
        step: 10
    }

    let ball = {
        x: ballCanvas.width / 2,
        y: paddle.y - ballRadius,
        radius: ballRadius,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3,
        speed: 3

    }


    //set the properties of the Bricks
    let brick = {
        row: 1,
        column: 6,
        width: 55,
        height: 20,
        offSetLeft: 20,
        offSetTop: 20,
        marginTop: 30
    }


    drawPaddle(context1, paddle)
    movePaddle(context1, paddle, paddleCanvas)


    //drawBall(context,ball)
    //setInterval(moveBall, ball.speed);
    let loop = setInterval(() => {
        context2.clearRect(0, 0, ballCanvas.width, ballCanvas.height);
        //backgroundImage(context)

        //drawPaddle(context1, paddle)
        drawBall(context2, ball)


        ballWallCollision(ball, ballCanvas, paddle,loop)
        ballPaddleCollision(ball, paddle)

        ballBricksCollision(context3, brick, bricks, ball, score, scoreAdd)

        ball.x += ball.dx
        ball.y += ball.dy


        //show score
        showGameStatus(context2, score, 35, 25, './imgs/score.png', 5, 5, 25, 25)
        //show lives
        showGameStatus(context2, life, paddleCanvas.width - 25, 25, './imgs/life.png', paddleCanvas.width - 55, 5, 25, 25)
        //gameOver(GAME_OVER)

        //     if (GAME_OVER ) {
        //         clearInterval(loop)
        // }
        //show level
        showGameStatus(context2, level, paddleCanvas.width / 2, 25, './imgs/level.png', paddleCanvas.width / 2, 5, 25, 25)


        levelUp(context3, brick, bricks, GAME_OVER, ball, paddle, ballCanvas)
        //gameOver(GAME_OVER)
        

    }, 10);

    let bricks = []
    createBricks(context3, brick, bricks)
    // if (gameOver(GAME_OVER)) {
    //     clearInterval(loop)
    // }

}



//DRAW PADDLE
function drawPaddle(context1, paddle) {
    //create html image
    let img = document.createElement('img')
    //set src to the image
    img.src = './imgs/grass.png'

    //create onload events for img to add it inside convas after loading
    img.addEventListener('load', function () {
        context1.drawImage(img, paddle.x, paddle.y, paddle.width, paddle.height)
    })
}

//MOVE THE PADDLE
function movePaddle(context1, paddle, paddleCanvas) {

    document.onkeydown = (e) => {
        context1.clearRect(paddle.x, paddle.y, paddleCanvas.width, paddleCanvas.height)

        if (e.key == 'ArrowRight' && paddle.x + paddle.width < paddleCanvas.width) {

            paddle.x += paddle.step


        } else if (e.key == 'ArrowLeft' && paddle.x > 0) {

            paddle.x -= paddle.step
        }

        drawPaddle(context1, paddle)

    }
}

//DRAW BALL
function drawBall(context2, ball) {
    context2.beginPath();
    context2.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context2.fillStyle = "#ffcdo5"
    context2.fill()
    context2.closePath();

}

//BALL AND WALL DETECTION
function ballWallCollision(ball, ballCanvas, paddle,loop) {

    if (ball.x + ball.dx + ball.radius > ballCanvas.width || ball.x + ball.dx - ball.radius < 0) {
        ball.dx = -ball.dx
        //console.log(ball.dx);

    }
    if (ball.y + ball.dy - ball.radius < 0) {
        ball.dy = -ball.dy
    }
    if (ball.y + ball.radius > ballCanvas.height) {
        life--
        console.log(life);

        resetBall(ball, paddle, ballCanvas)
        if (life <= 0) {
             
            //document.location.reload();
            clearInterval(loop);
        }
    }
}


function resetBall(ball, paddle, ballCanvas) {
    ball.x = ballCanvas.width / 2
    ball.y = paddle.y - ball.radius
    ball.dx = 3 * (Math.random() * 2 - 1)
    ball.dy = -3
}


function ballPaddleCollision(ball, paddle) {
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) { //the ball is inside the paddle
        //CHECK WHERE THE BALL HIT THE PADDLE
        let collidepoint = ball.x - (paddle.x + paddle.width / 2)

        //NORMALIZE THE VALUES
        collidepoint = collidepoint / (paddle.width / 2)

        //CALCULATE THE ANGLE OF THE BALL
        let angle = collidepoint * Math.PI / 3

        ball.dx = ball.speed * Math.sin(angle)
        ball.dy = -ball.speed * Math.cos(angle)

    }
}

//MOVE THE BALL
// function moveBall(ball,context) {

//         context.clearRect(0, 0, 800,500);

//         ball.x += ball.dx
//         ball.y += ball.dy
//         drawBall(context,ball) 

// }

function createBricks(context3, brick, bricks) {

    for (let r = 0; r < brick.row; r++) { //to create the rows
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) { //to create the columns
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true //that mean that the brick is not destroyed
            }

            if (bricks[r][c].status) {
                //create html image
                let img1 = document.createElement('img')
                img1.src = './imgs/fish.png'

                //create onload events for img to add it inside convas after loading
                img1.addEventListener('load', function () {
                    context3.drawImage(img1, bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)
                })
            } else {

            }

        }


    }
}

function ballBricksCollision(context3, brick, bricks, ball) {

    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) { //to create the columns
            let b = bricks[r][c]
            //console.log(b);

            if (b.status) {
                if ((ball.x + ball.radius > b.x) && (ball.x - ball.radius < b.x + brick.width) && (ball.y + ball.radius > b.y) && (ball.y - ball.radius < b.y + brick.height)) {
                    context3.clearRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)
                    b.status = false
                    // //console.log(b.status);
                    ball.dy = -ball.dy

                    score += scoreAdd
                    // console.log('crash');


                }

            }

        }
    }
}

//show the score and life
function showGameStatus(context1, text, textX, textY, image_source, imgX, imgY, imgWidth, imgHeight) {
    //draw text
    //context1.fillStyle = '#FFF'
    context1.font = '25px Germania One'
    context1.fillText(text, textX, textY)
    console.log(text);

    //draw image
    // let img2 = document.createElement('img')
    // img2.src = image_source

    // //create onload events for img to add it inside convas after loading
    // img2.addEventListener('load', function () {
    //     context1.drawImage(img2, imgX,imgY, imgWidth, imgHeight)
    // })
}

//game over
// function gameOver(GAME_OVER) {
//     if (life <= 0) {
//         GAME_OVER = true
//         //alert('you lost')
//     }
// }

function levelUp(context3, brick, bricks, GAME_OVER, ball, paddle, ballCanvas) {
    let isLevelDone = true

    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) { //to create the columns
            isLevelDone = isLevelDone && !bricks[r][c].status

        }
    }
    if (isLevelDone) {
        if (level >= maxLevel) {
            GAME_OVER = true
            return
        }
        brick.row++
        createBricks(context3, brick, bricks)
        ball.speed += 0.5
        resetBall(ball, paddle, ballCanvas)
        level++

    }
}