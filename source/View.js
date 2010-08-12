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
b9.View = b9.createClass();

/**
 * hoge
 * @param {b9.View} [parent] hoge
 */
b9.View.prototype.initialize = function(parent) {
    this._id = b9.generateID();
    this._name = "";
    this._canvas = null;
    this._canvas_ctx = null;
    this._view_flag = b9.View.FLAG_VISIBLE;
    this._pos = new b9.Vector2D();
    this._size = new b9.Vector2D();
    this._scale = new b9.Vector2D(1.0, 1.0);
    this._filter_color = new b9.Color(b9.Color.FULL);
    this._clear_color = new b9.Color(b9.Color.ZERO);
    this._view_tree = new b9.Tree(this);

    this._elem_root = new b9.Element();
    this._elem_root.setElementFlag(b9.Element._FLAG_ROOT, true);

    this._final_canvas = null;
    this._final_canvas_ctx = null;
    this._final_pos = new b9.Vector2D();
    this._final_size = new b9.Vector2D();
    this._final_scale = new b9.Vector2D();
    this._final_filter_color = new b9.Color();

    this._clip_lt_pos = new b9.Vector2D();
    this._clip_rb_pos = new b9.Vector2D();

    if (parent) {
        parent.addChildLast(this);
    }
};

/**
 * hoge
 */
