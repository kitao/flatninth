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
 * @class
 */
b9.PresetSystem = {};

/**
 *
 */
b9.PresetSystem.setup = function(canvas_id, target_fps) {
    var i;
    var canvas_width, canvas_height;

    b9.System.setup(canvas_id, this._updateFunc, this._renderFunc, target_fps);

    canvas_width = b9.System.getFramebufferWidth();
    canvas_height = b9.System.getFramebufferHeight();

    this._first_al = new b9.ActorList();
    this._prev_al = new b9.ActorList();
    this._normal_al = new b9.ActorList();
    this._next_al = new b9.ActorList();
    this._last_al = new b9.ActorList();

    this._first_scr = new b9.Screen(canvas_width, canvas_height);
    this._prev_scr = new b9.Screen(canvas_width, canvas_height);
    this._normal_scr = new b9.Screen(canvas_width, canvas_height);
    this._next_scr = new b9.Screen(canvas_width, canvas_height);
    this._last_scr = new b9.Screen(canvas_width, canvas_height);

    this._first_draw = new b9.Drawable();
    this._prev_draw = new b9.Drawable();
    this._normal_draw = new b9.Drawable();
    this._next_draw = new b9.Drawable();
    this._last_draw = new b9.Drawable();
};

/**
 * Returns the actor list which gets updated first.
 * @return {b9.ActorList} The first actor list.
 */
b9.PresetSystem.getFirstActorList = function() {
    return this._first_al;
};

/**
 * Returns the actor list which gets updated second.
 * @return {b9.ActorList} The prevous actor list.
 */
b9.PresetSystem.getPrevActorList = function() {
    return this._prev_al;
};

/**
 * Returns the actor list which gets updated third.
 * @return {b9.ActorList} The normal actor list.
 */
b9.PresetSystem.getNormalActorList = function() {
    return this._normal_al;
};

/**
 * Returns the actor list which gets updated fourth.
 * @return {b9.ActorList} The next actor list.
 */
b9.PresetSystem.getNextActorList = function() {
    return this._next_al;
};

/**
 * Returns the actor list which gets updated last.
 * @return {b9.ActorList} The last actor list.
 */
b9.PresetSystem.getLastActorList = function() {
    return this._last_al;
};

/**
 * Returns the screen which gets rendered first.
 * @return {b9.Screen} The first screen.
 */
b9.PresetSystem.getFirstScreen = function() {
    return this._first_scr;
};

/**
 * Returns the screen which gets rendered second.
 * @return {b9.Screen} The previous screen.
 */
b9.PresetSystem.getPrevScreen = function() {
    return this._prev_scr;
};

/**
 * Returns the screen which gets rendered third.
 * @return {b9.Screen} The normal screen.
 */
b9.PresetSystem.getNormalScreen = function() {
    return this._normal_scr;
};

/**
 * Returns the screen which gets rendered fourth.
 * @return {b9.Screen} The next screen.
 */
b9.PresetSystem.getNextScreen = function() {
    return this._next_scr;
};

/**
 * Returns the screen which gets rendered last.
 * @return {b9.Screen} The last screen.
 */
b9.PresetSystem.getLastScreen = function() {
    return this._last_scr;
};

/**
 * Returns the root drawable of the first screen.
 * @return {b9.Drawable} The root drawable of the first screen.
 */
b9.PresetSystem.getFirstRootDrawable = function() {
    return this._first_draw;
};

/**
 * Returns the root drawable of the previous screen.
 * @return {b9.Drawable} The root drawable of the previous screen.
 */
b9.PresetSystem.getPrevRootDrawable = function() {
    return this._prev_draw;
};

/**
 * Returns the root drawable of the normal screen.
 * @return {b9.Drawable} The root drawable of the normal screen.
 */
b9.PresetSystem.getNormalRootDrawable = function() {
    return this._normal_draw;
};

/**
 * Returns the root drawable of the next screen.
 * @return {b9.Drawable} The root drawable of the next screen.
 */
b9.PresetSystem.getNextRootDrawable = function() {
    return this._next_draw;
};

/**
 * Returns the root drawable of the last screen.
 * @return {b9.Drawable} The root drawable of the last screen.
 */
b9.PresetSystem.getLastRootDrawable = function() {
    return this._last_draw;
};

b9.PresetSystem._updateFunc = function() {
    // TODO
};

b9.PresetSystem._renderFunc = function() {
    // TODO
};
