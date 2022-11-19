import { useState, useEffect } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { query, collection, onSnapshot } from 'firebase/firestore'
import Todo from "./Todo"

const StyledList = styled.section`
    margin-top: 1rem;
    
    ul {
        > *+* {
            margin-top: 1rem;
        }
    }
`

const TodoList = ({ toggleTaskCompleted, updateTask, deleteTask }) => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'todos'))
        onSnapshot(q, querySnapshot => {
            let todosArr = []
            querySnapshot.forEach(doc => todosArr.push(doc.data()))
            setTodos(todosArr)
        })
    }, [])

    console.log(todos);

    return (
        <StyledList>
            <ul>
                {todos.map(todo => 
                    <Todo 
                        key={todo.id} 
                        {...todo} 
                        toggleTaskCompleted={toggleTaskCompleted}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                )}
            </ul>
        </StyledList>
    )
}

export default TodoList
