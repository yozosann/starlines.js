var starLines = function (canvasStarlines) {
    canvasStarlines.height = canvasStarlines.parentElement.clientHeight;   
    canvasStarlines.width = canvasStarlines.parentElement.clientWidth;
    canvasStarlines.setAttribute("style", 'position:absolute;left:0;top:0;display:block;');

    var ctx = canvasStarlines.getContext("2d");
    var zhongX = canvasStarlines.width / 2;
    var zhongY = canvasStarlines.height / 2;
    var balls = [];
    var _self = this;
    
    _self.amountCoefficient = 0.0002;
    _self.color = "white";
    _self.rRange1 = 0.1;
    _self.rRange2 = 3;
    _self.speedRange1 = 1;
    _self.speedRange2 = 3;


    // Tool function
    function ballAndMouse(obj) {
        var disX = Math.abs(zhongX - obj.x);
        var disY = Math.abs(zhongY - obj.y);
        return Math.sqrt(disX * disX + disY * disY);
    }
    function ballAndBall(obj1, obj2) {
        var disX = Math.abs(obj1.x - obj2.x);
        var disY = Math.abs(obj1.y - obj2.y);
        return Math.sqrt(disX * disX + disY * disY);
    }
    function randomNum(x, y) {
        return Math.floor(Math.random() * (y - x + 1) + x);
    }

    function randomColor() {
        return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
    }


    //Ball class
    function Ball() {
        this.r = randomNum(_self.rRange1, _self.rRange2);
        this.color = _self.color;

        this.x = randomNum(this.r, canvasStarlines.width - this.r);
        this.y = randomNum(this.r, canvasStarlines.height - this.r);

        this.speedX = randomNum(_self.speedRange1, _self.speedRange2) * (randomNum(0, 1) ? 1 : -1);
        this.speedY = randomNum(_self.speedRange1, _self.speedRange2) * (randomNum(0, 1) ? 1 : -1);
    }

    // move
    Ball.prototype.move = function () {
        this.x += this.speedX * 0.2;
        this.y += this.speedY * 0.2;

        if (this.x <= this.r) {
            this.x = this.r;
            this.speedX *= -1;
        }
        if (this.x >= canvasStarlines.width - this.r) {
            this.x = canvasStarlines.width - this.r
            this.speedX *= -1;
        }
        //Small ball hit the border , rebound
        if (this.y <= this.r) {
            this.y = this.r;
            //rebound
            this.speedY *= -1;
        }
        //Small ball hit the lower boundary , rebound
        if (this.y >= canvasStarlines.height - this.r) {
            this.y = canvasStarlines.height - this.r;
            //rebound
            this.speedY *= -1;
        }
    }  
    Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    //Event handling function
    canvasStarlines.onmousemove = function (event) {
        event = event || window.event;
        zhongX = event.offsetX;
        zhongY = event.offsetY;
    }

    window.onresize = function()
    {
        balls = [];
        console.log(canvasStarlines.parentElement.clientWidth + '....' + canvasStarlines.parentElement.clientHeight);
        ctx.clearRect(0, 0, canvasStarlines.width, canvasStarlines.height);
        canvasStarlines.height = canvasStarlines.parentElement.clientHeight;
        canvasStarlines.width = canvasStarlines.parentElement.clientWidth;

        for (var i = 0; i < 0.0002 * canvasStarlines.width * canvasStarlines.height; i++) {
            var ball = new Ball();
            balls.push(ball);
        }

        var zhongX = canvasStarlines.width / 2;
        var zhongY = canvasStarlines.height / 2;
    }


    //  External interface

    this.setAmountCoefficient = function (num) {
        if (num <= 0.00038)
        {
            this.amountCoefficient = num;
        }
    }

    this.setColor = function (color) {
        _self.color = color || "white";
    }

    this.setR = function (rRange1, rRange2) {
        _self.rRange1 = rRange1 || 1;
        _self.rRange2 = rRange2 || 3;
    }

    this.setSpeed = function (speedRange1, speedRange2) {
        _self.speedRange1 = speedRange1 || 1;
        _self.speedRange2 = speedRange2 || 3;
    }

    this.clear = function () {
        clearInterval(this.animationID);
        balls = [];
    }

    this.draw = function () {
        for (var i = 0; i < this.amountCoefficient * canvasStarlines.width * canvasStarlines.height; i++) {
            var ball = new Ball();
            balls.push(ball);
        }

        this.animationID = setInterval(function () {
            ctx.clearRect(0, 0, canvasStarlines.width, canvasStarlines.height);
            for (var i = 0; i < balls.length; i++) {
                balls[i].move();
                balls[i].draw();
                //Connection algorithm of mouse and ball
                if (ballAndMouse(balls[i]) < 130) {
                    ctx.lineWidth = (130 - ballAndMouse(balls[i])) * 1.5 / 130;
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(zhongX, zhongY);
                    ctx.strokeStyle = balls[i].color;
                    ctx.stroke();
                }
            }
            for (var i = 0; i < balls.length; i++) {
                for (var j = 0; j < balls.length; j++) {
                    //Connection algorithm of ball and ball
                    if (ballAndBall(balls[i], balls[j]) < 80) {
                        //Gradient
                        ctx.lineWidth = (80 - ballAndBall(balls[i], balls[j])) * 0.6 / 80;
                        ctx.globalAlpha = (130 - ballAndBall(balls[i], balls[j])) * 1 / 80;
                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.strokeStyle = balls[i].color;
                        ctx.stroke();
                    }
                }
            }
        }, 17);
    }
}