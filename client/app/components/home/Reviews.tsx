import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "./ReviewCard";

type Props = {};

const data = [
  {
    name: "Elon Musk",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "CEO SpaceX & Tesla | USA",
    comment:
      "lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.",
  },
  {
    name: "Jeff Bezos",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "CEO Amazon Company | USA",
    comment:
      "lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.",
  },
  {
    name: "Mark Zuckerbeg ",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    profession: "CEO Facebook & Meta | USA",
    comment:
      "lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.",
  },
  {
    name: "Bill Gates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "CEO Microsoft Company | USA",
    comment:
      "lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.lorem ipsum, he is a great man with good problem solving anf innovative skilss.",
  },
];
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[90%] m-auto my-10">
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[50%]">
          <Image
            src={require("../../../public/assets/businees-img1.png")}
            alt="business"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full 800px:w-[50%]">
          <h3 className={`${styles.title} 800px:!text-[35px]`}>
            Our Students are{" "}
            <span className="text-[--t-red] dark:text-[--t-blue]">
              {" "}
              Our Strength
            </span>{" "}
            <br />
            What they say about us.
          </h3>
          <p className={styles.label}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
            earum et molestias libero! Magni, omnis non. Animi tempore ex
            quidem, at molestiae iusto error amet aliquid corrupti totam ratione
            assumenda quod tempora illum temporibus quas odit nulla nobis velit
            aut?
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] xl:gap-[35px] border-0 my-20">
        {data.map((review: any, index: number) => (
          <ReviewCard item={review} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
