import { useState } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form";

const StyledTodo = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    padding-inline: 1rem;
    background-color: rgb(122, 125, 204);

    > :nth-child(2) {
        width: 100%;
    }

    > :nth-child(3) {
        display: flex;
        gap: .5rem;
    }
`

const Todo = ({ id, title, text, date, completed, toggleTaskCompleted, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title,
            text,
            date
        }
    })

    const viewingTemplate = (
        <>
            <input 
                type="checkbox" 
                checked={completed}
                onChange={() => toggleTaskCompleted({ id, completed })} 
            />
            <div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            <div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => deleteTask(id)}>Delete</button>
            </div>
        </>
    )

    const editingTemplate = (
        <form onSubmit={handleSubmit(data => {
            console.log(data)
            const { title, text } = data
            updateTask({ id, title, text })
            setIsEditing(false)
        })}>
            <input type="text" {...register('title', { required: true })} />
            <input type="text" {...register('text', { required: true })} />
            <input type="datetime-local" {...register('date')} />
            <input type="submit" value='Save' />
        </form>
    )

    return (
        <StyledTodo>
            {isEditing ? editingTemplate : viewingTemplate}
        </StyledTodo>
    )
}

export default Todo
