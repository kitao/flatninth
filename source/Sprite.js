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
 * hoge
 * @class hoge
 * @extends b9.Element
 * @param {Number} dimension
 * @param {Number} max_rect_num
 */
b9.Sprite = function(dimension, max_rect_num) {
    b9.Element.call(this, dimension);
    this._elem_type = b9.Element.TYPE_SPRITE;

    this._max_rect_num = max_rect_num;
    this._cur_rect_num = max_rect_num;
    this._rect = new Array(max_rect_num);

    for (var i = 0; i < max_rect_num; i++) {
        this._rect[i] = { width: 0.0, height: 0.0, angle: 0.0,
            color: new b9.Color(b9.Color.FULL), u1: 0.0, v1: 0.0, u2: 0.0, v2: 0.0 };
    }

    if (this._dimension === 2) {
        for (i = 0; i < max_rect_num; i++) {
            this._rect[i].pos = new b9.Vector2D();
        }
    } else {
        for (i = 0; i < max_rect_num; i++) {
            this._rect[i].pos = new b9.Vector3D();
        }
    }
};

b9.Sprite.prototype = b9.Element;
b9.Sprite.constructor = b9.Sprite;

/**
 *
 */
b9.Sprite.prototype.destroy = function() {
    b9.Element.destroy.call(this);

    this._rect = null;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Sprite.prototype.getMaxRectNum = function() {
    return this._max_rect_num;
};

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.prototype.getCurRectNum = function() {
    return this._cur_rect_num;
};

/**
 * hoge
 * @param {Number} cur_rect_num hoge
 */
b9.Sprite.prototype.setCurRectNum = function(cur_rect_num) {
    this._cur_rect_num = b9.Math.clamp(cur_rect_num, 0, this._max_rect_num);
};

/**
 *
 */
b9.Sprite.prototype.getRectPos = function(rect_index, pos) {
    pos.set(this._rect[rect_index].pos);
};

/**
 *
 */
b9.Sprite.prototype.setRectPos = function(rect_index, pos) {
    this._rect[rect_index].pos.set(pos);
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getRectWidth = function(rect_index) {
    return this._rect[rect_index].width;
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getRectHeight = function(rect_index) {
    return this._rect[rect_index].height;
};

/**
 * hoge
 * @param {Number} rect_index
 * @param {Number} width
 * @param {Number} height
 */
b9.Sprite.prototype.setRectSize = function(rect_index, width, height) {
    this._rect[rect_index].width = width;
    this._rect[rect_index].height = height;
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getRectAngle = function(rect_index) {
    return this._rect[rect_index].angle;
};

/**
 * hoge
 * @param {Number} rect_index
 * @param {Number} deg
 */
b9.Sprite.prototype.setRectAngle =function(rect_index, deg) {
    this._rect[rect_index].angle = deg;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @param {b9.Color} color hoge
 */
b9.Sprite.prototype.getRectColor = function(rect_index, color) {
    color.set(this._rect[rect_index].color);
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @param {b9.Color} color hoge
 */
b9.Sprite.prototype.setRectColor = function(rect_index, color) {
    this._rect[rect_index].color.set(color);
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getU1 = function(rect_index) {
    return this._rect[rect_index].u1;
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getV1 = function(rect_index) {
    return this._rect[rect_index].v1;
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getU2 = function(rect_index) {
    return this._rect[rect_index].u2;
};

/**
 * hoge
 * @param {Number} rect_index
 * @return {Number}
 */
b9.Sprite.prototype.getV2 = function(rect_index) {
    return this._rect[rect_index].v2;
};

/**
 * hoge
 * @param {Number} rect_index
 * @param {Number} u1
 * @param {Number} v1
 * @param {Number} u2
 * @param {Number} v2
 */
b9.Sprite.prototype.setRectUV = function(rect_index, u1, v1, u2, v2) {
    this._rect[rect_index].u1 = u1;
    this._rect[rect_index].v1 = v1;
    this._rect[rect_index].u2 = u2;
    this._rect[rect_index].v2 = v2;
};
