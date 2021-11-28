import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store';
import { setShowAlert, setAlertText} from '../AppSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useShowAlertMessage = () => {
    const dispatch = useAppDispatch();
    return (msg: string) => {
        dispatch(setShowAlert(true));
        dispatch(setAlertText(msg));
        setTimeout(() => {
            dispatch(setShowAlert(false));
        }, 2000);
    }
}