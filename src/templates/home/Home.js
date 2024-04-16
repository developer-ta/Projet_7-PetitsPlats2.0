import { bindEvent } from "../../services/utils/bindEvent.js";
import { Header } from "./components/header/header.js"
import { Main } from "./components/main/Main.js";

export const Home = (datalist) => {
	debugger
	if (document.querySelector("header") == null) Header();

	Main(datalist);
	bindEvent(datalist);
}