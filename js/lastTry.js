window.onload = function () {

    //SELECT CANVAS elements
    const paddleCanvas = document.querySelector('#paddleCanvas')
    const context1 = paddleCanvas.getContext('2d')

    const ballCanvas = document.querySelector('#ballCanvas')
    const context2 = ballCanvas.getContext('2d')

    let bricksCanvas = document.querySelector('#briksCanvas')
    let context3 = bricksCanvas.getContext('2d')


    /////////////////////////
    //CREATE THE PADDLE
    //////////////////////////
    //First write the constant values like the width and height of the paddle
    const paddleWidth = 100
    const paddleHeight = 30
    const marginBottom = 10
    //First write the constant values like the width and height of the ball
    let ballRadius = 8
    //BRICKS VARIABLES
    let bricks = []
    //bricks[0]='empty'

    //Second set the properties of the paddle
    let paddle = {
        x: paddleCanvas.width / 2 - paddleWidth / 2,
        y: paddleCanvas.height - paddleHeight - marginBottom,
        width: paddleWidth,
        height: paddleHeight,
        step: 20
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
        row: 5,
        column: 12,
        width: 50,
        height: 50,
        offSetLeft: 20,
        offSetTop: 20,
        marginTop: 10
    }

    createBoxesBricks(context3, brick, bricks)
    createDelphinBricks(context3, brick, bricks)
    createSharkBricks(context3, brick, bricks)
    //createFishBricks(context3, brick, bricks)
    // createOctopusBricks(context3, brick, bricks)


    drawPaddle(context1, paddle)
    movePaddle(context1, paddle, paddleCanvas)

    let loop = setInterval(() => {
        context2.clearRect(0, 0, ballCanvas.width, ballCanvas.height);
        //backgroundImage(context)

        //drawPaddle(context1, paddle)
        drawBall(context2, ball)


        ballWallCollision(ball, ballCanvas, paddle, loop)
        ballPaddleCollision(ball, paddle)
        ballBricksCollision(context3, brick, bricks, ball)

        // ballBricksCollision(context3, brick, bricks, ball, score, scoreAdd)

        ball.x += ball.dx
        ball.y += ball.dy



        //ballBricksCollision(context, boxBrick, boxBricks, ball)
        //ballBricksCollision(context, delpinBrick, delpinBricks, ball)
        //ballBricksCollision1(context, sharkBrick, sharkBricks, ball)
        //ballBricksCollision(context, fishBrick, fishBricks, ball)


    }, 20);
    console.log(bricks);

}

// //DRAW BOXES
function createBoxesBricks(ctx, brick, bricks) {


    for (let r = 4; r < brick.row; r++) { //to create the rows
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) { //to create the columns
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true //that mean that the brick is not destroyed
            }

            if (bricks[r][c].status) {
                let imgBox = document.createElement('img')
                imgBox.src = './imgs/box.png'

                imgBox.addEventListener('load', function () { //load because we create the image so it will take time to be onload


                    ctx.drawImage(imgBox, bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)

                })
            }

        }


    }
}



//CREATE A LIGNE OF MOVING DELPHINS
function createDelphinBricks(ctx, brick, bricks) {

    for (let r = 3; r < brick.row - 1; r++) { //to create the rows
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) { //to create the columns
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true //that mean that the brick is not destroyed
            }

            if (bricks[r][c].status) {

                //create Image
                let img = document.createElement('img')
                img.src = './imgs/delphin.png'

                img.addEventListener('load', function () { //load because we create the image so it will take time to be onload

                    let imgCounter = 9
                    let brickInterval = setInterval(() => {

                        //clear drawing area (x,  y, width, height)
                        ctx.clearRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)
                        ctx.drawImage(img, imgCounter, 547.8, 84, 68, bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)
                        imgCounter += 84

                        if (imgCounter == 345) {
                            imgCounter = 343.2
                        }
                        if (imgCounter == 427.2) {
                            imgCounter = 9
                        }

                    }, 300);
                    bricks[r][c].interval = brickInterval


                })
            }

        }


    }
}




