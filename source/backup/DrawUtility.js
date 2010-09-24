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
b9.DrawUtility = {};

/**
 * hoge
 * @param {Canvas.Context} context hoge
 * @param {Number} x hoge
 * @param {Number} y hoge
 * @param {Number} w hoge
 * @param {Number} h hoge
 * @param {b9.Color} color hoge
 */
b9.DrawUtility.fillRect = function(context, x, y, w, h, color) {
    context.fillStyle = color.toRGB();
    context.globalAlpha = color.getA();

    context.fillRect(x, y, w, h);
};

/**
 * hoge
 * @param {Canvas.Context} context hoge
 * @param {Number} x hoge
 * @param {Number} y hoge
 * @param {Number} w hoge
 * @param {Number} h hoge
 * @param {Number} u1 hoge
 * @param {Number} v1 hoge
 * @param {Number} u2 hoge
 * @param {Number} v2 hoge
 * @param {Image} image hoge
 * @param {b9.Color} color hoge
 */
b9.DrawUtility.drawImage = function(context, x, y, w, h, u1, v1, u2, v2, image, color) {
    if (image.is_ready) {
        //context.fillStyle = color.toRGB(); // TODO
        context.globalAlpha = color.getA();

        if (u1 === 0.0 && v1 === 0.0 && u2 === 1.0 && v2 === 0.0) {
            if (w === image.width && h === image.height) {
                context.drawImage(image, x, y);
            } else {
                context.drawImage(image, x, y, w, h);
            }
        } else {
            var sx = u1 * image.width;
            var sy = v1 * image.height;
            var sw = (u2 - u1) * image.width;
            var sh = (v2 - v1) * image.height;

            context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
        }
    }
};
