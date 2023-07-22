export interface CreateAddressDTO {
    userId: string;
    title: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    landmark: string;
}
export interface UpdateAddressDTO {
    title?: string;
    cep?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    landmark?: string;
}
