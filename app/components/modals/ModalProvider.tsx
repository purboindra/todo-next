"use client";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
