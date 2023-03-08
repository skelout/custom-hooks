import { useEffect, useState } from "react";

export const useFetch = ( url ) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    })
    const getFetch = async () => {

        setState({
            ...state,
            isLoading: true,
        });

        const resp = await fetch(url);
        const data = await resp.json();

        setState({
            // data: data //Pero mas elegante tal que:
            data,
            isLoading: false,
            hasError: null,
        });
    }
    // Recordar que el useEffect no puede recibir una promesa
    useEffect(() => {
        getFetch();
    }, [url]);
    
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };
}
