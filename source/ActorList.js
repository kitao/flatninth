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
b9.ActorList = b9.createClass();

/**
 * @ignore
 */
b9.ActorList.prototype.initialize = function() {
    this._is_active = true;

    this._list = new b9.LinkedList();
    this._next_actor = null;
};

/**
 *
 */
b9.ActorList.prototype.finalize = function() {
    this._list.finalize();
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.ActorList.prototype.isActive = function() {
    return this._is_active;
};

/**
 * hoge
 * @param {Boolean} is_active hoge
 */
b9.ActorList.prototype.setActive = function(is_active) {
    this._is_active = is_active;
};

/**
 * Returns the first actor of this actor list. If no such actor exists, returns null.
 * @return {b9.Actor} The first actor.
 */
b9.ActorList.prototype.getFirst = function() {
    var actor = this._list.getFirst();
    return actor ? actor.getSelf() : null;
};

/**
 * Returns the last actor of this actor list. If no such actor exists, returns null.
 * @return {b9.Actor} The last actor.
 */
b9.ActorList.prototype.getLast = function() {
    var actor = this._list.getLast();
    return actor ? actor.getSelf() : null;
};

/**
 * Links an actor as the first actor with this actor list.
 * @param {b9.Actor} actor An actor. If the actor already belongs to some actor list,
 * the actor gets automatically unlinked with it before the operation.
 */
b9.ActorList.prototype.addFirst = function(actor) {
    this._list.addFirst(actor._item);
};

/**
 * Links an actor as the last actor with this actor list.
 * @param {b9.Actor} actor An actor. If the actor already belongs to some actor list,
 * the actor gets automatically unlinked with it before the operation.
 */
b9.ActorList.prototype.addLast = function(actor) {
    this._list.addLast(actor._item);
};

/**
 * Links an actor as the previous of the specified actor with this actor list.
 * @param {b9.Actor} actor An actor. If the actor already belongs to some actor list,
 * the actor gets automatically unlinked with it before the operation.
 * @param {b9.Actor} next_actor The actor to be the next. This actor must belong to this actor list.
 */
b9.ActorList.prototype.insertBefore = function(actor, next_actor) {
    this._list.insertBefore(actor._item, next_actor._item);
};

/**
 * Links an actor as the next of the specified actor with this actor list.
 * @param {b9.Actor} actor An actor. If the actor already belongs to some actor list,
 * the actor gets automatically unlinked with it before the operation.
 * @param {b9.Actor} prev_actor The actor to be the previous. This actor must belong to this actor list.
 */
b9.ActorList.prototype.insertAfter = function(actor, prev_actor) {
    this._list.insertAfter(actor._item, prev_actor._item);
};

/**
 * Unlinks an actor from this actor list.
 * @param {b9.Actor} actor An actor to be unlinked. This actor must belong to this actor list.
 */
b9.ActorList.prototype.remove = function(actor) {
    this._list.remove(actor._item);
};

/**
 * Unlinks all of the actor from this actor list.
 */
b9.ActorList.prototype.clear = function() {
    this._list.clear();
};

/**
 * Updates all of the actors which belong to this actor list.
 */
b9.ActorList.prototype.update = function() {
    var actor;

    for (actor = this.getFirst(); actor; actor = this._next_actor) {
        this._next_actor = actor.getNext();

        if (actor._is_active) {
            actor.update();
        }
    }
};
