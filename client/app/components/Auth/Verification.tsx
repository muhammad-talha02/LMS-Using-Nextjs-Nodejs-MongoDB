import { styles } from '@/app/styles/style'
import { useActivationMutation } from '@/redux/features/auth/authApi'
import React, { FC, useEffect, useRef, useState } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
type Props = {
    setRoute: (route: string) => void
}

type VerifyNumber = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}
const Verification: FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth)
    const [activateUser, result] = useActivationMutation()
    const [invalidError, setInvalidError] = useState<boolean>(false);


    // Success or Error Message
    useEffect(() => {
        if (result.isSuccess) {
            toast.success("Acount activated successfully")
            setRoute("Login")
        }
        if (result.error) {
            const errorData = result.error as any
            console.log(result)
            setInvalidError(true)
            toast.error(`Error: ${errorData?.data.message}`)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isSuccess, result.isError])

    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]

    const [VerifyNumber, setVerifyNumber] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
    })

    console.log("vVerify Nukmber", VerifyNumber)

    const verificationHandler = async () => {
        const verificationCode = Object.values(VerifyNumber).join("");

        if (verificationCode.length !== 4) {

            setInvalidError(true)
            toast.error("Invalid Activation Code")
            return
        }
        await activateUser({ activation_token: token, activation_code: verificationCode })
    }
    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)

        const newVerifyNumber = { ...VerifyNumber, [index]: value }
        setVerifyNumber(newVerifyNumber)
        if (value === '' && index > 0) {
            inputRef[index - 1]?.current?.focus()
        }
        else if (value.length === 1 && index < 3) {
            inputRef[index + 1]?.current?.focus()
        }
    }
    return (
        <div>
            <h1 className={`${styles.title}`}>
                Verify Your Account
            </h1> <br />
            <div className="w-full flex items-center justify-center mt-2">
                <div className="h-[60px] w-[60px] rounded-full bg-[--t-blue] flex items-center justify-center">
                    <VscWorkspaceTrusted size={35} />
                </div>
            </div>
            <br /><br />
            <div className="m-auto flex items-center justify-around">
                {
                    Object.keys(VerifyNumber).map((key, index) => {
                        return <input type="number" key={key} ref={inputRef[index]}
                            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex justify-around items-center text-black dark:text-white text-[18px] font-Poppins outline-none text-center ${invalidError ? "shake border-red-500" : "border-[#000] dark:border-white"}`}
                            maxLength={1}
                            value={VerifyNumber[key as keyof VerifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    })
                }
            </div>
            <br />
            <br />
            <div className="w-full flex justify-center">
                <button className={`${styles.button}`} onClick={verificationHandler}>Verify OTP</button>
            </div>
            <br />
            <h5 className='text-black dark:text-white text-center pt-4 font-Poppins text-[14px]'>
                Go back to Login?
                <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("Login")}>Sign in</span>
            </h5>
        </div>
    )
}

export default Verification