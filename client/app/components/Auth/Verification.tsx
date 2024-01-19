import { styles } from '@/app/styles/style'
import React, { FC, useRef, useState } from 'react'
import { Toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
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
    const [invalidError, setInvalidError] = useState<boolean>(true);

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

    const verificationHandler = async () => {
        console.log("Verified")
    }
    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)

        const newVerifyNumber = { ...VerifyNumber, [index]: value }
        setVerifyNumber(newVerifyNumber)
        if (value === '' && index < 0) {
            inputRef[index - 2].current?.focus()
        }
        else if (value.length === 1 && index < 3) {
            inputRef[index - 1].current?.focus()
        }
    }
    return (
        <div>
            <h1 className={`${styles.title}`}>
                Verify Your Account
            </h1> <br />
            <div className="w-full items-center justify-center mt-2">
                <div className="h-[80px] w-[80px] rounded-full bg-[--t-blue] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <br /><br />
            <div className="110px:w-[70%] m-auto flex items-center justify-around">
                {
                    Object.keys(VerifyNumber).map((key, index) => {
                        return <input type="text" key={key} ref={inputRef[index]}
                            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounde-[10px] flex justify-centr items-center text-black dark:text-white text-[18px] font-Poppins outline-none text-center ${invalidError ? "shake border-red-500" : "border-[#000] dark:border-white"}`}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Verification