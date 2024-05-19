import useMutation from '@/app/_hooks/useMutation'
import { styles } from '@/app/styles/style'
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'

type Props = {
    course: any
}

const CheckoutForm = ({ course }: Props) => {

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const { actionApi: createOrder, result } = useMutation({
        api: useCreateOrderMutation,
        successMsg:"Course Purchased Successfully",
        successFunc: () => {
            redirect(`/courses/course-access/${course?._id}`)
        }

    })
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })
        if (error) {
            setMessage(error?.message)
            setIsLoading(false)
        }
        else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false)
            setRedirecting(true)
            await createOrder({ courseId: course._id, paymentInfo: paymentIntent })
        }
    }
    return (
        <>
            <h1 className='text-center font-semibold mb-3 text-[22px]'>Compile Academy</h1>
            {
                redirecting ? <h2 className='!max-h-[50vh]'>Redirecting....</h2>: 
            <form id='payment-form' onSubmit={handleSubmit}>
                <LinkAuthenticationElement id='link-authentication-element' />
                <PaymentElement id='payment-element' />
                <button className='w-full' disabled={isLoading || !stripe || !elements ? true : false} id='submit'>

                    <span className={`${styles.button} mt-2 !h-[35px]`}>
                        {isLoading ? "Paying..." : "Pay Now"}
                    </span>
                </button>
                {/* show error or success message  */}
                {
                    message && <div id="payment-message" className='text-red font-Poppins pt-2'>{message}</div>
                }
            </form>
            }
        </>
    )
}

export default CheckoutForm