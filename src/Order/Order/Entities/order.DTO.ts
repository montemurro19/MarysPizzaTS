export interface createOrderDTO {
    userId: string;
    addressId: string;
    items: {
        amount: number;
        itemId: string;
    }[];
    notes?: string;
    paymentMethod: string;
}
export interface updateOrderDTO {
    items?: {
        amount: number;
        itemId: string;
    }[];
    notes?: string;
    status?: string;
    paymentMethod?: string;
    rating?: number;
}
