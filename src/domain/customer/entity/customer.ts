import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    } 
    get name(): string {
        return this._name;
    } 
    get active(): boolean {
        return this._active;
    }
    get rewardPoints(): number {
        return this._rewardPoints;
    }
    get address(): Address {
        return this._address;
    }

    /*set id(id: string) {
        this._id = id;
    }
    set name(name: string) {
        this._name = name;
    }
    set address(address: string) {
        this._address = address;
    }*/

    set Address(address: Address) {
        this._address = address;
    }

    changeAddress(address : Address) {
        this._address = address;
    }

    activate() {
        if (this._address == null) {
            throw new Error("Address must be not null to activate customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

}