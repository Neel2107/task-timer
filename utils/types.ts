export type Task = {
    id: string;
    room: TaskRoom;
    title: string;
    created_at: string; 
    starts_at: string; 
    starts_in: {
      seconds: number;
      minutes: number;
      hours: number;
      days: number;
    };
  };
  
  export type TaskRoom = {
    id: string;
    name: string;
    created_at: string; 
  };
  