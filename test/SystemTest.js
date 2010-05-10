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

function testSystem() {
    /* toID */
    assertEquals(0, b9.System.toID(""));
    assertEquals(-(((97 * 37) + 98) * 37 + 99), b9.System.toID("abc"));

    /* generateID */
    var id1 = b9.System.generateID();
    var id2 = b9.System.generateID();
    var id3 = b9.System.generateID();
    assertNotEquals(0, id1);
    assertNotEquals(0, id2);
    assertNotEquals(0, id3);
    assertNotEquals(id1, id2);
    assertNotEquals(id2, id3);
    assertNotEquals(id3, id1);
}
