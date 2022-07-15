import React from "react";

export const useDebounce = (value: string, delay = 300) => {
    const [debounced, setDebounced] = React.useState(value)

    React.useEffect(() => {
        const index = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(index)
    }, [value, delay])

    return debounced
}