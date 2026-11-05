type User = {
  email: string;
  password: string;
  name: string;
  role: string;
  other: string;
};
const users: User[] = [
  {
    email: "admin@company.com",
    password: "pass",
    name: "นายสมชาย ใจดี",
    role: "admin",
    other: "...",
  },
  {
    email: "user@company.com",
    password: "pass",
    name: "น.ส.สมหญิง ใจดี",
    role: "user",
    other: "...",
  },
  {
    email: "manager@company.com",
    password: "pass",
    name: "นายสมปอง ใจดี",
    role: "manager",
    other: "...",
  },
];

export type Credential = {
  token: string;
  email: string;
  name: string;
  role: string;
  other: string;
};

export const login = (email: string, password: string): Promise<Credential|string> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() <= 0.8) {
          const user = users.find(
            (u) => u.email === email && u.password === password,
          );
          if (user === undefined) {
            reject("User not found");
            return;
          }
          const credential: Credential = {
            token: crypto.randomUUID(),
            email: user.email,
            name: user.name,
            role: user.role,
            other: user.other,
          };
          resolve(credential);
        } else {
          reject("connection refused");
        }
      },
      1000 + Math.random() * 2000,
    );
  });
};
export const logout = (token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                if (Math.random() <= 0.8) {
                    resolve("success");
                } else {
                    reject("connection refused");
                }
            }, 1000 + Math.random() * 2000,
        )})
}