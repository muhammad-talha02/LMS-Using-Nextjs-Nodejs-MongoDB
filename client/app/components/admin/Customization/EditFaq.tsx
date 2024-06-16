import { H1 } from '@/app/TailwindComponents/Headings'
import useMutation from '@/app/_hooks/useMutation'
import { styles } from '@/app/styles/style'
import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi'
import { AddCircle, PlusOne } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'

type FAQProps = {
    item: any,
    index: number,
    handleRemoveFaq: () => void,
    handleQuestionFaq: (e: any, index: number) => void,
    handleAnswerFaq: (e: any, index: number) => void,
}

const FAQ: FC<FAQProps> = (props) => {
    const { item, handleRemoveFaq, handleQuestionFaq, handleAnswerFaq, index } = props
    const [toggleFaq, setToggleFaq] = useState(item.isActive || false)
    return (
        <>
            <div className="faqContent flex flex-col border-b-2 dark:border-white border-black">
                <div className="question flex justify-between mb-3">
                    <input type='text' name='question' onChange={(e) => handleQuestionFaq(e, index)} className={`${styles.input} max-w-[93%] border-none`} value={item.question} placeholder='Question' />

                    <div className='actionButtons flex items-center'>
                        <IconButton className='text-black dark:text-white' onClick={handleRemoveFaq}><AiOutlineDelete size={20} /></IconButton>
                        <IconButton className='text-black dark:text-white' onClick={() => setToggleFaq(!toggleFaq)}>
                            {
                                toggleFaq ?
                                    <FaMinus size={18} /> :
                                    <FaPlus size={18} />
                            }
                        </IconButton>
                    </div>
                </div>
                {/* {
                    toggleFaq && */}
                <div className={`answer ${toggleFaq ? "block opacity-100" : "hidden opacity-0"}`}>
                    {/* <div className={`answer`}> */}
                    <input type='text' name='answer' onChange={(e) => handleAnswerFaq(e, index)} value={item.answer} className={`${styles.input} max-w-[93%] border-none`} placeholder='Answer' />

                </div>
                {/* } */}
            </div>
        </>
    )
}

const EditFaq = () => {
    const [questions, setQuestions] = useState<any[]>([])
    //? GET FAQ Data API
    const { data: getFaqData, isLoading, isSuccess, refetch } = useGetLayoutQuery("FAQ", { refetchOnMountOrArgChange: true })

    //? Update Layout APi
    const { actionApi: updateBannerAction, result } = useMutation({
        api: useUpdateLayoutMutation,
        successMsg: "FAQ Updated Successfully",
        successFunc: () => {
            refetch()
        }
    })


    //? --Side Effect to Set Initial values
    useEffect(() => {
        if (getFaqData) {
            const faqs = getFaqData?.layout?.faq.map((item: any) => {
                const { _id, ...obj } = item
                return { ...obj, isActive: false }
            })
            setQuestions(faqs)
        }
    }, [getFaqData])

    //* Handle to Add FAQ
    const handleAddFaq = () => {
        const currenQuestion = [...questions]
        const updateQuestion = [...currenQuestion, { question: "", answer: "", isActive: true }]
        setQuestions(updateQuestion)
    }

    //* Handle to remove FAQ
    const handleRemoveFaq = (index: number) => {
        const currenQuestion = [...questions]
        currenQuestion.splice(index, 1)
        setQuestions(currenQuestion)
    }
    //* Handle to Change Question in FAQ
    const handleQuestionFaq = (e: any, index: number) => {
        const currentQuestion = [...questions]

        const updatedAnswer = [...currentQuestion];
        updatedAnswer[index].question = e.target.value;
        setQuestions(updatedAnswer);
    }

    //* Handle to Change Answer in FAQ
    const handleAnswerFaq = (e: any, index: number) => {
        const currentQuestion = [...questions]

        const updatedAnswer = [...currentQuestion];
        updatedAnswer[index].answer = e.target.value;
        setQuestions(updatedAnswer);

    }


    //? Is Any Question Empty

    const isQuestionEmpty = () => {
        return questions.some((item) => item.question === '' || item.answer === '')
    }

    //? Is Question Unchanged?
    const areQuestionUnchanged = () => {

        const oldQuestions = getFaqData?.layout?.faq.map(({ question, answer }: any) => ({ question, answer }))
        const newQuestions = questions.map(({ question, answer }: any) => ({ question, answer }))
        return JSON.stringify(oldQuestions) === JSON.stringify(newQuestions)
    }

    //? Handle Update Data
    const handleUpdateLayout = async () => {
        if (isQuestionEmpty()) {
            toast.error("Question Cannot be Empty")
            return
        }
        const faq = questions.map(({ question, answer }: any) => ({ question, answer }))
        const data = {
            type: "FAQ",
            faq
        }
        await updateBannerAction(data)
    }
    return (
        <div>
            <H1 classes='text-center my-5'>FAQs</H1>
            <Grid container m={"auto"}>

                <Grid item sm={12} lg={8} m={"auto"}>
                    <div className="faqs space-y-4">
                        {
                            questions?.map((item: any, index: number) => (
                                <FAQ
                                    key={index}
                                    item={item}
                                    index={index}
                                    handleRemoveFaq={() => handleRemoveFaq(index)}
                                    handleAnswerFaq={handleAnswerFaq}
                                    handleQuestionFaq={handleQuestionFaq}
                                />

                            ))
                        }


                    </div>
                <Grid item sm={12} mt={3}>
                    <AddCircle className='cursor-pointer' onClick={handleAddFaq} />
                </Grid>
                <Grid item sm={12} mt={3} display={"flex"} justifyContent={"flex-end"}>
                    <button className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 400px:w-[150px] h-[40px] disabled:cursor-not-allowed' disabled={result.isLoading || areQuestionUnchanged()} onClick={handleUpdateLayout}>Update</button>
                </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditFaq