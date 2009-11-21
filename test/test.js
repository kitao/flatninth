function draw()
{

    /* canvas�v�f�̃m�[�h�I�u�W�F�N�g */
    var canvas = document.getElementById('canvassample');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 200, 200);

    /* 2D�R���e�L�X�g */
    /* �l�p��`�� */
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
