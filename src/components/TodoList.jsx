import { useState, useEffect } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'
import Todo from "./Todo"

const StyledList = styled.section`
    margin-top: 2rem;
    
    ul > *+* {
        margin-top: 1rem;
    }
`

const TodoList = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'))
        
        onSnapshot(q, querySnapshot => {
            const todosArr = []
            querySnapshot.forEach(doc => {
                todosArr.push(doc.data())
            })
            setTodos(todosArr)
        }, (error) => {
            console.log(error);
        })
    }, [])

    return (
        <StyledList>
            <ul>
                {todos.map(todo => 
                    <Todo 
                        key={todo.id} 
                        {...todo} 
                    />
                )}
            </ul>
        </StyledList>
    )
}

export default TodoList
