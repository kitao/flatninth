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
b9.Actor = b9.createClass();

/**
 * @ignore
 */
b9.Actor.prototype.initialize = function() {
    this._is_active = true;

    this._item = new b9.LinkedListItem(this);
};

/**
 * hoge
 */
b9.Actor.prototype.finalize = function() {
    var list = this.getActorList();

    if (list && list._next_actor === this) {
        list._next_actor = this.getNext();
    }

    this._task_tree.finalize();
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.Actor.prototype.isActive = function() {
    return this._is_active;
};

/**
 * hoge
 * @param {Boolean} is_active hoge
 */
b9.Actor.prototype.setActive = function(is_active) {
    this._is_active = is_active;
};

/**
 * Returns the actor list to which this actor belongs. If no such actor list exists, returns null.
 * @return {b9.ActorList} The actor list this actor belongs to.
 */
b9.Actor.prototype.getActorList = function() {
    var list = this._item.getList();
    return list ? list.getSelf() : null;
};

/**
 * Returns the previous actor of this actor. If no such actor exists, returns null.
 * @return {b9.Actor} The previous actor.
 */
b9.Actor.prototype.getPrev = function() {
    this._item.getPrev();
};

/**
 * Returns the next actor of this actor. If no such actor exists, returns null.
 * @return {b9.Actor} The next actor.
 */
b9.Actor.prototype.getNext = function() {
    this._item.getNext();
};
