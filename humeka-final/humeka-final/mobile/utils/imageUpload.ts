import axios from 'axios'
import { errorToast } from './toast'


const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
const cloudinaryName = process.env.EXPO_PUBLIC_CLOUDINARY_NAME as string


export const useUploadImage = async(file:File|any, setImageProgress:React.Dispatch<React.SetStateAction<number|null>>, setImageLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
   
    try {
        setImageLoading(true)
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    if(progressEvent.total){
                        const percentCompleted = Math.round(
                            (progressEvent.loaded  / progressEvent.total ) * 100
                        );
                        setImageProgress(percentCompleted);
                    }
                },
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        setImageLoading(false)

        return {url: response.data.secure_url}
    } catch (error) {
        setImageLoading(false)
        console.error("Upload Error:", error);
        errorToast("Failed to upload image");
        return {url:''}
    }
}