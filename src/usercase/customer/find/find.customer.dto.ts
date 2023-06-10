export interface InputFindCustomerDto {
    id: string;
}

export interface OutpuFindCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    }
}