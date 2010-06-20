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
 * @extends b9.Element
 */
b9.Sprite = b9.createClass(b9.Element);

/**
 * hoge
 * @param {Number} max_rect_num hoge
 * @param {b9.Element} [parent] hoge
 */
b9.Sprite.prototype.initialize = function(max_rect_num, parent) {
    this.initializeSuper(parent);
    this._elem_type = b9.Element.TYPE_SPRITE;

    this._max_rect_num = max_rect_num;
    this._cur_rect_num = max_rect_num;
    this._rect = new Array(max_rect_num);

    for (var i = 0; i < max_rect_num; i++) {
        this._rect[i] = { pos: new b9.Vector(), size: new b9.Vector(),
            color: new b9.Color(b9.Color.FULL), uv1: new b9.Vector(), uv2: new b9.Vector() };
    }
};

/**
 * hoge
 */
b9.Sprite.prototype.finalize = function() {
    this.finalizeSuper();
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
 * @return {Number} hoge
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
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Vector} hoge
 */
b9.Sprite.prototype.rectPos = function(rect_index) {
    return this._rect[rect_index].pos;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Vector} hoge
 */
b9.Sprite.prototype.rectSize = function(rect_index) {
    return this._rect[rect_index].size;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Color} color hoge
 */
b9.Sprite.prototype.rectColor = function(rect_index) {
    return this._rect[rect_index].color;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Vector} hoge
 */
b9.Sprite.prototype.rectUV1 = function(rect_index) {
    return this._rect[rect_index].uv1;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Vector} hoge
 */
b9.Sprite.prototype.rectUV2 = function(rect_index) {
    return this._rect[rect_index].uv2;
};

b9.Sprite.prototype._render = function(canvas_ctx) {
    this._calcFinal();

    for (var i = 0; i < this._cur_rect_num; i++) {
        var rect = this._rect[i];
        b9.Sprite._vec1.set(rect.pos);
        b9.Sprite._vec1.toGlobal(this._world);

        b9.Sprite._color1.set(rect.color);
        b9.Sprite._color1.mul(this._final_filter_color);

        canvas_ctx.fillStyle = b9.Sprite._color1.toRGBA();
        canvas_ctx.fillRect(b9.Sprite._vec1.x, b9.Sprite._vec1.y, rect.size.x, rect.size.y);
    }
};

b9.Sprite._vec1 = new b9.Vector();
b9.Sprite._color1 = new b9.Color();
