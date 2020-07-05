const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const brickRowCount = 9
const brickColumnCount = 5

let score = 0

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 5,
  speed: 4,
  dx: 4,
  dy: -4
}

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

// Create bricks
const bricks = []
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = []
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius * 2, 0, Math.PI * 2)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
}

// Draw score on screen
function drawScore() {
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? '#009fdd' : 'transparent'
      ctx.fill()
    })
  })
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx

  if (paddle.x + paddle.w >= canvas.width) {
    paddle.x = canvas.width - paddle.w
  }

  if (paddle.x < 0) {
    paddle.x = 0
  }
}

// Move the ball on canvas
function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  // Wall collision (left / right)
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    ball.dx *= -1
  }

  // Wall collision (top / bottom)
  if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
    ball.dy *= -1
  }

  // Paddle collision
  if (
    ball.x + ball.radius > paddle.x &&
    ball.x - ball.radius < paddle.x + paddle.w &&
    ball.y + ball.radius > paddle.y
  ) {
    ball.dy *= -1
  }

  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.radius > brick.x &&           // left side
          ball.x + ball.radius < brick.x + brick.w && // right side
          ball.y + ball.radius > brick.y &&           // top side
          ball.y - ball.radius < brick.y + brick.h    // bottom side
        ) {
          brick.visible = false
          increaseScore()

          if (
            ball.x - ball.radius > brick.x &&         // left side
            ball.x + ball.radius < brick.x + brick.w  // right side
          ) {
            ball.dx *= -1
          } else {
            ball.dy *= -1
          }
        }
      }
    })
  })

  // Hit bottom wall - lose
  if (ball.y > paddle.y) {
    console.log((ball.y), paddle.y)
    showAllBricks()
    score = 0
  }
}

function increaseScore() {
  score++

  if (score >= brickRowCount * brickColumnCount) {
    showAllBricks()
  }
}

function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      brick.visible = true
    })
  })
}

// Draw everything
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

// Update canvas drawing & animation
function update() {
  movePaddle()
  moveBall()

  // Draw everything
  draw()
  requestAnimationFrame(update)
}

// Keydown event
function keyDown(e) {
  if (e.keyCode === 37) {       // Arrow left
    paddle.dx = -paddle.speed
  } else if (e.keyCode === 39) { // Arrow right
    paddle.dx = paddle.speed

  }
}

// Keyup event
function keyUp(e) {
  if (e.keyCode == 37 || e.keyCode == 39) {
    paddle.dx = 0
  }
}

console.log('hello')



update()

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'))
closeBtn.addEventListener('click', () => rules.classList.remove('show'))