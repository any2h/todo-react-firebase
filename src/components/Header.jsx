import { useState } from "react";
import { nanoid } from "nanoid";
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useForm } from "react-hook-form";
// import dayjs from 'dayjs'
import styled from 'styled-components'

const StyledHeader = styled.header`
    h1 {
        margin-block: 1rem;
        text-align: center;
    }
`

const Header = ({ addTask }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            text: '',
            // date: '',
            // date: dayjs().format('YYYY-MM-DDTHH:mm'),
        }
    })
    const [file, setFile] = useState('')
    console.log(file);

    const onSubmit = (data) => {
        console.log(data)
        // const { title, text } = data
        // const newTask = { id: nanoid(), title, text, date, completed: false, fileURL }
        // if (!data.title || !data.text) return 

        !file 

        const uploadFile = async () => {
            try {
                const storageRef = ref(storage, data.title)
                const uploadTask = uploadBytesResumable(storageRef, file)
    
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log('Upload is ' + progress + '% done');
                        // switch (snapshot.state) {
                        //     case 'paused':
                        //         console.log('Upload is paused');
                        //         break;
                        //     case 'running':
                        //         console.log('Upload is running');
                        //         break;
                        // }
                    },
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            // setFormData({...formData, fileURL: downloadURL})
                            addTask({ id: nanoid(), ...data, completed: false, fileURL: downloadURL })
                        });
                    }
                );
    
            } catch (error) {
                console.log(error);
            }
        }
        uploadFile()
        // addTask({ id: nanoid(), ...formData})
        reset()
    }

    return (
        <StyledHeader>
            <h1>T O D O S</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        type="text" 
                        name='title' 
                        {...register('title', { required: true })}
                    />
                    <input 
                        type="text" 
                        name='text' 
                        {...register('text', { required: true })}
                    />
                </div>
                <div>
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
                </div>
                <input type='submit' />
            </form>
        </StyledHeader>
    )
}

export default Header
