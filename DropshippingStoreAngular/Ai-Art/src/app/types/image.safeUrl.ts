import { SafeUrl } from "@angular/platform-browser";

export interface ImageSafeUrl{
    id: string,
    description: string,
    category: string | number,
    userId: string,
    price: number,
    stock: boolean,
    imageUrl: SafeUrl | string,
    createdAt: Date,
    boughtByUserId: string | null,
    soldByUserId: string | null
}
