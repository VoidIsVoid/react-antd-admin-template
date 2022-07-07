import React from "react";
import {createRoot} from 'react-dom/client';
import App from "./App";
import "antd/dist/antd.less";
import "@/styles/index.less";
import "./mock";
import '@/lib/monitor';

const root = createRoot(document.getElementById("root"))
root.render(<App/>)
