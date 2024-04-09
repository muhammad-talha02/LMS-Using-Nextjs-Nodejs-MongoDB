import { H1 } from "@/app/TailwindComponents/Headings";
import useMutation from "@/app/_hooks/useMutation";
import {
    useGetLayoutQuery,
    useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { AddCircle } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {};

const EditCategories: FC<Props> = (props) => {
    const [categories, setCategories] = useState<any[]>([]);
    //? GET FAQ Data API
    const {
        data: getCategoriesData,
        isLoading,
        isSuccess,
        refetch,
    } = useGetLayoutQuery("Categories", { refetchOnMountOrArgChange: true });

    //? Update Layout APi
    const { actionApi: updateBannerAction, result } = useMutation({
        api: useUpdateLayoutMutation,
        successMsg: "Categories Updated Successfully",
        successFunc: () => {
            refetch();
        },
    });

    //? --Side Effect to Set Initial values
    useEffect(() => {
        if (getCategoriesData) {
            const categories = getCategoriesData?.layout?.categories?.map((cat: any) => ({ title: cat.title }))
            setCategories(categories);
        }
    }, [getCategoriesData]);

    //* Check values Filled or not
    const areCategoriesEmpty = () => {
        return categories.some((cat) => cat.title === '')
    }
    //* Handle Category Change
    const handleCategoryChange = (value: string, index: number) => {
        const updatedCategories = [...categories]

        updatedCategories[index].title = value
        setCategories(updatedCategories)

    }

    //* handle Add new Category

    const handleAddCategory = () => {
        if (areCategoriesEmpty()) {
            toast.error("Please fill all fields")
        }
        else {
            const currentCategories = [...categories]
            const updatedCategories = [...currentCategories, { title: "" }]
            setCategories(updatedCategories)
        }
    }


    //* Handle to remove FAQ
    const handleRemoveFaq = (index: number) => {
        const currentCategories = [...categories]
        currentCategories.splice(index, 1)
        setCategories(currentCategories)
    }
    //* is Data changed or Not

    const areCategoriesUnchanged = () => {
        const oldCategories = getCategoriesData?.layout?.categories?.map((cat: any) => ({ title: cat.title }))
        const newCategories = categories?.map((cat: any) => ({ title: cat.title }))
        return JSON.stringify(oldCategories) === JSON.stringify(newCategories)
    }

    //* Handle Update Data
    const handleUpdateLayout = async () => {
        if (areCategoriesEmpty()) {
            toast.error("Question Cannot be Empty")
        }
        else {
            const newCategory = categories.map((cat: any) => ({ title: cat.title }))
            const data = {
                type: "Categories",
                categories: newCategory
            }
            await updateBannerAction(data)
        }
    }
    return (
        <div>
            <H1 classes="text-center my-3">All Categeries</H1>
            <Grid container lg={8} xs={11} m={"auto"}>
                {categories?.map((category: any, index: number) => (
                    <Grid item xs={12} key={index} display={"flex"} justifyContent={"center"} my={1} gap={2}>
                        <input type="text" className="bg-transparent w-full max-w-[250px] px-1" value={category.title} onChange={(e: any) => handleCategoryChange(e.target.value, index)} />
                        <IconButton className="text-black dark:text-white" onClick={() => handleRemoveFaq(index)}>
                            <AiOutlineDelete size={18} />
                        </IconButton>
                    </Grid>
                ))}
                <Grid item sm={12} mt={3} display={"flex"} justifyContent={"center"}>
                    <AddCircle className='cursor-pointer' onClick={handleAddCategory} />
                </Grid>
                <Grid item sm={12} mt={3} display={"flex"} justifyContent={"flex-end"}>
                    <button className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 400px:w-[150px] h-[40px] disabled:cursor-not-allowed' disabled={result.isLoading || areCategoriesUnchanged()} onClick={handleUpdateLayout}>Update</button>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditCategories;
