import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => {
  return seDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
