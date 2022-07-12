import { useLayoutEffect, useState } from "react";

export function useBreakpoint(breakpoint) {
    const [isBreakpoint, setIsBreakpoint] = useState(document.body.clientWidth >= breakpoint);

    const updateWidth = () => {
        let newValue = document.body.clientWidth >= breakpoint;
        if( newValue !== isBreakpoint )
            setIsBreakpoint(newValue);
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    });

    return isBreakpoint;
}