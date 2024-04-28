//import { bindEvent } from "../../../../services/utils/bindEvent.js";
import { isExciteOrNotEmpty } from '../../../../services/utils/validator.js';
import { AdvancedSearch } from './sectionAdvancedSearch/AdvancedSearch.js';
import { SectionResult } from './sectionResult/SectionResult.js';

export const Main = (dataList) => {
  document.getElementById('advance_search').dataCurrent = dataList;

  if (isExciteOrNotEmpty(dataList)) {
    AdvancedSearch(dataList);

    SectionResult(dataList);
    return;
  }

  SectionResult(dataList);
};
