import { useState } from "react"


const useToggle = (defaultValue)=>{
    const [value,setValue] = useState(defaultValue)

    const toggleValue = (value)=>{
        setValue(( typeof(value) === 'boolean' )? value : !value)
    }

    return [value , toggleValue]
}

export default useToggle
