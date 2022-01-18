interface User {
  id: string;
  name: string;
  occupation: string | null;
  description: string | null;
  email: string;
  contact: string | null;
  photoURL: string | null;
}

export default User;
