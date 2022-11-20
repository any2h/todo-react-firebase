import { useState } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete } from 'react-icons/md'

const StyledTodo = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: .5rem 1rem;
    background-color: rgb(122, 125, 204);
    border-radius: 10px;

    > :nth-child(2) {
        width: 100%;
    }

    .btn-group {
        display: flex;
        gap: .5rem;

        button {
            cursor: pointer;
            border: 0;
            background: 0;

            &:hover {
                opacity: .5;
            }
        }
    }
`

const Todo = ({ id, title, text, date, completed, fileURL, toggleTaskCompleted, updateTask, deleteTask, deleteFile }) => {
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
            {fileURL && <a href={fileURL} target='_blank' download>File</a>}
            <div className="btn-group">
                <button onClick={() => setIsEditing(true)}><MdEdit size={18} /></button>
                <button onClick={() => { deleteTask(id); deleteFile(title) }}><MdDelete size={18} /></button>
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
