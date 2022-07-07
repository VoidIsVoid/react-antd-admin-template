import loadable from "@loadable/component";
import React from "react";

const Icon = React.forwardRef((props, _) => {
    const icon = loadable(({type}) =>
        import(`@ant-design/icons/es/icons/${type}.js`)
            .catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`))
    )
    return React.createElement(
        icon,
        props
    )
})

export default Icon;
