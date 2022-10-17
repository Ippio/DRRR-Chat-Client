const { default: theme } = require("../theme")

const setTheme = ()=>{
    const index = Math.floor(Math.random()* theme.length)
    return theme[index]
}

export default setTheme