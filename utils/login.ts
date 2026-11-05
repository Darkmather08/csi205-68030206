import { Credential, logout } from "@/data/credential";
import error from "next/dist/api/error";
import { useRouter } from "next/navigation";
type Router = ReturnType<typeof useRouter>;

export const checkLogin = (router: Router, returnPath: string) => {
  localStorage.setItem("returnPath", returnPath);
  const credentailSting = localStorage.getItem("credential");
  if (credentailSting !== null) {
    const { token, email, name, role }: Credential =
      JSON.parse(credentailSting);
    if (
      token === undefined ||
      email === undefined ||
      name === undefined ||
      role === undefined
    ) {
      localStorage.removeItem("credential");
      router.replace(returnPath);
      router.refresh();
    } else {
      router.replace(returnPath);
      router.refresh();
    }
  } else {
    localStorage.removeItem("credential");
    router.replace("/login");
    router.refresh();
  }
};

export const doLogout = (router: Router, returnPath: string) => {
  const credentailSting = localStorage.getItem("credential");
  if (credentailSting !== null) {
    const { token }: Credential = JSON.parse(credentailSting);
    logout(token)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("credential");
        router.replace(returnPath);
        router.refresh();
      });
  } else {
    router.replace(returnPath);
    router.refresh();
  }
};
