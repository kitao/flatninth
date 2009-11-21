function draw()
{

    /* canvas要素のノードオブジェクト */
    var canvas = document.getElementById('canvassample');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 200, 200);

    /* 2Dコンテキスト */
    /* 四角を描く */
    ctx.beginPath();
    ctx.moveTo(x, x);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 120);
    ctx.lineTo(20, 120);
    ctx.closePath();
    ctx.stroke();

    x += 10;

    clearTimeout(timer);
    timer = setTimeout(draw, 1000);
};

var x = 0;
var interval = 500;
var timer;

draw();
