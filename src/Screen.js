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
    this._clear_color = new b9.Color(255, 0, 0, 255);
    this._focal_length = 1000.0;
    this._near_clip_dist = 10.0;
    this._far_clip_dist = 100000.0;
    this._inner_scale_x = 1.0;
    this._inner_scale_y = 1.0;
    this._camera = new b9.Matrix3D(b9.Matrix3D.UNIT);
    this._camera.getTrans().setZ(this._focal_length);
    this._root_draw = new b9.Drawable();

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
 * Returns the root drawable of this screen.
 * @return {b9.Drawable} The root drawable.
 */
b9.Screen.prototype.getRootDrawable = function() {
    return this._root_draw;
};

/**
 *
 */
b9.Screen.prototype.render = function() {
    var draw;
    var gl = b9.System.getGLContext();
    var camera = this._camera;
    var clear_flag = 0;
    var sort_list = null;

    var world_to_camera = b9.Screen._mat1;
    var world_to_screen = b9.Screen._mat2;

    this._updateCameraToScreen(); // TODO

    world_to_camera.set(b9.Matrix3D.UNIT).toLocal(camera);
    b9.Matrix3D.mulArrayAs4x4(
            this._camera_to_screen.getArray(), world_to_camera.getArray(), world_to_screen.getArray());

    // gl.viewport(x, y, w, h);

    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_COLOR)) {
        gl.clearColor(
                this._clear_color.getR() / 255.0,
                this._clear_color.getG() / 255.0,
                this._clear_color.getB() / 255.0,
                this._clear_color.getA() / 255.0);
        clear_flag = gl.COLOR_BUFFER_BIT;
    }

    if (this.getScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH)) {
        clear_flag |= gl.DEPTH_BUFFER_BIT;
    }

    if (clear_flag) {
        gl.clear(clear_flag);
    }

    for (draw = this._root_draw; draw; draw = draw.getNextAsList()) {
        if (draw.getDrawableFlag(b9.Drawable.FLAG_VISIBLE)) {
            if (draw.getDrawableFlag(b9.Drawable.FLAG_Z_SORT)) {
                draw._sort_value =
                    b9.Screen._vec1.set(draw._world.getTrans()).sub(camera.getTrans()).dot(camera.getZAxis());

                draw._sort_next = sort_list;
                sort_list = draw;
            } else {
                draw._render(world_to_screen);
            }
        } else {
            draw = draw.getLastDescendant();
        }
    }

    if (sort_list) {
        sort_list = b9.Screen._sortList(sort_list, null, null);

        for (draw = sort_list; draw; draw = draw._sort_next) {
            draw._render(world_to_screen);
        }
    }
};

b9.Screen.prototype._updateCameraToScreen = function() {
    var camera_to_screen_array = this._camera_to_screen.getArray();
    var inv_sub = 1.0 / (this._far_clip_dist - this._near_clip_dist);

    camera_to_screen_array[0] = this._focal_length * 2.0 / this._width;
    camera_to_screen_array[4] = 0.0;
    camera_to_screen_array[8] = 0.0;
    camera_to_screen_array[12] = 0.0;

    camera_to_screen_array[1] = 0.0;
    camera_to_screen_array[5] = this._focal_length * 2.0 / this._height;
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

b9.Screen._sortList = function(sort_list, start, end) {
    var draw, next;
    var center = sort_list;
    var center_sort_value = center.sort_value;
    var left = null;
    var left_end = null;
    var right = null;
    var right_end = null;

    sort_list = sort_list._sort_next;

    for (draw = sort_list; draw != end; draw = next) {
        next = draw._sort_next;

        if (draw.sort_value <= center_sort_value) {
            if (!left) {
                left_end = draw;
            }

            draw.sort_list = left;
            left = draw;
        } else {
            if (!right) {
                right_end = draw;
            }

            draw.sort_list = right;
            right = draw;
        }
    }

    if (left) {
        if (start) {
            start._sort_next = left;
        }

        left_end._sort_next = center;
        sort_list = b9.Screen._sortList(left, start, center);
    } else {
        if (start) {
            start._sort_next = center;
        }

        sort_list = center;
    }

    if (right) {
        center._sort_next = right;
        right_end._sort_next = end;
        b9.Screen._sortList(right, center, end);
    } else {
        center._sort_next = end;
    }

    return sort_list;
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

b9.Screen._vec1 = new b9.Vector3D();
b9.Screen._mat1 = new b9.Matrix3D();
b9.Screen._mat2 = new b9.Matrix3D();
