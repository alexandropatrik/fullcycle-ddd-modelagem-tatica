import Entity from "../../_shared/entity/entity.abstract";
import NotificationError from "../../_shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErros()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
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