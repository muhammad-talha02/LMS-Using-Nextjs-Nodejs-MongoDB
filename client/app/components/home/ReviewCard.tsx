import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="w-full flex">
        <Image
          src={item.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-lg w-[50px] h-[50px] object-cover"
        />
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="pl-4">
            <h5 className="text-[20px]">{item.name}</h5>
            <h6 className="text-[16px] dark:opacity-80">{item.profession}</h6>
          </div>
          <Rating
            value={5}
            className="800px:ml-0 ml-4"
            precision={0.5}
            emptyIcon={<StarBorder className="text-[orange]" />}
            readOnly
          />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins">{item.comment}</p>
    </div>
  );
};

export default ReviewCard;
