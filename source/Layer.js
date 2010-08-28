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
b9.Layer = b9.createClass();

/**
 * hoge
 * @param {Number} order hoge
 */
b9.Layer.prototype.initialize = function(order) {
    this._id = b9.generateID();
    this._name = "";
    this._order = order;
    this._is_visible = true;
    this._is_clear = true;
    this._pos = new b9.Vector2D();
    this._size = new b9.Vector2D(1.0, 1.0);
    this._filter_color = new b9.Color(b9.Color.FULL);
    this._clear_color = new b9.Color(1.0, 0.0, 1.0);
    this._local_canvas = null;
    this._list_item = new b9.ListItem(this);

    this._elem_root = new b9.Element();
    this._elem_root._is_root = true;

    b9.System._registerLayer(this);
};

/**
 * hoge
 */
b9.Layer.prototype.finalize = function() {
    b9.System._unregisterLayer(this);

    this._list_item.finalize();
    this._elem_root.finalize();
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Layer.prototype.getID = function() {
    return this._id;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Layer.prototype.getName = function() {
    return this._name;
};

/**
 * hoge
 * @param {String} name
 */
b9.Layer.prototype.setName = function(name) {
    this._name = name;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Layer.prototype.getOrder = function() {
    return this._order;
};

/**
 * hoge
 * @param {Number} order hoge
 */
b9.Layer.prototype.setOrder = function(order) {
    this._order = order;

    b9.System._registerLayer(this);
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.Layer.prototype.isVisible = function() {
    return this._is_visible;
};

/**
 * hoge
 * @param {Boolean} is_visible hoge
 */
b9.Layer.prototype.setVisible = function(is_visible) {
    this._is_visible = is_visible;
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.Layer.prototype.isClear = function() {
    return this._is_clear;
};

/**
 * hoge
 * @param {Boolean} is_clear hoge
 */
b9.Layer.prototype.setClear = function(is_clear) {
    this._is_clear = is_clear;
};

/**
 * hoge
 * @return {b9.Vector2D} hoge
 */
b9.Layer.prototype.pos = function() {
    return this._pos;
};

/**
 * hoge
 * @return {b9.Vector2D} hoge
 */
b9.Layer.prototype.size = function() {
    return this._size;
};

/**
 * hoge
 * @return {b9.Color} hoge
 */
b9.Layer.prototype.filterColor = function() {
    return this._filter_color;
};

/**
 * hoge
 * @return {b9.Color} hoge
 */
b9.Layer.prototype.clearColor = function() {
    return this._clear_color;
};

/**
 * hoge
 * @return {Canvas} hoge
 */
b9.Layer.prototype.getLocalCanvas = function() {
    return this._local_canvas;
};

/**
 * hoge
 * @param {String} canvas_id hoge
 */
b9.Layer.prototype.attachLocalCanvas = function(canvas_id) {
    var canvas = document.getElementById(canvas_id);

    if (canvas && canvas.getContext) {
        canvas.context = canvas.getContext("2d");
    }

    this._local_canvas = canvas;
};

/**
 * hoge
 */
b9.Layer.prototype.detatchLocalCanvas = function() {
    this._local_canvas = null;
};
/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.Layer.prototype.getPrev = function() {
    var item = this._list_item.getPrev();
    return item ? item.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.Layer.prototype.getNext = function() {
    var item = this._list_item.getNext();
    return item ? item.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Layer.prototype.elementRoot = function() {
    return this._elem_root;
};

b9.Layer.prototype._render = function() {
    var canvas = this._local_canvas ? this._local_canvas : b9.System.getMainCanvas();
    var context = canvas.context;

    context.save();

    /*
     * set clip area
     */
    context.beginPath();
    context.rect(this._pos.x, this._pos.y, this._size.x, this._size.y);
    context.clip();

    /*
     * clear layer
     */
    if (this._is_clear) {
        context.fillStyle = this._clear_color.toRGB();
        context.fillRect(this._pos.x, this._pos.y, this._size.x, this._size.y);
    }

    /*
     * draw elements
     */
    for (var elem = this._elem_root; elem; elem = elem.getNextAsList()) {
        if (elem._is_visible) {
            elem._render(canvas);
        } else {
            elem = elem.getLastDescendant();
        }
    }

    context.restore();
};
