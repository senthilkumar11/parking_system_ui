export class NewEntry{
    private customerName!:string;
    private parkingType!:string;
    private vehicleRegistrationNumber!:string;
    private phNumber!:string;
    private vehicleType!:number;
    private fee!:number;
    constructor(customerName:string,
        parkingType:string,
        vehicleRegistrationNumber:string,
        phNumber:string,
        vehicleType:number,fee:number){
            this.customerName=customerName;
            this.parkingType=parkingType;
            this.phNumber=phNumber;
            this.vehicleRegistrationNumber=vehicleRegistrationNumber;
            this.vehicleType=vehicleType;
            this.fee=fee;
        }
}