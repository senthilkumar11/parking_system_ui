export class NewEntry{
    private customerName!:string;
    private parkingType!:string;
    private vehicleRegistrationNumber!:string;
    private phNumber!:string;
    private vehicleType!:number;
    constructor(customerName:string,
        parkingType:string,
        vehicleRegistrationNumber:string,
        phNumber:string,
        vehicleType:number,){
            this.customerName=customerName;
            this.parkingType=parkingType;
            this.phNumber=phNumber;
            this.vehicleRegistrationNumber=vehicleRegistrationNumber;
            this.vehicleType=vehicleType;
        }
}