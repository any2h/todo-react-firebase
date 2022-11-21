import { useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { addTask, uploadFile } from "../firebase";
import styled from 'styled-components'

const StyledHeader = styled.header`
    h1 {
        margin-block: 1rem;
        text-align: center;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;

        > *+* {
            /* margin-top: 1rem; */
        }

        > :first-child {
            display: flex;
            gap: 1.5rem;

            input {
                text-indent: .5rem;
            }

            > :last-child {
                width: 100%;
            }
        }

        > :nth-child(2) {
            display: flex;
            justify-content: space-between;
        }
    }
`

const Header = () => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            text: '',
            date: '',
        }
    })
    const [file, setFile] = useState(null)

    const onSubmit = (data) => {
        const newTask = { id: nanoid(), ...data, completed: false, }

        file ? uploadFile(file, newTask, addTask) : addTask(newTask)
        setFile(null)
        reset()
    }

    return (
        <StyledHeader>
            <h1>T O D O S</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        name='title' 
                        placeholder="Заголовок"
                        {...register('title', { required: true })}
                    />
                    <input 
                        type="text" 
                        name='text' 
                        placeholder="Текст"
                        {...register('text', { required: true })}
                    />
                    <input 
                        type="datetime-local" 
                        name='date'
                        {...register('date')}
                    />
                    <input 
                        type="file" 
                        accept=".jpg, .png, .webp, .doc, .docx, .pdf, .txt" 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                <input type='submit' />
            </form>
        </StyledHeader>
    )
}

export default Header
