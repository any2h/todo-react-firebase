import { useState } from "react"
import { toggleTaskCompleted, updateTask, deleteTask, deleteFile, uploadFile } from "../firebase";
import styled from "styled-components"
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'

const StyledTodo = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: .5rem 1rem;
    background-color: ${props => props.expired ? 'rgba(221, 69, 108, 0.5)' : 'rgb(122, 125, 204)'};
    border-radius: 10px;
    opacity: ${props => props.completed ? '.5': '1'};

    > :nth-child(2) {
        width: 100%;
        overflow-wrap: break-word;
        text-decoration: ${props => props.completed ? 'line-through': ''};

        > p {
            font-size: 18px;
        }
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

    .date-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
    }
`

const Todo = ({ id, title, text, date, completed, fileURL }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title,
            text,
            date
        }
    })
    const [newFile, setNewFile] = useState(null)
    const isExpired = dayjs().isAfter(date);
    
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
            {date && 
                <div className="date-group">
                    <span>{dayjs(date).format('DD.MM.YY')}</span>
                    <span>{dayjs(date).format('HH:mm')}</span>
                    {isExpired && <span style={{color: 'pink'}}>expired</span>}
                </div>
            }
            {fileURL && <a href={fileURL} target='_blank'>File</a>}
            <div className="btn-group">
                <button onClick={() => setIsEditing(true)}><MdEdit size={18} /></button>
                <button 
                    onClick={fileURL ? 
                        () => { deleteTask(id); deleteFile(id) } : 
                        () => deleteTask(id)}
                >
                    <MdDelete size={18} />
                </button>
            </div>
        </>
    )

    const editingTemplate = (
        <form onSubmit={handleSubmit(data => {
            const updatedTask = { id, ...data }
            newFile ? uploadFile(newFile, updatedTask, updateTask) : updateTask(updatedTask)
            setIsEditing(false)
        })}>
            <input 
                type="text" 
                placeholder="Заголовок"
                {...register('title', { required: true })} 
            />
            <input 
                type="text" 
                placeholder="Текст"
                {...register('text', { required: true })} />
            <input type="datetime-local" {...register('date')} />
            <input type='file' onChange={(e) => setNewFile(e.target.files[0])} />
            <input type="submit" value='Save' />
        </form>
    )

    return (
        <StyledTodo 
            expired={isExpired}
            completed={completed}
        >
            {isEditing ? 
                editingTemplate : 
                viewingTemplate
            }
        </StyledTodo>
    )
}

export default Todo
