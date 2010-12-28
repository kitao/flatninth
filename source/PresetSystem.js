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
    var scr;
    var canvas_width, canvas_height;

    b9.System.setup(canvas_id, this._updateFunc, this._renderFunc, target_fps);

    canvas_width = b9.System.getFramebufferWidth();
    canvas_height = b9.System.getFramebufferHeight();

    this._actor_list_array = new Array(this.ACTOR_LIST_COUNT);
    this._scr_array = new Array(this.SCREEN_COUNT);
    this._root_draw_array = new Array(this.SCREEN_COUNT);

    for (i = 0; i < this.ACTOR_LIST_COUNT; i++) {
        this._actor_list_array[i] = new b9.ActorList();
    }

    for (i = 0; i < this.SCREEN_COUNT; i++) {
        this._scr_array[i] = new b9.Screen(canvas_width, canvas_height);
        this._root_draw_array[i] = new b9.Drawable();
    }

    scr = this.getScreen(0);

    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_COLOR, true);
    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH, true);
    scr.getClearColor().set(0, 0, 0);
};

/**
 * Returns the specified actor list.
 * @param {Number} The index number of an actor list.
 * @return {b9.ActorList} The actor list.
 */
b9.PresetSystem.getActorList = function(actor_list_no) {
    return this._actor_list_array[actor_list_no - this.MIN_ACTOR_LIST_NO];
};

/**
 * Returns the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Screen} The screen.
 */
b9.PresetSystem.getScreen = function(scr_no) {
    return this._scr_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 * Returns the root drawable of the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Drawable} The root drawable.
 */
b9.PresetSystem.getRootDrawable = function(scr_no) {
    return this._root_draw_array[scr_no - this.MIN_SCREEN_NO];
};

b9.PresetSystem._updateFunc = function() {
    var i;

    for (i = 0; i < b9.PresetSystem.ACTOR_LIST_COUNT; i++) {
        b9.PresetSystem._actor_list_array[i].update();
    }
};

b9.PresetSystem._renderFunc = function() {
    var i;

    for (i = 0; i < b9.PresetSystem.SCREEN_COUNT; i++) {
        b9.PresetSystem._scr_array[i].render(b9.PresetSystem._root_draw_array[i]);
    }

    b9.System.swapBuffers();
};

/**
 *
 * @return {Number}
 */
b9.PresetSystem.MIN_ACTOR_LIST_NO = -3

/**
 *
 * @return {Number}
 */
b9.PresetSystem.MAX_ACTOR_LIST_NO = 3

/**
 *
 * @return {Number}
 */
b9.PresetSystem.ACTOR_LIST_COUNT = b9.PresetSystem.MAX_ACTOR_LIST_NO - b9.PresetSystem.MIN_ACTOR_LIST_NO + 1;

/**
 *
 * @return {Number}
 */
b9.PresetSystem.MIN_SCREEN_NO = -3

/**
 *
 * @return {Number}
 */
b9.PresetSystem.MAX_SCREEN_NO = 3

/**
 *
 * @return {Number}
 */
b9.PresetSystem.SCREEN_COUNT = b9.PresetSystem.MAX_SCREEN_NO - b9.PresetSystem.MIN_SCREEN_NO + 1;
