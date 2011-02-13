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
 * Constructs a node.
 *
 * @class A node of a scene graph.
 */
b9.Node = b9.createClass();

/**
 * @ignore
 */
b9.Node.prototype.initialize = function() {
    this._node_flag =
        b9.Node.FLAG_VISIBLE |
        b9.Node.FLAG_DEPTH_TEST |
        b9.Node.FLAG_WRITE_RGB |
        b9.Node.FLAG_WRITE_DEPTH |
        b9.Node.FLAG_BILINEAR;

    this._local = new b9.Matrix3D(b9.Matrix3D.UNIT);
    this._color = new b9.Color(255, 255, 255, 255);
    this._blend_mode = b9.Node.BLEND_OFF;

    this._tree = new b9.LinkedTree(this);
    this._world = new b9.Matrix3D();
    this._final_color = new b9.Color();
    this._sort_value = 0.0;
    this._sort_next = null;
};

/**
 * Destructs this node. If this node has the parent, this node gets unlinked from it.
 * And all of the children of this node get unlinked.
 */
b9.Node.prototype.finalize = function() {
    this._tree.finalize();
};

/**
 * Returns whether the specified node flag is enabled.
 * @param {Number} node_flag A node flag.
 * @return {Boolean} true the flag is enabled; false otherwise.
 */
b9.Node.prototype.getNodeFlag = function(node_flag) {
    return (this._node_flag & node_flag) ? true : false;
};

/**
 * Sets the specified node flag.
 * @param {Number} node_flag A node flag.
 * @param {Boolean} is_enabled Whether the flag is enabled.
 */
b9.Node.prototype.setNodeFlag = function(node_flag, is_enabled) {
    if (is_enabled) {
        this._node_flag |= node_flag;
    } else {
        this._node_flag &= ~node_flag;
    }
};

/**
 * Returns the local matrix of this node.
 * @return {b9.Matrix3D} The local matrix.
 */
b9.Node.prototype.getLocal = function() {
    return this._local;
};

/**
 * Returns the color of this node, which applies to the children of this node and the objects managed by this node.
 * @return {b9.Color} The color.
 */
b9.Node.prototype.getColor = function() {
    return this._color;
};

/**
 * Returns the blend mode of this node.
 * @return {Number} The blend mode.
 */
b9.Node.prototype.getBlendMode = function() {
    return this._blend_mode;
};

/**
 * Sets the blend mode of this node.
 * @param {Number} blend_mode A blend mode.
 * @param {Boolean} with_preset_setting If true, FLAG_Z_SORT and FLAG_WRITE_DEPTH are set automatically,
 * such as the following:
 * <ul>
 * <li>BLEND_OFF -> FLAG_Z_SORT: off, FLAG_WRITE_DEPTH: on</li>
 * <li>BLEND_HALF -> FLAG_Z_SORT: on, FLAG_WRITE_DEPTH: off</li>
 * <li>BLEND_ADD -> FLAG_Z_SORT: on, FLAG_WRITE_DEPTH: off</li>
 * <li>BLEND_DEST_ALPHA -> FLAG_Z_SORT: off, FLAG_WRITE_DEPTH: on</li>
 * </ul>
 */
b9.Node.prototype.setBlendMode = function(blend_mode, with_preset_setting) {
    this._blend_mode = blend_mode;

    if (with_preset_setting) {
        if (blend_mode === b9.Node.BLEND_OFF || blend_mode === b9.Node.BLEND_DEST_ALPHA) {
            this._node_flag &= ~b9.Node.FLAG_Z_SORT;
            this._node_flag |= b9.Node.FLAG_WRITE_DEPTH;
        } else {
            this._node_flag |= b9.Node.FLAG_Z_SORT;
            this._node_flag &= ~b9.Node.FLAG_WRITE_DEPTH;
        }
    }
};

/**
 * Returns the previous node, regarding the whole tree as a list. If no such node exists, returns null.
 * @return {b9.Node} The previous node.
 */
