import { styles } from '@/app/styles/style';
import { useChangePasswordMutation } from '@/redux/features/user/userApi';
import { ChangeEvent, FC, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useMutation from '../../_hooks/useMutation';
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
    const { actionApi: UpdatePassword, result } = useMutation({
        api: useChangePasswordMutation,
        successMsg: "Password Updated Sucessfully",
        successFunc: () => {
            setPasswordFields({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        }
    })


    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (Object.values(passwordFields).includes("")) {
            toast.error("Please fill all fields")
            return
        }
        if (passwordFields.newPassword === passwordFields.confirmPassword) {
            UpdatePassword({
                oldPassword: passwordFields.oldPassword,
                newPassword: passwordFields.newPassword,
            })
        }
        else {
            toast.error("Password must be same")

        }
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
                    <ShowPasswordIcon show={showPassword} setShow={setShowPassword} />

                </div>
                <div className='relative my-2'>
                    <label htmlFor="newPassword" className={`${styles.label}`}>New Password: </label>
                    <input type={showPassword ? "text" : "password"} className={`${styles.input}`} value={passwordFields.newPassword} name='newPassword' id='newPassword' minLength={6} onChange={handleChange} />
                    <span className={`${passwordFields.newPassword.length < 6 ? "text-red-500" : "text-black dark:text-white"} pt-1 block text-[12px]`}>Password must be at least 6 Characters</span>
                    <ShowPasswordIcon show={showPassword} setShow={setShowPassword} />

                </div>
                <div className='relative my-2'>
                    <label htmlFor="confirmPassword" className={`${styles.label}`}>Confirm Password: </label>
                    <input type={showPassword ? "text" : "password"} className={`${styles.input}`} value={passwordFields.confirmPassword} name='confirmPassword' id='confirmPassword' minLength={6} onChange={handleChange} />
                    <span className={`${passwordFields.confirmPassword.length < 6 ? "text-red-500" : "text-black dark:text-white"} pt-1 block text-[12px]`}>Password must be at least 6 Characters</span>
                    <ShowPasswordIcon show={showPassword} setShow={setShowPassword} />
                </div>
                <button className='w-full 800px:w-[130px] py-2 my-3 border-2 border-[--t-blue] hover:opacity-80'>{result.isLoading ? "Updating" : "Update"}</button>
            </form>
        </div>
    )
}

export default ChangePassword


// show & Hide Password

type ShowPasswordIconProps = {
    show: boolean,
    setShow: (show: boolean) => void
}

const ShowPasswordIcon = ({ show, setShow }: ShowPasswordIconProps) => {

    const iconStyle = "text-black dark:text-white absolute top-11 right-2 z-1 cursor-pointer"
    return (
        <>
            {
                !show ? <AiOutlineEye className={iconStyle} size={20} onClick={() => setShow(true)} /> : <AiOutlineEyeInvisible className={iconStyle} size={20} onClick={() => setShow(false)} />
            }
        </>
    )

}