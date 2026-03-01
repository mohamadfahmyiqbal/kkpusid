import { useContext } from "react";
import { ProfileContext } from "../../../components/layout/contexts";

export const useProfile = () => useContext(ProfileContext);
