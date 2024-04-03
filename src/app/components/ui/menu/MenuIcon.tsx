"use client";
import React, { ReactNode, useState } from "react";
import "./MenuIcon.css";
import Modal from "../Modal";
import HeaderItem from "../headerItem";

function MenuIcon({ color }: { color?: string }) {
  const [isActive, setActive] = useState(false);
  const onMenuClick = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div
        className={`menu-icon-container ${isActive ? "active" : ""}`}
        onClick={onMenuClick}
      >
        <div
          className={`menu-line`}
          style={{ background: `${color || "#000"}` }}
        ></div>
        <div
          className={`menu-line`}
          style={{ background: `${color || "#000"}` }}
        ></div>
        <div
          className={`menu-line`}
          style={{ background: `${color || "#000"}` }}
        ></div>
      </div>
      <Modal isOpen={isActive} className="place-items-start">
        <div
          className="pt-16 animate-menu"
          onClick={() => {
            setActive(!isActive);
          }}
        >
          <div className="h-16 w-full bg-color-primary text-right">
            <HeaderItem href="/home">Generate</HeaderItem>
          </div>
          <div className="h-16 w-full bg-color-primary text-right">
            <HeaderItem href="/scan">Scan</HeaderItem>
          </div>
          <div className="h-16 w-full bg-color-primary text-right">
            <HeaderItem href="/history">History</HeaderItem>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MenuIcon;
