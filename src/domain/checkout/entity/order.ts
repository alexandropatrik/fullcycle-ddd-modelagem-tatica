import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor (id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("Customer ID is required");
        }
        if (this._items.length === 0) {
            throw new Error("No items found");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw Error("Quantity must be greater than zero");
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    addItem(newItem: OrderItem): void {
        this._items.push(newItem);
        this._total = this.total();
        this.validate();
    }
}