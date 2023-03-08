// NOTA: PARA HACER LOS DATOS PERSISTENTES, TENGO LA OPCIÓN DE ALMACENARLO
// EN LOCAL STORAGE O EN COOKIES. LAS COOKIES GRABAN MENOS INFORMACIÓN Y
// ADEMÁS CUANDO HACEMOS UN REQUEST, VIAJAN NORMALMENTE. TAMBIÉN LAS COOKIES
// LLEGAN EN EL MOMENTO EN EL QUE EL SERVIDOR VA A PROCESAR LA PETICIÓN.
// EL LOCALSTORAGE NUNCA SALE DEL PC, A NO SER QUE EXPLÍCITAMENTE LO INDIQUE
// Y SE LO MANDE A ALGUNA PETICIÓN HTTP (POST, GET, ETC)

import { useEffect, useReducer } from "react";
import {todoReducer} from '../08-useReducer/todoReducer'
const initialState = [];

const init = () => {
  // Intenta obtener de localStorage los elementos, si son nulos, devuelve nulo
  return JSON.parse(localStorage.getItem("state")) || [];
};

export const useTodos = () => {
    // Nota: porque no pongo todoReducer()? Porque le tengo que pasar la referencia de la función
  // pero no ejecutarla. Se ejecutará cuando useReducer considere.
  const [state, dispatch] = useReducer(todoReducer, initialState, init);

  // Para la persistencia de datos, necesito ejecutar algo cada vez que el STATE cambie
  // Recordatorio del effect: cada vez que cambie [state], se ejecuta lo que hay dentro
  // El return del snippet lo quito porque eso es para limpieza de datos
  useEffect(() => {
    console.log("Use effect ejecutado");
    // Importante, en el local storage se graban unicamente strings, no puedo grabar objetos
    // Tengo que serializarlos
    localStorage.setItem("state", JSON.stringify(state));
    // La cosa es, ¿cómo le digo ahora al useReducer que inicialice si al principio no hay valores
    // que inicializar. Para eso se usa el tercer argumento que acepta el useReducer
  }, [state]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Delete Todo",
      payload: id,
    });
  };

  const onToggleTodo = (id) => {
    // console.log(id)
    dispatch({
      type: "[TODO] Complete Todo",
      payload: id,
    });
  };
  const todosCount = () => {
    return state.length;
  }

  const pendingCounts = () => {
    return state.filter(todo => !todo.done).length;
  }

  return{
    state,
    todosCount,
    pendingCounts,
    handleNewTodo,
    handleDeleteTodo,
    onToggleTodo,
  }
}