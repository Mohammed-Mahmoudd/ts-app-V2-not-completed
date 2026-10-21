export interface Request {
  id: number;
  requester: {
    id: number;
    name: string;
    role: "instructor" | "student";
    instrument: string;
    profilePicture?: string;
  };
  type: "reschedule" | "cancellation" | "extra-session";
  colors: {
    bg: string;
    text: string;
    border: string;
  };
  payload: {
    from: Date;
    to: Date;
    branch: string;
  };
}
