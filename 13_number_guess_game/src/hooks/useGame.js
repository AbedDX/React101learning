import GameContext from "../context/GameContect";
import {useContext} from "react";

const useGame = () => {
    return useContext(GameContext);
}
export default useGame