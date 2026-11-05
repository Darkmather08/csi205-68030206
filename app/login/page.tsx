"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/tailgrids/core/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/tailgrids/core/input-group";

import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { login } from "@/data/credential";
import { Eye, EyeDisabled, Keyboard } from "@tailgrids/icons";

export default function DialogPreview() {
  const router = useRouter();
  const handleLogin = () => {
    const userDom = document.getElementById("user") as HTMLInputElement;
    const passwordDom = document.getElementById("password") as HTMLInputElement;
    const user = userDom.value.trim();
    const password = passwordDom.value.trim();
    if (user === "") {
      userDom.focus();
      alert("Error: user is required");
      return;
    }
    if (password === "") {
      passwordDom.focus();
      alert("Error: password is required");
      return;
    }
    login(`${user}@company.com`, password)
      .then((Credential) => {
        localStorage.setItem("credential", JSON.stringify(Credential));
        const returnPath = localStorage.getItem("returnPath") || "/";
        localStorage.removeItem("returnPath");
        router.replace(returnPath);
        router.refresh();
      })
      .catch((error) => {
        userDom.value = "";
        passwordDom.value = "";
        userDom.focus();
        alert(`Error: ${error}`);
      });
  };
  return (
    <Backdrop isOpen={true}>
      <Dialog showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Who are you?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Keyboard />
            </InputGroupAddon>
            <InputGroupInput id="user" placeholder="user | admin | manager" />
            <InputGroupAddon align="inline-end">@company.com</InputGroupAddon>
          </InputGroup>
          <InputGroup className="mt-2">
            <InputGroupAddon>
              <EyeDisabled />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="password"
            />
          </InputGroup>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <DialogClose appearance="outline" onClick={() => handleLogin()}>
              Login
            </DialogClose>
          </div>
        </DialogFooter>
      </Dialog>
    </Backdrop>
  );
}
