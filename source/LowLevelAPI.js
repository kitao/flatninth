/*
 * Copyright (c) 2009-2010 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @class hoge
 */
b9.LowLevelAPI = {};

/*
 * Math
 */
b9.LowLevelAPI.floor = Math.floor;

b9.LowLevelAPI.sqrt = Math.sqrt;

b9.LowLevelAPI.sin = Math.sin;

b9.LowLevelAPI.cos = Math.cos;

b9.LowLevelAPI.asin = Math.asin;

b9.LowLevelAPI.acos = Math.acos;

b9.LowLevelAPI.atan2 = Math.atan2;

b9.LowLevelAPI.random = Math.random;

b9.LowLevelAPI.PI = Math.PI;

/*
 * System
 */
b9.LowLevelAPI.getTime = function() {
    return (new Date()).getTime();
};

b9.LowLevelAPI.setTimeout = function(func, time) {
    setTimeout(func, time);
};

b9.LowLevelAPI.clearTimeout = function(timer_id) {
    clearTimeout(timer_id);
};

/*
 * Asset
 */
b9.LowLevelAPI.loadImage = function(name) { // TODO: name?
    var image = new Image();
    image.is_ready = false;
    image.src = name;
    image.onload = function() { image.is_ready = true; };

    return image;
};

/*
 * Graphics
 */
b9.LowLevelAPI.getCanvasProxy = function(canvas_id) {
    var canvas = document.getElementById(canvas_id);

    if (canvas && canvas.getContext) {
        return { _canvas: canvas, _context: canvas.getContext("2d") };
    } else {
        return null;
    }
};

b9.LowLevelAPI.getCanvasID = function(canvas_proxy) {
    return canvas_proxy._id;
};

b9.LowLevelAPI.getCanvasWidth = function(canvas_proxy) {
    return canvas_proxy._canvas.width;
};

b9.LowLevelAPI.getCanvasHeight = function(canvas_proxy) {
    return canvas_proxy._canvas.height;
};

b9.LowLevelAPI.saveCanvasContext = function(canvas_proxy) {
    canvas_proxy._context.save();
};

b9.LowLevelAPI.restoreCanvasContext = function(canvas_proxy) {
    canvas_proxy._context.restore();
};

b9.LowLevelAPI.setClipArea = function(canvas_proxy, x, y, width, height) {
    var ctx = canvas_proxy._context;

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
};

b9.LowLevelAPI.fillRect = function(canvas_proxy, x, y, width, height, color) {
    var ctx = canvas_proxy._context;

    // TODO
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

b9.LowLevelAPI.drawImage = function(canvas_proxy, image, x, y, width, height) {
    canvas_proxy._context.drawImage(image, x, y, width, height); // TODO
};
