import React from "react"

import SidebarWrapperProps from "./SidebarWrapperProps"


const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
    children,
}) => {
    return (
        <div>
            Sidebar
            <div>
                { children }
            </div>
        </div>
    )
}


export default SidebarWrapper
