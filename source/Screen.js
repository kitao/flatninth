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
 * Constructs a screen.
 *
 * @class A rendering target of drawables.
 *
 * @param {Number} width
 * @param {Number} height
 */
b9.Screen = b9.createClass();

/**
 * @ignore
 */
b9.Screen.prototype.initialize = function(width, height) {
    this._scr_flag = b9.Screen.FLAG_VISIBLE;
    this._x = 0.0f;
    this._y = 0.0f;
    this._width = width;
    this._height = height;
    this._alpha = 1.0;
    this._field_of_view = 45.0; // TODO
    this._aspect_ratio = 1.0; // TODO
    this._near_clip_dist = 0.0; // TODO
    this._far_clip_dist = 100.0; // TODO
    this._clear_color = new b9.Color(1.0, 0.0, 1.0);
    this._camera = new b9.Matrix3D(b9.Matrix3D.UNIT);
};

/**
 * hoge
 */
b9.Screen.prototype.finalize = function() {
};


/**
 * Returns whether the specified screen flag is enabled.
 * @param {Number} scr_flag A screen flag.
 * @return {Boolean} true the flag is enabled; false otherwise.
 */
b9.Screen.prototype.getScreenFlag = function(scr_flag) {
    return (this._scr_flag & scr_flag) ? true : false;
};

/**
 * Sets the specified screen flag.
 * @param {Number} scr_flag A screen flag.
 * @param {Boolean} is_enabled Whether the flag is enabled.
 */
b9.Screen.prototype.setScreenFlag = function(scr_flag, is_enabled) {
    if (is_enabled) {
        this._scr_flag |= scr_flag;
    } else {
        this._scr_flag &= ~scr_flag;
    }
};

/**
 * Returns the left postion in the canvas.
 * @return {Number} The left position.
 */
b9.Screen.prototype.getLeft = function() {
    return this._left;
};

/**
 * Returns the top position in the canvas.
 * @return {Number} The top position.
 */
b9.Screen.prototype.getTop = function() {
    return this._top;
};

/**
 * Sets the position in the canvas.
 * @param {Number} left A left position.
 * @param {Number} top A top position.
 */
b9.Screen.prototype.setPos = function(left, top) {
    this._left = left;
    this._top = top;
};

/**
 * Returns the width of this screen.
 * @return {Number} The width of this screen.
 */
b9.Screen.prototype.getWidth = function() {
    return this._width;
};

/**
 * Returns the height of this screen.
 * @return {Number} The height of this screen.
 */
b9.Screen.prototype.getHeight = function() {
    return this._height;
};

/**
 * Sets the size of this screen.
 * @param {Number} width A width of this screen.
 * @param {Number} height A height of this screen.
 */
b9.Screen.prototype.setSize = function(width, height) {
    this._width = width;
    this._height = height;
};

/**
 * Returns the alpha of this screen.
 * @return {Number} The alpha of this screen.
 */
b9.Screen.prototype.getAlpha = function() {
    return this._alpha;
};

/**
 * Sets the alpha of this screen.
 * @param {Number} alpha The alpha of this screen.
 */
b9.Screen.prototype.setAlpha = function(alpha) {
    this._alpha = alpha;
};

/**
 * Returns the clear color of this screen.
 * @return {b9.Color} The clear color.
 */
b9.Screen.prototype.getClearColor = function() {
    return this._clear_color;
};

/**
 * Returns the camera matrix of this screen.
 * @return {b9.Matrix3D} The camera matrix.
 */
b9.Screen.prototype.getCamera = function() {
    return this._camera;
};

/**
 *
 * @param {b9.Drawable} root_draw
 */
b9.Screen.prototype.render = function(root_draw) {
    var draw;
    var gl = b9.System.getGLContext();

    /*
     * clear screen
     */
    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_COLOR)) {
        gl.clearColor(
                this._clear_color.getR() / 255.0,
                this._clear_color.getG() / 255.0,
                this._clear_color.getB() / 255.0,
                this._clear_color.getA() / 255.0);
    }

    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH)) {
        gl.clearDepth(-1.0);
    }

    /*
     * draw drawables
     */
    for (draw = root_draw; draw; draw = draw.getNextAsList()) {
        if (draw.getFlag(b9.Drawable.FLAG_VISIBLE)) {
            draw._render();
        } else {
            draw = draw.getLastDescendant();
        }
    }
};

/**
 * hoge
 * @return {Number}
 */
b9.Screen.FLAG_VISIBLE = 0x8000;

/**
 * hoge
 * @return {Number}
 */
b9.Screen.FLAG_CLEAR_COLOR = 0x4000;

/**
 * hoge
 * @return {Number}
 */
b9.Screen.FLAG_CLEAR_DEPTH = 0x2000;
