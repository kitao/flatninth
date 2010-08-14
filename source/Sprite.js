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
        this._rect[i] = { pos: new b9.Vector2D(), size: new b9.Vector2D(), rot: new b9.Sprite.Angle(),
            color: new b9.Color(b9.Color.FULL), uv: new b9.Sprite.TexCoord() };
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
 * @return {b9.Vector2D} hoge
 */
b9.Sprite.prototype.rectPos = function(rect_index) {
    return this._rect[rect_index].pos;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Vector2D} hoge
 */
b9.Sprite.prototype.rectSize = function(rect_index) {
    return this._rect[rect_index].size;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Sprite.Angle} hoge
 */
b9.Sprite.prototype.rectRot = function(rect_index) {
    return this._rect[rect_index].rot;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Color} hoge
 */
b9.Sprite.prototype.rectColor = function(rect_index) {
    return this._rect[rect_index].color;
};

/**
 * hoge
 * @param {Number} rect_index hoge
 * @return {b9.Sprite.TexCoord} hoge
 */
b9.Sprite.prototype.rectUV = function(rect_index) {
    return this._rect[rect_index].uv;
};

b9.Sprite.prototype._render = function(canvas_proxy) {
    this._calcFinal();

    var image = b9.Asset.getAsset(this._image);

    for (var i = 0; i < this._cur_rect_num; i++) {
        var rect = this._rect[i];

        b9.Sprite._vec1.set(rect.pos).toGlobal(this._world);
        b9.Sprite._vec2.set(rect.size).toGlobalNoTrans(this._world);
        b9.Sprite._color1.set(rect.color).mul(this._final_filter_color);

        var x = b9.Sprite._vec1.x;
        var y = b9.Sprite._vec1.y;
        var w = b9.Sprite._vec2.x;
        var h = b9.Sprite._vec2.y;

        // TODO
        if (image) {
            if (image.is_ready) {
                // TODO: branch by UV
                b9.LowLevelAPI.drawImage(canvas_proxy, image, x, y, w, h);
            }
        } else {
            b9.LowLevelAPI.fillRect(canvas_proxy, x, y, w, h, b9.Sprite._color1.toRGBA());
        }
    }
};

b9.Sprite._vec1 = new b9.Vector2D();
b9.Sprite._vec2 = new b9.Vector2D();
b9.Sprite._color1 = new b9.Color();

/**
 * @class hoge
 */
b9.Sprite.Angle = b9.createClass();

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.Angle.prototype.deg = 0.0;

/**
 * @class hoge
 */
b9.Sprite.TexCoord = b9.createClass();

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.TexCoord.prototype.u1 = 0.0;

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.TexCoord.prototype.v1 = 0.0;

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.TexCoord.prototype.u2 = 0.0;

/**
 * hoge
 * @return {Number}
 */
b9.Sprite.TexCoord.prototype.v2 = 0.0;

/**
 * hoge
 * @param {Number} u hoge
 * @param {Number} v hoge
 */
b9.Sprite.TexCoord.prototype.set = function(u1, v1, u2, v2) {
    this.u1 = u1;
    this.v1 = v1;
    this.u2 = u2;
    this.v2 = v2;
};
