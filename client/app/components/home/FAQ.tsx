import { H1 } from "@/app/TailwindComponents/Headings";
import useMutation from "@/app/_hooks/useMutation";
import { styles } from "@/app/styles/style";
import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { AddCircle, PlusOne } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "../Loader/Loader";

type FAQProps = {
  item: any;
};

const SingleFaq: FC<FAQProps> = (props) => {
  const { item } = props;
  const [toggleFaq, setToggleFaq] = useState(item.isActive || false);
  return (
    <>
      <div className="faqContent flex flex-col border-b-2 dark:border-white border-black">
        <div
          className="question flex justify-between mb-6 cursor-pointer"
          onClick={() => setToggleFaq(!toggleFaq)}
        >
          <p className={styles.label}>{item.question}</p>
          <div className="actionButtons flex items-center">
            {toggleFaq ? <FaMinus size={18} /> : <FaPlus size={18} />}
          </div>
        </div>
        <div
          className={`answer ${
            toggleFaq ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <p className={`${styles.label} mb-4 opacity-65`}>{item.answer}</p>
        </div>
      </div>
    </>
  );
};

const FAQs = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  //? GET FAQ Data API
  const {
    data: getFaqData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetLayoutQuery("FAQ", { refetchOnMountOrArgChange: true });

  //? --Side Effect to Set Initial values
  useEffect(() => {
    if (getFaqData) {
      const faqs = getFaqData?.layout?.faq.map((item: any) => {
        const { _id, ...obj } = item;
        return item;
      });
      setQuestions(faqs);
    }
  }, [getFaqData]);

  if (isLoading) return <Loader />;
  return (
    <div className="px-2 my-20">
      <H1 classes="text-center my-5 text-[25px]">FAQs</H1>
      <Grid container sm={10} m={"auto"}>
        <Grid item sm={12} m={"auto"}>
          <div className="faqs space-y-4">
            {questions?.map((item: any, index: number) => (
              <SingleFaq key={item?._id} item={item} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FAQs;
