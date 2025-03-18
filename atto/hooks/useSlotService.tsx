import { getAllSlots } from "@/services/api_services/firebase_api_services";
import { setSlotLoader, setSlots } from "@/Store/slices/bookSlice";
import { RootState } from "@/Store/store";
import { useDispatch, useSelector } from "react-redux"

const useSlotService = () => {

    const dispatch = useDispatch();
    const { loggedInUser, selectedAddress } = useSelector((store: RootState) => store.auth)
    const { bookings, slots } = useSelector((store: RootState) => store.book)

    const fetchAllSlots = async () => {
        dispatch(setSlotLoader("loading"));
        const { data, success } = await getAllSlots();
        if (success) {
            dispatch(setSlots(data))
            dispatch(setSlotLoader("success"));
        }
        dispatch(setSlotLoader("error"));
    }


    const refetchAllSlots = async () => {
        const { data, success } = await getAllSlots();
        if (success) {
            dispatch(setSlots(data))
        }
    }

    return ({ fetchAllSlots, refetchAllSlots })
}

export default useSlotService
