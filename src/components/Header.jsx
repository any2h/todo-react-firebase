import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs'
import styled from 'styled-components'

const StyledHeader = styled.header`

`

const Header = ({ addTask }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            text: '',
            date: '',
            // file: null
            // date: dayjs().format('YYYY-MM-DDTHH:mm'),
        }
    })

    return (
        <StyledHeader>
            <h1>T O D O S</h1>
            <form onSubmit={handleSubmit(data => {
                // console.log(data)
                const { title, text, date, file } = data
                addTask({ id: nanoid(), title, text, date, completed: false })
                reset()
            })}>
                <div>
                    <input 
                        type="text"
                        {...register('title', { required: true })}
                    />
                    <input 
                        type="text"
                        {...register('text', { required: true })}
                    />
                </div>
                <div>
                    <input type="datetime-local" {...register('date')} />
                    {/* <input type="time" {...register('time')} /> */}
                    <input type="file" {...register('file')} />
                </div>
                <input type='submit' />
            </form>
        </StyledHeader>
    )
}

export default Header
