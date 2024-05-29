import Heading from "@/app/utils/Heading";
import { useGetCourseDetailQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetail from "./CourseDetail";
import Loader from "../Loader/Loader";
import { useGetStripePublishableKeyQuery, useMakeNewStripePaymentMutation } from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js"
type Props = {
  courseId: string;
};

const CourseDetailPage: FC<Props> = ({ courseId }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState();

  //? --Api - Get Single Course Deatil
  const { data, isLoading } = useGetCourseDetailQuery(courseId, {
    skip: !courseId,
  });

  //? --Api - Get Stripe Publishable Key
  const { data: keyConfig } = useGetStripePublishableKeyQuery({})

  //? --Api - To Make New Payment
  const [newPaymentAction, resultPaymentAction] = useMakeNewStripePaymentMutation()

  //? Effects

  useEffect(() => {
    if (keyConfig) {
      const publishableKey = keyConfig?.publishableKey
      setStripePromise(loadStripe(publishableKey))
    }
    if (data) {
      const amount = Math.round(data.course.price * 100)
      newPaymentAction({amount})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyConfig, data])


  useEffect(() => {
    if (resultPaymentAction.isSuccess) {
      setClientSecret(resultPaymentAction.data.client_secret)
    }
  }, [resultPaymentAction])
  return (
    <>
      <Heading
        title={data?.course.name || "Course" + " - Compile Academy"}
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords={data?.course.tags}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={1}
        setRoute={setRoute}
        route={route}
      />
      {isLoading ? <Loader /> : <CourseDetail course={data?.course} stripePrmoise={stripePromise} clientSecret={clientSecret} />}
      <Footer />
    </>
  );
};

export default CourseDetailPage;
