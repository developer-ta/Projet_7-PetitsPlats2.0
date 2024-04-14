import { bindEvent } from "../../../../services/utils/bindEvent.js";
import { AdvancedSearch } from "./sectionAdvancedSearch/AdvancedSearch.js"
import { SectionResult } from "./sectionResult/SectionResult.js";

export const Main = (dataList) => {

	AdvancedSearch(dataList);

	SectionResult(dataList);

	bindEvent(dataList)


}