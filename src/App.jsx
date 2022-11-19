import { useState } from 'react'
import { db, storage } from './firebase'
import { setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import GlobalStyle from './GlobalStyle'
import Container from './utils/Container'
import Header from './components/Header'
import TodoList from './components/TodoList'

function App() {
    const [count, setCount] = useState(0)

    const addTask = async (todo) => {
        try {
            await setDoc(doc(db, 'todos', todo.id), todo)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTaskCompleted = async (todo) => {
        try {
            await updateDoc(doc(db, 'todos', todo.id), {
                completed: !todo.completed
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async ({ id, ...todo}) => {
        try {
            await updateDoc(doc(db, 'todos', id), {
                ...todo
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'todos', id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
            <Container>
                <GlobalStyle />
                <Header 
                    addTask={addTask}
                />
                <TodoList 
                    toggleTaskCompleted={toggleTaskCompleted}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                 />
            </Container>
        </div>
    )
}

export default App
