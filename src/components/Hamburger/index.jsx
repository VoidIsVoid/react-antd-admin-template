import React from "react";
import {connect} from "react-redux";
import Icon from '@/components/DynamicIcon'
import {toggleSiderBar} from "@/store/actions";
import "./index.less";

const Hamburger = (props) => {
    const {sidebarCollapsed, toggleSiderBar} = props;
    return (
        <div className="hamburger-container">
            <Icon
                type={sidebarCollapsed ? "MenuUnfoldOutlined" : "MenuFoldOutlined"}
                onClick={toggleSiderBar}
            />
        </div>
    );
};

export default connect((state) => state.app, {toggleSiderBar})(Hamburger);
