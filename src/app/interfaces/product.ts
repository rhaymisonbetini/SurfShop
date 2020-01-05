import { User } from './user';

export interface Product {
    id?: string;
    name?: string;
    description?: string;
    picture?: string;
    price?: string;
    created_at?: string;
    user_id?: User;
}