//CREATE OF MOVING SHARK
function createSharkBricks(ctx, brick, bricks) {

    for (let r = 1; r < brick.row - 2; r++) { //to create the rows
        bricks[r] = [];
        for (let c = 0; c < r; c++) { //to create the columns
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true //that mean that the brick is not destroyed
            }

            if (bricks[r][c].status) {


                let imgShark = document.createElement('img')
                imgShark.src = './imgs/shark.png'

                imgShark.addEventListener('load', function () { //load because we create the image so it will take time to be onload

                    let imgCounter = 0
                    let brickInterval1 = setInterval(() => {

                        //clear drawing area (x,  y, width, height)
                        ctx.clearRect(bricks[r][c].x, bricks[r][c].y, 50, 50)
                        //ctx.drawImage(img, imgCounter, 557, 84, 68, xImg, yImage, 84, 68)
                        ctx.drawImage(imgShark, imgCounter, 562, 156, 130, bricks[r][c].x, bricks[r][c].y, 50, 50)
                        imgCounter += 156

                        if (imgCounter == 1226) {
                            imgCounter = 0
                        }
                        if (imgCounter == 624) {
                            imgCounter = 620
                        }
                        if (imgCounter == 776) {
                            imgCounter = 758
                        }



                    }, 300);

                    bricks[r][c].interval = brickInterval1
                })
            }

        }
        for (let c = brick.column - 1; c >= 10; c--) { //to create the columns
            if (r + c > 11) {
                bricks[r][c] = {
                    x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                    y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                    status: true //that mean that the brick is not destroyed
                }

                if (bricks[r][c].status) {


                    let imgShark = document.createElement('img')
                    imgShark.src = './imgs/shark.png'

                    imgShark.addEventListener('load', function () { //load because we create the image so it will take time to be onload

                        let imgCounter = 0
                        let brickInterval2 = setInterval(() => {

                            //clear drawing area (x,  y, width, height)
                            ctx.clearRect(bricks[r][c].x, bricks[r][c].y, 50, 50)
                            //ctx.drawImage(img, imgCounter, 557, 84, 68, xImg, yImage, 84, 68)
                            ctx.drawImage(imgShark, imgCounter, 562, 156, 130, bricks[r][c].x, bricks[r][c].y, 50, 50)
                            imgCounter += 156

                            if (imgCounter == 1226) {
                                imgCounter = 0
                            }
                            if (imgCounter == 624) {
                                imgCounter = 620
                            }
                            if (imgCounter == 776) {
                                imgCounter = 758
                            }



                        }, 300);

                        bricks[r][c].interval = brickInterval2
                    })
                }
            }


        }

        for (let c = 2; c < brick.column - 7; c++) { //to create the columns
            if ((c + r == 3 || c + r == 5) || (c + r == 7 || c + r == 9)) {
                bricks[r][c] = {
                    x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                    y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                    status: true //that mean that the brick is not destroyed
                }

                if (bricks[r][c].status) {
                    let imgFish = document.createElement('img')
                    imgFish.src = './imgs/7outa.png'

                    imgFish.addEventListener('load', function () { //load because we create the image so it will take time to be onload



                        ctx.drawImage(imgFish, bricks[r][c].x, bricks[r][c].y, 50, 50)



                    })


                }
            }


        }

        for (let c = 7; c < brick.column - 2; c++) { //to create the columns
            if ((c + r == 8 || c + r == 10)) {
                bricks[r][c] = {
                    x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                    y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                    status: true //that mean that the brick is not destroyed
                }

                if (bricks[r][c].status) {
                    let imgFish = document.createElement('img')
                    imgFish.src = './imgs/7outa.png'

                    imgFish.addEventListener('load', function () { //load because we create the image so it will take time to be onload

                        ctx.drawImage(imgFish, bricks[r][c].x, bricks[r][c].y, 50, 50)

                    })


                }
            }


        }

    }
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
function ballWallCollision(ball, ballCanvas, paddle, loop) {

    if (ball.x + ball.dx + ball.radius > ballCanvas.width || ball.x + ball.dx - ball.radius < 0) {
        ball.dx = -ball.dx
        //console.log(ball.dx);

    }
    if (ball.y + ball.dy - ball.radius < 0) {
        ball.dy = -ball.dy
    }
    if (ball.y + ball.radius > ballCanvas.height) {
        // life--
        // console.log(life);

        resetBall(ball, paddle, ballCanvas)
        // if (life <= 0) {

        //     //document.location.reload();
        //     clearInterval(loop);
        // }
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

function ballBricksCollision(context3, brick, bricks, ball) {

    bricks.forEach((brick) => {
        //console.log(brick);

        if (brick != "empty") {
            brick.forEach((item) => {
                //console.log(item);
                console.log(item);

                if (item != "empty") {
                    if (item.status) {
                        if ((ball.x + ball.radius > item.x) && (ball.x - ball.radius < item.x + 50) && (ball.y + ball.radius > item.y) && (ball.y - ball.radius < item.y + 50)) {
                            // console.log(bricks)
                            // console.log("HHHH ="+ind*50)
                            // bricks.splice(ind,1)
                            clearInterval(item.interval)
                            context3.clearRect(item.x, item.y, 50, 50)
                            item.status = false
                            ball.dy = -ball.dy
                        }
                    }
                }
            })
        }
    });

   
}

