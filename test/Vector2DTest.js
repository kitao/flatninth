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

function testVector2D() {
    /* initialize */
    /* getX */
    /* getY */
    var vec1 = new b9.Vector2D();
    assertTrue(vec1.x === 0.0 && vec1.y === 0.0);

    var vec2 = new b9.Vector2D(1.0, 2.0);
    assertTrue(vec2.x === 1.0 && vec2.y === 2.0);

    var vec3 = new b9.Vector2D(vec2);
    assertTrue(vec2.x === 1.0 && vec2.y === 2.0);

    /* set */
    assertEqualsVector2D(new b9.Vector2D(3.0, 4.0), vec1.set(3.0, 4.0));
    assertEqualsVector2D(vec1, vec2.set(vec1));

    /* neg */
    vec1.set(10.0, -20.0);
    assertEqualsVector2D(new b9.Vector2D(-10.0, 20.0), vec1.neg());

    /* add */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 4.0);
    assertEqualsVector2D(new b9.Vector2D(4.0, 6.0), vec1.add(vec2));

    /* sub */
    vec1.set(2.0, 3.0);
    vec2.set(3.0, 5.0);
    assertEqualsVector2D(new b9.Vector2D(-1.0, -2.0), vec1.sub(vec2));

    /* mul */
    vec1.set(1.0, 2.0);
    assertEqualsVector2D(new b9.Vector2D(10.0, 20.0), vec1.mul(10.0));

    /* div */
    vec1.set(1.0, 2.0);
    assertEqualsVector2D(new b9.Vector2D(0.1, 0.2), vec1.div(10.0));

    /* norm */
    vec1.set(-3.0, -4.0);
    assertEqualsFloat(5.0, vec1.norm());

    /* sqNorm */
    vec1.set(2.0, 3.0);
    assertEqualsFloat(13.0, vec1.sqNorm());

    /* dist */
    vec1.set(-1.0, -2.0);
    vec2.set(2.0, -6.0);
    assertEqualsFloat(5.0, vec1.dist(vec2));

    /* sqDist */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 5.0);
    assertEqualsFloat(13.0, vec1.sqDist(vec2));

    /* dot */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 4.0);
    assertEqualsFloat(11.0, vec1.dot(vec2));

    /* normalize */
    vec1.set(3.0, 4.0);
    assertEqualsVector2D(new b9.Vector2D(0.6, 0.8), vec1.normalize());

    /* rotateFloat */
    vec1.set(1.0, 2.0);
    assertEqualsVector2D(new b9.Vector2D(-2.0, 1.0), vec1.rotateFloat(90.0));

    /* rotateInt */
    vec1.set(1.0, 2.0);
    assertEqualsVector2D(new b9.Vector2D(-2.0, 1.0), vec1.rotateInt(90.5));

    /* interp */
    vec1.set(1.0, 2.0);
    vec2.set(-1.0, -2.0);
    assertEqualsVector2D(new b9.Vector2D(1.0, 2.0), vec1.interp(vec2, -1.0));

    vec1.set(1.0, 2.0);
    assertEqualsVector2D(new b9.Vector2D(0.0, 0.0), vec1.interp(vec2, 0.5));

    vec1.set(1.0, 2.0);
    assertEqualsVector2D(vec2, vec1.interp(vec2, 2.0));

    /* toLocal */
    var mat1 = new b9.Matrix2D(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(1.0, 5.0);
    assertEqualsVector2D(new b9.Vector2D(2.0, 1.0), vec1.toLocal(mat1));

    /* toGlobal */
    mat1.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(2.0, 1.0);
    assertEqualsVector2D(new b9.Vector2D(1.0, 5.0), vec1.toGlobal(mat1));

    /* toLocalNoTrans */
    mat1 = new b9.Matrix2D(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(1.0, 5.0);
    assertEqualsVector2D(new b9.Vector2D(5.0, -1.0), vec1.toLocalNoTrans(mat1));

    /* toGlobalNoTrans */
    mat1.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(2.0, 1.0);
    assertEqualsVector2D(new b9.Vector2D(-1.0, 2.0), vec1.toGlobalNoTrans(mat1));

    /* isEqual */
    vec1.set(1.0, 2.0);
    vec2.set(vec1);
    assertTrue(vec1.isEqual(vec2));

    vec2.set(1.1, 2.0);
    assertFalse(vec1.isEqual(vec2));

    vec2.set(1.0, 2.1);
    assertFalse(vec1.isEqual(vec2));

    /* toString */
    assertEquals("(1, 0)", b9.Vector2D.X_UNIT.toString());

    /* ZERO */
    assertEqualsVector2D(new b9.Vector2D(0.0, 0.0), b9.Vector2D.ZERO);

    /* X_UNIT */
    assertEqualsVector2D(new b9.Vector2D(1.0, 0.0), b9.Vector2D.X_UNIT);

    /* Y_UNIT */
    assertEqualsVector2D(new b9.Vector2D(0.0, 1.0), b9.Vector2D.Y_UNIT);
}
