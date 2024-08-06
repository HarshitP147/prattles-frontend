import { useEffect, useRef } from "react";

const usePrevious = (value: any) => {
    const previousRef = useRef();

    useEffect(() => {
        previousRef.current = value
    }, [value])

    return previousRef.current
}
export default usePrevious;