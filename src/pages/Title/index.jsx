import React from "react";
import { title } from "./style.module.css";

function Title({ text }) {
  return <h1 className={title}>{text}</h1>;
}

export default Title;