b9.View.prototype.finalize = function() {
    this._view_tree.finalize();
    this._elem_root.finalize();
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.View.prototype.isRoot = function() {
    return (this._view_flag & b9.View._FLAG_ROOT) ? true : false;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getID = function() {
    return this._id;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.View.prototype.getName = function() {
    return this._name;
};

/**
 * hoge
 * @param {String} name
 */
b9.View.prototype.setName = function(name) {
    this._name = name;
};

/**
 * hoge
 * @return {Canvas} hoge
 */
b9.View.prototype.getCanvas = function() {
    return this._canvas;
};

/**
 * hoge
 * @param {String} canvas_id hoge
 */
b9.View.prototype.attachCanvas = function(canvas_id) {
    var canvas = document.getElementById(canvas_id);

    if (canvas && canvas.getContext) {
        this._canvas = canvas;
        this._canvas_ctx = canvas.getContext("2d");

        this.pos().set(b9.Vector2D.ZERO);
        this.size().set(canvas.width, canvas.height);
        this.setViewFlag(b9.View.FLAG_CLEAR, true);
    }
};

/**
 * hoge
 */
b9.View.prototype.detatchCanvas = function() {
    this._canvas = null;
    this._canvas_ctx = null;
};

/**
 * hoge
 * @param {Number} view_flag hoge
 * @return {Boolean} hoge
 */
b9.View.prototype.isViewFlagOn = function(view_flag) {
    return (this._view_flag & view_flag) ? true : false;
};

/**
 * hoge
 * @param {Number} view_flag hoge
 * @param {Boolean} is_on hoge
 */
b9.View.prototype.setViewFlag = function(view_flag, is_on) {
    if (is_on) {
        this._view_flag |= view_flag;
    } else {
        this._view_flag &= ~view_flag;
    }
};

/**
 * hoge
 * @return {b9.Vector2D} hoge
 */
b9.View.prototype.pos = function() {
    return this._pos;
};

/**
 * hoge
 * @return {b9.Vector2D} hoge
 */
b9.View.prototype.size = function() {
    return this._size;
};

/**
 * hoge
 * @return {b9.Vector2D} hoge
 */
b9.View.prototype.scale = function() {
    return this._scale;
};

/**
 * hoge
 * @return {b9.Color} hoge
 */
b9.View.prototype.filterColor = function() {
    return this._filter_color;
};

/**
 * hoge
 * @return {b9.Color} hoge
 */
b9.View.prototype.clearColor = function() {
    return this._clear_color;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.View.prototype.getPrevAsList = function() {
    var tree = this._view_tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.View.prototype.getNextAsList = function() {
    var tree = this._view_tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getParent = function() {
    var tree = this._view_tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getPrevSibling = function() {
    var tree = this._view_tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getNextSibling = function() {
    var tree = this._view_tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getFirstChild = function() {
    var tree = this._view_tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getLastChild = function() {
    var tree = this._view_tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getLastDescendant = function() {
    var tree = this._view_tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.addChildFirst = function(cihld) {
    this._view_tree.addChildFirst(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 */
b9.View.prototype.addChildLast = function(child) {
    this._view_tree.addChildLast(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 * @param {b9.View} next_child hoge
 */
b9.View.prototype.addChildBefore = function(child, next_child) {
    this._view_tree.addChildBefore(child._view_tree, next_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 * @param {b9.View} prev_child hoge
 */
b9.View.prototype.addChildAfter = function(child, prev_child) {
    this._view_tree.addChildAfter(child._view_tree, prev_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 */
b9.View.prototype.removeChild = function(child) {
    this._view_tree.removeChild(child._view_tree);
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.View.prototype.elementRoot = function() {
    return this._elem_root;
};

b9.View.prototype._calcFinal = function() {
    if (this._canvas) {
        this._final_canvas = this._canvas;
        this._final_canvas_ctx = this._canvas_ctx;

        this._final_pos.set(b9.Vector2D.ZERO);
        this._final_size.set(this._size);
        this._final_scale.set(1.0, 1.0);
        this._final_filter_color.set(this._filter_color);

        this._clip_lt_pos.set(b9.Vector2D.ZERO);
        this._clip_rb_pos.set(this._size);
    } else {
        var parent = this.getParent();

        this._final_canvas = parent._final_canvas;
        this._final_canvas_ctx = parent._final_canvas_ctx;

        this._final_pos.set(this._pos);
        this._final_pos.x *= parent._final_scale.x;
        this._final_pos.y *= parent._final_scale.y;
        this._final_pos.add(parent._final_pos);

        this._final_scale.set(this._scale);
        this._final_scale.x *= parent._final_scale.x;
        this._final_scale.y *= parent._final_scale.y;

        this._final_size.set(this._size);
        this._final_size.x *= this._final_scale.x;
        this._final_size.y *= this._final_scale.y;

        this._final_filter_color.set(this._filter_color).mul(parent._final_filter_color);

        this._clip_lt_pos.set(
                b9.Math.max(this._final_pos.x, parent._clip_lt_pos.x),
                b9.Math.max(this._final_pos.y, parent._clip_lt_pos.y));
        this._clip_rb_pos.set( // TODO: should add 1?
                b9.Math.min(this._final_pos.x + this._final_size.x, parent._clip_rb_pos.x),
                b9.Math.min(this._final_pos.y + this._final_size.y, parent._clip_rb_pos.y));

        if (this._clip_lt_pos.x > this._clip_rb_pos.x) { this._clip_rb_pos.x = this._clip_lt_pos.x; }
        if (this._clip_lt_pos.y > this._clip_rb_pos.y) { this._clip_rb_pos.y = this._clip_lt_pos.y; }
    }
};

b9.View.prototype._render = function() {
    this._calcFinal();

    if (this._clip_lt_pos.x === this._clip_rb_pos.x && this._clip_lt_pos.y === this._clip_rb_pos.y) {
        return;
    }

    this._final_canvas_ctx.save();

    /*
     * set clip area
     */
    this._final_canvas_ctx.beginPath();
    this._final_canvas_ctx.rect(
            this._clip_lt_pos.x, this._clip_lt_pos.y,
            this._clip_rb_pos.x - this._clip_lt_pos.x + 1,
            this._clip_rb_pos.y - this._clip_lt_pos.y + 1);
    this._final_canvas_ctx.clip();

    /*
     * clear view
     */
    if (this._view_flag & b9.View.FLAG_CLEAR) {
        var x = this._final_canvas.width / 2.0 + this._final_pos.x;
        var y = this._final_canvas.height / 2.0 - this._final_pos.y;

        this._final_canvas_ctx.fillStyle = this._clear_color.toRGB();
        this._final_canvas_ctx.fillRect(x, y, this._final_size.x, this._final_size.y);
        this._final_canvas_ctx.fillRect(this._final_pos.x, this._final_pos.y, this._final_size.x, this._final_size.y);
    }

    /*
     * draw elements
     */
    for (var elem = this._elem_root; elem; elem = elem.getNextAsList()) {
        if (elem.isElementFlagOn(b9.Element.FLAG_VISIBLE)) {
            elem._render(this._final_canvas, this._final_canvas_ctx);
        } else {
            elem = elem.getLastDescendant();
        }
    }

    this._final_canvas_ctx.restore();
};

/**
 * hoge
 * @return {Number}
 */
b9.View.FLAG_VISIBLE = 0x8000;

/**
 * hoge
 * @return {Number}
 */
b9.View.FLAG_CLEAR = 0x4000;

b9.View._FLAG_ROOT = 0x0001;
