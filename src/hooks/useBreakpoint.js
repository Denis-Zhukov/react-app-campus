import { useLayoutEffect, useState } from "react";

export function useBreakpoint(breakpoint) {
    const [isBreakpoint, setIsBreakpoint] = useState(window.innerWidth >= breakpoint);

    const updateWidth = () => {
        let newValue = window.innerWidth >= breakpoint;
        if( newValue !== isBreakpoint )
            setIsBreakpoint(newValue);
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    });

    return isBreakpoint;
}