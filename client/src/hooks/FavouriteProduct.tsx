import { useEffect } from "react";
import { getFavouriteProductThunk } from "../redux/favourite/Favourite.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFavouriteProducts = () => {
    const dispatch = useAppDispatch();

    // Lấy danh sách sản phẩm yêu thích từ Redux
    const listFavourite: any = useAppSelector((state) => state.favourite.listFavourite) || [];

    useEffect(() => {
        dispatch(getFavouriteProductThunk());
    }, [dispatch]);

    return { listFavourite };
};

export default useFavouriteProducts;