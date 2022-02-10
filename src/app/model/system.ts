export class System{
    floor?:number;
parkingSpace!:number;
constructor(floors:number,slots:number){
    this.floor=floors;
    this.parkingSpace=slots;
}
}