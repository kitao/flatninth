/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
    this._x = 0;
    this._y = 0;
    this._width = width;
    this._height = height;
    this._clear_color = new b9.Color(255, 0, 0);
    this._focal_length = 1000.0;
    this._near_clip_dist = 10.0;
    this._far_clip_dist = 100000.0;
    this._inner_scale_x = 1.0;
    this._inner_scale_y = 1.0;
    this._camera = new b9.Matrix3D(b9.Matrix3D.UNIT);

    this._camera_to_screen = new b9.Matrix3D();
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
b9.Screen.prototype.getX = function() {
    return this._x;
};

/**
 * Returns the top position in the canvas.
 * @return {Number} The top position.
 */
b9.Screen.prototype.getY = function() {
    return this._y;
};

/**
 * Sets the position in the canvas.
 * @param {Number} x A left position.
 * @param {Number} y A top position.
 */
b9.Screen.prototype.setPos = function(x, y) {
    this._x = x;
    this._y = y;
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
 * Returns the clear color of this screen.
 * @return {b9.Color} The clear color.
 */
b9.Screen.prototype.getClearColor = function() {
    return this._clear_color;
};

/**
 *
 * @return {Number}
 */
b9.Screen.prototype.getFocalLength = function() {
    return this._focal_length;
};

/**
 *
 * @param {Number} focal_length
 */
b9.Screen.prototype.setFocalLength = function(focal_length) {
    this._focal_length = focal_length;
};

/**
 *
 * @return {Number}
 */
b9.Screen.prototype.getNearClipDist = function() {
    return this._near_clip_dist;
};

/**
 *
 * @return {Number}
 */
b9.Screen.prototype.getFarClipDist = function() {
    return this._far_clip_dist;
};

/**
 *
 * @param {Number} near_clip_dist
 * @param {Number} far_clip_dist
 */
b9.Screen.prototype.setClipDist = function(near_clip_dist, far_clip_dist) {
    this._near_clip_dist = near_clip_dist;
    this._far_clip_dist = far_clip_dist;
};

/**
 *
 * @return {Number}
 */
b9.Screen.prototype.getInnerScaleX = function() {
    return this._inner_scale_y;
};

/**
 *
 * @return {Number}
 */
b9.Screen.prototype.getInnerScaleY = function() {
    return this._inner_scale_y;
};

/**
 *
 * @param {Number} scale_x
 * @param {Number} scale_y
 */
b9.Screen.prototype.setInnerScale = function(scale_x, scale_y) {
    this._inner_scale_x = scale_x;
    this._inner_scale_y = scale_y;
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
    var clear_flag = 0;

    var world_to_camera = b9.Screen._mat1;
    var world_to_screen = b9.Screen._mat2;

    this._updateCameraToScreen(); // TODO

    world_to_camera.set(b9.Matrix3D.UNIT).toLocal(this._camera);
    world_to_screen.set(this._camera_to_screen)
    //world_to_screen.mulAs4x4(world_to_camera);

    // gl.viewport(x, y, w, h);

    /*
     * clear screen
     */
    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_COLOR)) {
        gl.clearColor(
                this._clear_color.getR() / 255.0,
                this._clear_color.getG() / 255.0,
                this._clear_color.getB() / 255.0,
                1.0);
        clear_flag = gl.COLOR_BUFFER_BIT;
    }

    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH)) {
        clear_flag |= gl.DEPTH_BUFFER_BIT;
    }

    if (clear_flag) {
        gl.clear(clear_flag);
    }

    /*
     * draw drawables
     */
    for (draw = root_draw; draw; draw = draw.getNextAsList()) {
        if (draw.getDrawableFlag(b9.Drawable.FLAG_VISIBLE)) {
            draw._render();
        } else {
            draw = draw.getLastDescendant();
        }
    }
};

b9.Screen.prototype._updateCameraToScreen = function() {
    var camera_to_screen_array = this._camera_to_screen.getArray();
    var inv_sub = 1.0 / (this._far_clip_dist - this._near_clip_dist);

    camera_to_screen_array[0] = this._focal_length * 2.0 / this._view_width;
    camera_to_screen_array[4] = 0.0;
    camera_to_screen_array[8] = 0.0;
    camera_to_screen_array[12] = 0.0;

    camera_to_screen_array[1] = 0.0;
    camera_to_screen_array[5] = this._focal_length * 2.0 / this._view_height;
    camera_to_screen_array[9] = 0.0;
    camera_to_screen_array[13] = 0.0;

    camera_to_screen_array[2] = 0.0;
    camera_to_screen_array[6] = 0.0;
    camera_to_screen_array[10] = (this._far_clip_dist + this._near_clip_dist) * inv_sub;
    camera_to_screen_array[14] = 2.0 * this._far_clip_dist * this._near_clip_dist * inv_sub;

    camera_to_screen_array[3] = 0.0;
    camera_to_screen_array[7] = 0.0;
    camera_to_screen_array[11] = -1.0;
    camera_to_screen_array[15] = 0.0;
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

b9.Screen._mat1 = new b9.Matrix3D();
b9.Screen._mat2 = new b9.Matrix3D();
