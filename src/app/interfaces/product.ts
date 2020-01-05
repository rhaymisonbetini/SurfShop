import { User } from './user';

export interface Product {
    id?: number;
    name?: string;
    description?: string;
    picture?: string;
    price?: string;
    created_at?: string;
    user_id?: User;
}
