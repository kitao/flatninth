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

function testVector3D() {
    var vec1, vec2, vec3, vec4;
    var array;
    var mat;

    /* initialize */
    /* getX */
    /* getY */
    /* getZ */
    /* getArray */
    /* getIndex */
    vec1 = new b9.Vector3D();

    array = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
    vec2 = new b9.Vector3D(array, 3);
    assertTrue(vec2.getX() === 4.0 && vec2.getY() === 5.0 && vec2.getZ() === 6.0);
    assertTrue(vec2.getArray() === array && vec2.getIndex() === 3);

    vec3 = new b9.Vector3D(1.0, 2.0, 3.0);
    assertTrue(vec3.getX() === 1.0 && vec3.getY() === 2.0 && vec3.getZ() === 3.0);

    vec4 = new b9.Vector3D(vec2);
    assertTrue(vec4.getX() === 4.0 && vec4.getY() === 5.0 && vec4.getZ() === 6.0);

    /* setX */
    assertEquals(10.0, vec1.setX(10.0).getX());

    /* setY */
    assertEquals(20.0, vec1.setY(20.0).getY());

    /* setZ */
    assertEquals(30.0, vec1.setZ(30.0).getZ());

    /* set */
    assertEquals_object(new b9.Vector3D(3.0, 4.0, 5.0), vec1.set(3.0, 4.0, 5.0));
    assertEquals_object(vec1, vec2.set(vec1));

    /* neg */
    vec1.set(10.0, -20.0, 30.0);
    assertEquals_object(new b9.Vector3D(-10.0, 20.0, -30.0), vec1.neg());

    /* add */
    vec1.set(1.0, 2.0, 3.0);
    vec2.set(4.0, 5.0, 6.0);
    assertEquals_object(new b9.Vector3D(5.0, 7.0, 9.0), vec1.add(vec2));

    /* sub */
    vec1.set(2.0, 3.0, 4.0);
    vec2.set(3.0, 5.0, 7.0);
    assertEquals_object(new b9.Vector3D(-1.0, -2.0, -3.0), vec1.sub(vec2));

    /* mul */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(10.0, 20.0, 30.0), vec1.mul(10.0));

    /* div */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(0.1, 0.2, 0.3), vec1.div(10.0));

    /* norm */
    vec1.set(-3.0, -4.0, -12.0);
    assertEquals_float(13.0, vec1.norm());

    /* sqNorm */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_float(14.0, vec1.sqNorm());

    /* dist */
    vec1.set(-1.0, -2.0, 3.0);
    vec2.set(2.0, -6.0, 15.0);
    assertEquals_float(13.0, vec1.dist(vec2));

    /* sqDist */
    vec1.set(1.0, 2.0, 3.0);
    vec2.set(3.0, 5.0, 7.0);
    assertEquals_float(29.0, vec1.sqDist(vec2));

    /* dot */
    vec1.set(1.0, -2.0, 3.0);
    vec2.set(3.0, 4.0, 5.0);
    assertEquals_float(10.0, vec1.dot(vec2));

    /* cross */
    vec1.set(1.0, -2.0, 3.0);
    vec2.set(3.0, 4.0, 5.0);
    assertEquals_object(new b9.Vector3D(-22.0, 4.0, 10.0), vec1.cross(vec2));

    /* normalize */
    vec1.set(3.0, 4.0, 12.0);
    assertEquals_object((new b9.Vector3D(3.0, 4.0, 12.0)).div(13.0), vec1.normalize());

    vec1.set(0.0, 0.0, 0.0);
    assertEquals_object(new b9.Vector3D(1.0, 0.0, 0.0), vec1.normalize());

    /* rotateX_float */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(1.0, -3.0, 2.0), vec1.rotateX_float(90.0));

    /* rotateY_float */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(3.0, 2.0, -1.0), vec1.rotateY_float(90.0));

    /* rotateZ_float */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(-2.0, 1.0, 3.0), vec1.rotateZ_float(90.0));

    /* rotateX_int */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(1.0, -3.0, 2.0), vec1.rotateX_int(90.0));

    /* rotateY_int */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(3.0, 2.0, -1.0), vec1.rotateY_int(90.0));

    /* rotateZ_int */
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(-2.0, 1.0, 3.0), vec1.rotateZ_int(90.0));

    /* lerp */
    vec1.set(1.0, 2.0, 3.0);
    vec2.set(-1.0, -2.0, -3.0);
    assertEquals_object(new b9.Vector3D(1.0, 2.0, 3.0), vec1.lerp(vec2, -1.0));

    vec1.set(1.0, 2.0, 3.0);
    vec2.set(-1.0, -2.0, -3.0);
    assertEquals_object(new b9.Vector3D(0.0, 0.0, 0.0), vec1.lerp(vec2, 0.5));

    vec1.set(1.0, 2.0, 3.0);
    vec2.set(-1.0, -2.0, -3.0);
    assertEquals_object(vec2, vec1.lerp(vec2, 2.0));

    /* toLocal */
    mat = new b9.Matrix3D(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(297.0, 99.0, -198.0), vec1.toLocal(mat));

    /* toGlobal */
    mat = new b9.Matrix3D(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    vec1.set(297.0, 99.0, -198.0);
    assertEquals_object(new b9.Vector3D(1.0, 2.0, 3.0), vec1.toGlobal(mat));

    /* toLocal_noTrans */
    mat = new b9.Matrix3D(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    vec1.set(1.0, 2.0, 3.0);
    assertEquals_object(new b9.Vector3D(-3.0, -1.0, 2.0), vec1.toLocal_noTrans(mat));

    /* toGlobal_noTrans */
    mat = new b9.Matrix3D(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    vec1.set(-3.0, -1.0, 2.0);
    assertEquals_object(new b9.Vector3D(1.0, 2.0, 3.0), vec1.toGlobal_noTrans(mat));

    /* equals */
    vec1.set(1.0, 2.0, 3.0);
    vec2.set(vec1);
    assertTrue(vec1.equals(vec2));

    vec2.set(1.1, 2.0, 3.0);
    assertFalse(vec1.equals(vec2));

    vec2.set(1.0, 2.1, 3.0);
    assertFalse(vec1.equals(vec2));

    vec2.set(1.0, 2.0, 3.1);
    assertFalse(vec1.equals(vec2));

    /* toString */
    assertEquals("(1, 2, 3)", (new b9.Vector3D(1.0, 2.0, 3.0)).toString());

    /* ZERO */
    assertEquals_object(new b9.Vector3D(0.0, 0.0, 0.0), b9.Vector3D.ZERO);

    /* X_UNIT */
    assertEquals_object(new b9.Vector3D(1.0, 0.0, 0.0), b9.Vector3D.X_UNIT);

    /* Y_UNIT */
    assertEquals_object(new b9.Vector3D(0.0, 1.0, 0.0), b9.Vector3D.Y_UNIT);

    /* Z_UNIT */
    assertEquals_object(new b9.Vector3D(0.0, 0.0, 1.0), b9.Vector3D.Z_UNIT);
}
