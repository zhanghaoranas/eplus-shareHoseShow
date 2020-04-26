import React from "react";
import Style from "./componentStyle/tag.module.css";

const Tag = (props) => <span className={Style.tag_box}>{props.text}</span>;

export default Tag;
