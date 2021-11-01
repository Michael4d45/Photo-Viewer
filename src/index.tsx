import ReactDOM from "react-dom"
import React from "react"
import App from "./components/App"

// 'app' is found in 'index.html' as `<div id="app"></div>`
const app = document.getElementById('app') as HTMLDivElement

// Render the component in the 'app' element.
ReactDOM.render(
    <App />,
    app
)