import { styles } from '@/app/styles/style';
import { useChangePasswordMutation } from '@/redux/features/user/userApi';
import { ChangeEvent, FC, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useMutation from '../../hooks/useMutation';
import toast from 'react-hot-toast';


type Props = {
    // user: any,
    // avatar: string | null
}


const ChangePassword: FC<Props> = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    // Update Profile Picture Api
    const { actionApi: UpdateAvatar, result } = useMutation({
        api: useChangePasswordMutation,
        successMsg: "Avatar Updated Sucessfully"
    })


    const handleSubmit = (e: any) => {
        e.preventDefault()
        if( Object.values(passwordFields).includes("")){
            toast.error("Please fill all fields")
        }
        console.log("password")

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setPasswordFields({
            ...passwordFields, [name]: value
        })
    }

    return (
        <div className='w-full flex items-center justify-center flex-col'>

            <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-[400px]'>
                <div className='relative my-2'>
                    <label htmlFor="oldPassword" className={`${styles.label}`}>Old Password: </label>
                    <input type={showPassword ? "text" : "password"} className={`${styles.input}`} value={passwordFields.oldPassword} name='oldPassword' id='oldPassword' onChange={handleChange} />
                    {
                        !showPassword ? <AiOutlineEye className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(true)} /> : <AiOutlineEyeInvisible className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(false)} />
                    }
                </div>
                <div className='relative my-2'>
                    <label htmlFor="newPassword" className={`${styles.label}`}>New Password: </label>
                    <input type={showPassword ? "text" : "password"} className={`${styles.input}`} value={passwordFields.newPassword} name='newPassword' id='newPassword' onChange={handleChange} />
                    {passwordFields.newPassword.length <= 8 && <span className='text-red-500 pt-2 block'>Password must be at least 8 Characters</span>}
                    {
                        !showPassword ? <AiOutlineEye className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(true)} /> : <AiOutlineEyeInvisible className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(false)} />
                    }
                </div>
                <div className='relative my-2'>
                    <label htmlFor="confirmPassword" className={`${styles.label}`}>Confirm Password: </label>
                    <input type={showPassword ? "text" : "password"} className={`${styles.input}`} value={passwordFields.confirmPassword} name='confirmPassword' id='confirmPassword' onChange={handleChange} />
                    {
                        !showPassword ? <AiOutlineEye className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(true)} /> : <AiOutlineEyeInvisible className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShowPassword(false)} />
                    }
                </div>
                <button className='w-full 800px:w-[130px] py-2 my-3 border-2 border-[--t-blue] hover:opacity-80'>{result.isLoading ? "Updating" : "Update"}</button>
            </form>
        </div>
    )
}

export default ChangePassword