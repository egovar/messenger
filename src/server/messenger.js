import { requestData } from "@/server/index";
import dataList from "@/server/dataList";

export function requestDialogsList() {
  return requestData(dataList);
}

export function requestDialog(id) {
  return requestData(
    dataList.find((dialog) => parseInt(dialog.id) === parseInt(id)).parts
  );
}
