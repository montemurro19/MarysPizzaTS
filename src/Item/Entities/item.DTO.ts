export interface CreateItemDTO {
    title: string;
    description: string;
    price: number;
    type: string;
}
export interface UpdateItemDTO {
    title?: string;
    description?: string;
    price?: number;
    type?: string;
}
