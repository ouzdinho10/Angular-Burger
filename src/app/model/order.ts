// order.ts
import { User } from '../model/user';
import { Burger } from '../model/burger';
export interface Order {
  id: number;
  clientId: number;
  burgerId: number;
  status: string; // Par exemple: 'en cours', 'complété', 'annulé'
  amount:number;
  // Ajoutez d'autres propriétés selon vos besoins
  user?: User;
    burger?: Burger;
}
