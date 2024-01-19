import React from "react";
import {useCollapse} from "react-collapsed";

import { Header } from "./elements";
const Collapse = ({ header, children }) => {
    const { getToggleProps, getCollapseProps } = useCollapse();
    return (
        <>
            <Header {...getToggleProps()}>{header}  <span style={{fontSize: "10rem", top: "1.6rem", position: "relative"}}>&rsaquo;</span> </Header>
            <div {...getCollapseProps()}>
                {children}
            </div>
        </>
    )

}   

export default Collapse;