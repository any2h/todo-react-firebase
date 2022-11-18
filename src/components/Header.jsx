import { useForm } from "react-hook-form";
import styled from 'styled-components'

const StyledHeader = styled.header`

`

const Header = () => {
    const { register, handleSubmit } = useForm()

    return (
        <StyledHeader>
            <h1>T O D O S</h1>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
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
                    <input type="date" {...register('date')} />
                    <input type="time" {...register('time')} />
                    <input type="file" {...register('file')} />
                </div>
                <input type='submit' />
            </form>
        </StyledHeader>
    )
}

export default Header
