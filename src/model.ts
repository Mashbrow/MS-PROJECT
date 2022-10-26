interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    visible: boolean;
}
  
interface Player extends User {
  badges : [string];
  role: "player";
}

interface Admin extends User {
  role: "admin";
}

interface Reporter extends User {
  role: "reporter";
}

export { User, Player, Admin, Reporter }
  