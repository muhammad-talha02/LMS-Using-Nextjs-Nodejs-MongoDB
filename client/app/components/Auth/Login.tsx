"use client"
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../../../app/styles/style'
import { useLoginMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
type Props = {
    setRoute: (route: string) => void,
    setOpen: (open: boolean) => void
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please enter your email"),
    password: Yup.string().required("Please enter password").min(6)
})

const Login: FC<Props> = ({ setRoute, setOpen }: Props) => {
    const [show, setShow] = useState(false);
    const [loginUser, result] = useLoginMutation()


    // Success or Error Message
    useEffect(() => {
        if (result.isSuccess) {
            const message = result.data?.message
            toast.success(message || "Login Successfully")
            setOpen(false)
        }
        if (result.error) {
            const errorData = result.error as any
            console.log(result)
            toast.error(`Error: ${errorData?.data.message}`)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isSuccess, result.isError])

    const formik = useFormik({
        initialValues: { email: "", password: '' },
        validationSchema: validationSchema,
        onSubmit: async ({ email, password }) => {
            const data = {
                email, password
            }
            await loginUser(data)
        }
    })


    const { errors, touched, values, handleChange, handleSubmit } = formik
    return (
        <div className='w-full text-black dark:text-white'>
            <h1 className={`${styles.title}`}>
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email' className={`${styles.label}`}>
                    Enter your email
                </label>
                <input type="text"

                    name='email'
                    id='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='john@mail.com'
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                />
                {
                    errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>
                }
                <div className='w-full mt-5  relative mb-1'>
                    <label htmlFor='password' className={`${styles.label}`}>
                        Enter your password
                    </label>
                    <input type={show ? "text" : "password"}

                        name='password'
                        id='password'
                        onChange={handleChange}
                        value={values.password}
                        placeholder='*********'
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
                    />
                    {
                        !show ? <AiOutlineEye className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShow(true)} /> : <AiOutlineEyeInvisible className='text-black dark:text-white absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShow(false)} />
                    }
                </div>
                {
                    errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>
                }
                <div className='w-full mt-5'>
                    <input type="submit" value="Login" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    or Join with
                </h5>
                <div className='flex justify-center items-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer mr-2' />
                    <AiFillGithub size={30} className='cursor-pointer ml-2' />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Not have any account?
                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("Sign-up")}>Sign Up</span>
                </h5>
            </form>
        </div>
    )
}

export default Login