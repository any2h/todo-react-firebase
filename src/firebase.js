// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.API_KEY,
    authDomain: "todo-app-3b968.firebaseapp.com",
    projectId: "todo-app-3b968",
    storageBucket: "todo-app-3b968.appspot.com",
    messagingSenderId: "6911840069",
    appId: "1:6911840069:web:2221de50d54f8a260bb82c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage()

// Add new doc
export const addTask = async (todo) => {
    try {
        await setDoc(doc(db, 'todos', todo.id), {...todo, createdAt: serverTimestamp()})
    } catch (error) {
        console.log(error)
    }
}

// Mark task as completed
export const toggleTaskCompleted = async (todo) => {
    try {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    } catch (error) {
        console.log(error)
    }
}

// Update document
export const updateTask = async ({ id, ...todo }) => {
    try {
        await updateDoc(doc(db, 'todos', id), {
            ...todo
        })
    } catch (error) {
        console.log(error)
    }
}

// Delete document
export const deleteTask = async (id) => {
    try {
        await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
        console.log(error);
    }
}

// Upload file and Add doc with file url
export const uploadFile = async (file, task, callback) => {
    try {
        const fileRef = ref(storage, task.id)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    callback({...task, fileURL: downloadURL })
                });
            }
        );

    } catch (error) {
        console.log(error);
    }
}

// Delete file
export const deleteFile = async (id) => {
    try {
        const fileRef = ref(storage, id)
        await deleteObject(fileRef)
    } catch (error) {
        console.log(error)
    }
}
