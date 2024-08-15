export class User {
  id: number = 0; // Ajoutez ceci si vous utilisez l'ID dans vos opérations
  nom: string = '';
  prenom: string = '';
  tel: string = '';
  ville: string = '';
  email: string = '';
  role: string = 'client'; // Ajoutez ceci pour correspondre au champ `role`
  password: string = '';
  password_confirmation: string = '';
}
