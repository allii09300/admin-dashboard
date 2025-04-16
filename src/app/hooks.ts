import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