b9.Node.prototype.getPrevAsList = function() {
    var tree = this._tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the next node, regarding the whole tree as a list. If no such node exists, returns null.
 * @return {b9.Node} The next node.
 */
b9.Node.prototype.getNextAsList = function() {
    var tree = this._tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the parent of this node. If no such node exists, returns null.
 * @return {b9.Node} The parent.
 */
b9.Node.prototype.getParent = function() {
    var tree = this._tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the previous sibling of this node. If no such node exists, returns null.
 * @return {b9.Node} The previous sibling.
 */
b9.Node.prototype.getPrevSibling = function() {
    var tree = this._tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the next sibling of this node. If no such node exists, returns null.
 * @return {b9.Node} The next sibling.
 */
b9.Node.prototype.getNextSibling = function() {
    var tree = this._tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the first child of this node. If no such node exists, returns null.
 * @return {b9.Node} The first child.
 */
b9.Node.prototype.getFirstChild = function() {
    var tree = this._tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the last child of this node. If no such node exists, returns null.
 * @return {b9.Node} The last child.
 */
b9.Node.prototype.getLastChild = function() {
    var tree = this._tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the last node of this tree, regarding this tree as a list.
 * If no such node exists, returns this tree.<br>
 * This method is mainly used to retrieve the terminator of the list
 * which consists of this node and its descendants.
 * @return {b9.Node} The last descendant.
 */
b9.Node.prototype.getLastDescendant = function() {
    var tree = this._tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
};

/**
 * Links a node as the first child with this node.
 * @param {b9.Node} child A node. If the node already belongs to some node,
 * the node gets automatically unlinked with it before the operation.
 */
b9.Node.prototype.addChildFirst = function(cihld) {
    this._tree.addChildFirst(child._tree);
};

/**
 * Links a node as the last child with this node.
 * @param {b9.Node} child A node. If the node already belongs to some node,
 * the node gets automatically unlinked with it before the operation.
 */
b9.Node.prototype.addChildLast = function(child) {
    this._tree.addChildLast(child._tree);
};

/**
 * Links a node as the previous of the specified node with this node.
 * @param {b9.Node} child A node. If the node already belongs to some node,
 * the node gets automatically unlinked with it before the operation.
 * @param {b9.Node} next_child The node to be the next. This node must be a child of this node.
 */
b9.Node.prototype.insertChildBefore = function(child, next_child) {
    this._tree.insertChildBefore(child._tree, next_child._tree);
};

/**
 * Links a node as the next of the specified node with this node.
 * @param {b9.Node} child A node. If the node already belongs to some node,
 * the node gets automatically unlinked with it before the operation.
 * @param {b9.Node} prev_child The node to be the previous. This node must be a child of this node.
 */
b9.Node.prototype.insertChildAfter = function(child, prev_child) {
    this._tree.insertChildAfter(child._tree, prev_child._tree);
};

/**
 * Unlinks a child from this node.
 * @param {b9.Node} child A child to be unlinked. This node must be a child of this node.
 */
b9.Node.prototype.removeChild = function(child) {
    this._tree.removeChild(child._tree);
};

b9.Node.prototype._calcFinal = function() {
    var parent = this.getParent();

    this._world.set(this._local);
    this._final_color.set(this._color);

    if (parent) {
        this._world.toGlobal(parent._local);
        this._final_color.mul(parent._final_color);
    }
};

b9.Node.prototype._setup = function() {
    var gl = b9.System.getGLContext();
    var node_flag = this._node_flag;
    var write_rgb = (node_flag & b9.Node.FLAG_WRITE_RGB) ? true : false;
    var blend_mode = this._blend_mode;

    this._calcFinal();

    gl.depthFunc((node_flag & b9.Node.FLAG_DEPTH_TEST) ? gl.GEQUAL : gl.ALWAYS);
    gl.colorMask(write_rgb, write_rgb, write_rgb, (node_flag & b9.Node.FLAG_WRITE_ALPHA) ? true : false);
    gl.depthMask((node_flag & b9.Node.FLAG_WRITE_DEPTH) ? true : false);

    if (node_flag & b9.Node.FLAG_CULL_FACE) {
        gl.enable(gl.CULL_FACE);
    } else {
        gl.disable(gl.CULL_FACE);
    }

    if (blend_mode === b9.Node.BLEND_OFF) {
        gl.disable(gl.BLEND);
    } else if (blend_mode === b9.Node.BLEND_HALF) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    } else if (blend_mode === b9.Node.BLEND_ADD) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    } else if (blend_mode === b9.Node.BLEND_DEST_ALPHA) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.DST_ALPHA, gl.ONE_MINUS_DST_ALPHA);
    }
};

b9.Node.prototype._render = function() {
    this._calcFinal();
};

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_VISIBLE = 0x8000;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_Z_SORT = 0x4000;

/**
 *
 * @return {Number}
 */
b9.Node.FLAG_DEPTH_TEST = 0x2000;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_WRITE_RGB = 0x1000;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_WRITE_ALPHA = 0x0800;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_WRITE_DEPTH = 0x0400;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_CULL_FACE = 0x0200;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_BILLBOARD = 0x0100;

/**
 * hoge
 * @return {Number}
 */
b9.Node.FLAG_BILINEAR = 0x0080;

/**
 * hoge
 * @return {Number}
 */
b9.Node.BLEND_OFF = 0;

/**
 * hoge
 * @return {Number}
 */
b9.Node.BLEND_HALF = 1;

/**
 * hoge
 * @return {Number}
 */
b9.Node.BLEND_ADD = 2;

/**
 * hoge
 * @return {Number}
 */
b9.Node.BLEND_DEST_ALPHA = 3;
