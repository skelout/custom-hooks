export const todoReducer = (initialState = [], action) => {
    switch (action.type) {
        case '[TODO] Add Todo':
            return [ ...initialState,  action.payload,];   
                // Siempre hay que devolver un state. A veces el state será
                // un objeto, otras veces un booleano, etc. En este caso es
                // un array
        case '[TODO] Delete Todo':
            return initialState.filter(todo => todo.id !== action.payload);
            // Lo que viene por argumento sería: 
            // {type: '[TODO] Remote Todo', payload: puede ser solo el id o
            //  puede ser todo el todo, pero tiene que ser una solucion 
            // unica siempre}
            // NOTA: A diferencia de unshift o de push, que son métodos que
            // MUTAN el arreglo, el método filter devuelve un arreglo nuevo
            // que es lo que me interesa para que se cumplan las condiciones
            // del reducer.
            case '[TODO] Complete Todo':
            // ¿Cómo haría el tachado? Pues tengo que recorrer todo el estado
            // actual (o anterior) y ver cuando el id coincide con el id
            // que viene del evento focus del span. Cuando coincidan, le pongo
            // la propiedad done a false o true, según estuviera.
                return initialState.map( todo => {
                    if (todo.id === action.payload){
                        return {
                            ...todo,
                            done: !todo.done,
                        }
                    }
                    return todo;
                });
        default:
            return initialState;
    }
}