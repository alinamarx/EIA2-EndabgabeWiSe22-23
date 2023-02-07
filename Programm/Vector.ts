class Vector {

    x: number;
    y: number;

    constructor (_x: number, _y: number) {
        this.set(_x, _y);
    }

    set(_x: number, _y: number): void {
        this.x = _x;
        this.y = _y;
    }
    
    scale (_factor: number): void {
        this.x *= _factor;
        this.y *= _factor;
    }

}