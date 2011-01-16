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
    var vec1 = new b9.Vector2D();
    assertTrue(vec1.x === 0.0 && vec1.y === 0.0);

    var vec2 = new b9.Vector2D(1.0, 2.0);
    assertTrue(vec2.x === 1.0 && vec2.y === 2.0);

    var vec3 = new b9.Vector2D(vec2);
    assertTrue(vec3.x === 1.0 && vec3.y === 2.0);

    /* set */
    assertEquals_object(new b9.Vector2D(3.0, 4.0), vec1.set(3.0, 4.0));
    assertEquals_object(vec1, vec2.set(vec1));

    /* neg */
    vec1.set(10.0, -20.0);
    assertEquals_object(new b9.Vector2D(-10.0, 20.0), vec1.neg());

    /* add */
    vec1.set(1.0, 2.0);
    vec2.set(4.0, 5.0);
    assertEquals_object(new b9.Vector2D(5.0, 7.0), vec1.add(vec2));

    /* sub */
    vec1.set(2.0, 3.0);
    vec2.set(3.0, 5.0);
    assertEquals_object(new b9.Vector2D(-1.0, -2.0), vec1.sub(vec2));

    /* mul */
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(10.0, 20.0), vec1.mul(10.0));

    /* div */
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(0.1, 0.2), vec1.div(10.0));

    /* norm */
    vec1.set(-3.0, -4.0);
    assertEquals_float(5.0, vec1.norm());

    /* sqNorm */
    vec1.set(1.0, 2.0);
    assertEquals_float(5.0, vec1.sqNorm());

    /* dist */
    vec1.set(-1.0, -2.0);
    vec2.set(2.0, -6.0);
    assertEquals_float(5.0, vec1.dist(vec2));

    /* sqDist */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 5.0);
    assertEquals_float(13.0, vec1.sqDist(vec2));

    /* dot */
    vec1.set(1.0, -2.0);
    vec2.set(3.0, 4.0);
    assertEquals_float(-5.0, vec1.dot(vec2));

    /* normalize */
    vec1.set(3.0, 4.0);
    assertEquals_object((new b9.Vector2D(3.0, 4.0)).div(5.0), vec1.normalize());

    /* rotate_float */
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(-2.0, 1.0), vec1.rotate_float(90.0));

    /* rotate_int */
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(-2.0, 1.0), vec1.rotate_int(90.0));

    /* lerp */
    vec1.set(1.0, 2.0);
    vec2.set(-1.0, -2.0);
    assertEquals_object(new b9.Vector2D(1.0, 2.0), vec1.lerp(vec2, -1.0));

    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(0.0, 0.0), vec1.lerp(vec2, 0.5));

    vec1.set(1.0, 2.0);
    assertEquals_object(vec2, vec1.lerp(vec2, 2.0));

    /* toLocal */
    var mat1 = new b9.Matrix2D(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(198.0, -99.0), vec1.toLocal(mat1));

    /* toGlobal */
    mat1 = new b9.Matrix2D(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    vec1.set(198.0, -99.0);
    assertEquals_object(new b9.Vector2D(1.0, 2.0), vec1.toGlobal(mat1));

    /* toLocal_noTrans */
    mat1 = new b9.Matrix2D(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    vec1.set(1.0, 2.0);
    assertEquals_object(new b9.Vector2D(-2.0, 1.0), vec1.toLocal_noTrans(mat1));

    /* toGlobal_noTrans */
    mat1 = new b9.Matrix2D(
            new b9.Vector2D(0.0, -1.0),
            new b9.Vector2D(1.0, 0.0),
            new b9.Vector2D(100.0, 200.0));
    vec1.set(-2.0, 1.0);
    assertEquals_object(new b9.Vector2D(1.0, 2.0), vec1.toGlobal_noTrans(mat1));

    /* equals */
    vec1.set(1.0, 2.0);
    vec2.set(vec1);
    assertTrue(vec1.equals(vec2));

    vec2.set(1.1, 2.0);
    assertFalse(vec1.equals(vec2));

    vec2.set(1.0, 2.1);
    assertFalse(vec1.equals(vec2));

    /* toString */
    assertEquals("(1, 2)", (new b9.Vector2D(1.0, 2.0)).toString());

    /* ZERO */
    assertEquals_object(new b9.Vector2D(0.0, 0.0), b9.Vector2D.ZERO);

    /* X_UNIT */
    assertEquals_object(new b9.Vector2D(1.0, 0.0), b9.Vector2D.X_UNIT);

    /* Y_UNIT */
    assertEquals_object(new b9.Vector2D(0.0, 1.0), b9.Vector2D.Y_UNIT);
}
