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

{
    var id1 = new b9.ID("abc");
    var id2 = new b9.ID("abc");
    var id3 = new b9.ID("def");

    b9.Debug.assert(id1.isEqual(id2));
    b9.Debug.assert(!id2.isEqual(id3));
}

{
    var id1 = new b9.ID();
    var id2 = new b9.ID();

    b9.Debug.assert(!id1.isEqual(id2));
}

{
    var id = new b9.ID();

    b9.Debug.assert(b9.ID.ZERO.isEqual(b9.ID.ZERO));
    b9.Debug.assert(!id.isEqual(b9.ID.ZERO));
}

b9.Debug.trace("id_test complete");
