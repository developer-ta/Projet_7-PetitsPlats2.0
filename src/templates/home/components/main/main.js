import { AdvancedSearch } from "./sectionAdvancedSearch/AdvancedSearch.js"
import { SectionResult } from "./sectionResult/SectionResult.js";

export const Main = (dataList) => {

	AdvancedSearch(dataList);

	SectionResult(dataList);


}