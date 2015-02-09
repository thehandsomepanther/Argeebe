function getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    var RGB = new Array(r, g, b);
    return RGB;
}

function getRandomNumbers() {
    var num = Math.random() * 100;
    return num.toFixed(4).toString().replace('.', '-');
}

function calcRGBscore(r1, r2, g1, g2, b1, b2) {
    var score = 255 - (Math.abs(r1 - r2) +
        Math.abs(g1 - g2) +
        Math.abs(b1 - b2)) / 3;

    return score;
}

function evalScore(score) {
    var eval = "";

    if (score < 100) {
        eval = "Come on, seriously?";
    } else if (score < 150) {
        eval = "Not bad. B- for effort";
    } else if (score < 200) {
        eval = "That's actually pretty good";
    } else {
        eval = "Inspect Element is no fun";
    }

    return eval;
}

$(document).ready(function () {

    function resetColors() {
        r_slider.setValue(255);
        g_slider.setValue(255);
        b_slider.setValue(255);

        $('#color-copy-r').html('<b>R 255<b>');
        $('#color-copy-g').html('<b>G 255<b>');
        $('#color-copy-b').html('<b>B 255<b>');

        $('#color-r').css('background-color', 'rgb(255, 0, 0);');
        $('#color-g').css('background-color', 'rgb(0, 255, 0);');
        $('#color-b').css('background-color', 'rgb(0, 0, 255);');

        $('#random-swatch').css('background-color', 'rgb(' + getRandomColor().toString() + ');');
        newRGB = getRandomColor();
        $('.random-copy').html('<b>ARGEEBE</b><br>' + getRandomNumbers() + '<br>Click to Guess');
    }

    var newRGB = getRandomColor();
    var count = 0;

    $('#random-swatch').css('background-color', 'rgb(' + newRGB.toString() + ');');

    $('#guess-swatch').hide();
    $('input[rel=tooltip]').tooltip('disable');

    var changeR = function () {
        $('#color-r').css('background-color', 'rgb(' + r_slider.getValue() + ', 0, 0);');
        $('#color-copy-r').html('<b>R ' + r_slider.getValue() + '<b>');
    }

    var changeG = function () {
        $('#color-g').css('background-color', 'rgb(0, ' + g_slider.getValue() + ', 0);');
        $('#color-copy-g').html('<b>G ' + g_slider.getValue() + '<b>');
    }

    var changeB = function () {
        $('#color-b').css('background-color', 'rgb(0, 0, ' + b_slider.getValue() + ');');
        $('#color-copy-b').html('<b>B ' + b_slider.getValue() + '<b>');
    }

    var r_slider = $('#slider-r').slider()
        .on('slide', changeR)
        .data('slider');

    var g_slider = $('#slider-g').slider()
        .on('slide', changeG)
        .data('slider');

    var b_slider = $('#slider-b').slider()
        .on('slide', changeB)
        .data('slider');



    $('.nametag-random').click(function () {

        var score = calcRGBscore(r_slider.getValue(), newRGB[0], g_slider.getValue(), newRGB[1], b_slider.getValue(), newRGB[2]);

        if ($('.swatch-color').css('left') == '50px') {
            if (count % 2 == 0) {
                $('#guess-swatch').css('background-color', 'rgb(' + r_slider.getValue() + ', ' + g_slider.getValue() + ', ' + b_slider.getValue() + ');');
                $('#guess-swatch').show();
                $('#guess-swatch').fadeIn();
                $('#guess-swatch').animate({
                    top: '257px'
                }, {
                    duration: 500
                });

                $('.guess-copy').html('<b>YOUR GUESS</b><br>R' + r_slider.getValue() + ' G' + g_slider.getValue() + ' B' + b_slider.getValue() + '<br>' + evalScore(score));
                $('.random-copy').html('<b>ARGEEBE</b><br>R' + newRGB[0] + ' G' + newRGB[1] + ' B' + newRGB[2] + '<br>Click to Play Again');

                count++;
            } else {
                resetColors();
                $('#guess-swatch').hide();
                count++;
            }
        } else {
            if (count % 2 == 0) {

                $('#instructions').html(' ');
                $('.col-xs-1').fadeOut(500);
                $('#guess-swatch').css('background-color', 'rgb(' + r_slider.getValue() + ', ' + g_slider.getValue() + ', ' + b_slider.getValue() + ');');
                $('#guess-swatch').show();
                $('#guess-swatch').fadeIn();

                if (r_slider.getValue() + g_slider.getValue() + b_slider.getValue() == 0) {
                    $('#guess-swatch').css('border-color', 'black');
                    $('#guess-swatch').css('border-style', 'solid');
                    $('#guess-swatch').css('border-width', '1px');
                } else {
                    $('#guess-swatch').css('border-style', 'none');
                }
                $('#random-swatch').animate({
                    right: '20vw'
                }, {
                    duration: 500,
                    queue: false
                });
                $('#guess-swatch').animate({
                    left: '20vw'
                }, {
                    duration: 500,
                    queue: false
                });
                $('.guess-copy').html('<b>YOUR GUESS</b><br>R' + r_slider.getValue() + ' G' + g_slider.getValue() + ' B' + b_slider.getValue() + '<br>' + evalScore(score));
                $('.random-copy').html('<b>ARGEEBE</b><br>R' + newRGB[0] + ' G' + newRGB[1] + ' B' + newRGB[2] + '<br>Click to Play Again');
                count++;
            } else {
                $('#instructions').html('                                <h3>Instructions<br> <small>1. Take a look at the color given to you in the swatch. <br>2. Input the red, green, and blue values you think make up the color. <br>3. Click on the swatch to see how you did. Scores range from 0 to 255, with 255 being the best.</small></h3>');
                $('#random-swatch').animate({
                    right: '0px'
                }, {
                    duration: 500,
                    queue: false
                });
                $('.col-xs-1').fadeIn(500);
                $('#guess-swatch').hide();
                $('#guess-swatch').css('left', '0');

                resetColors();
                count++;
            }
        }
    });
});