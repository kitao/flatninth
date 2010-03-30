b9.Vector3 = function(vec3) {
    if (vector3) {
        this.x = vector3.x;
        this.y = vector3.y;
        this.z = vector3.z;
    } else {
        this.x = this.y = this.z = 0.0;
    }
};

b9.Vector3.prototype.set = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

b9.Vector3.prototype.add = function(
