import request from "@/utils/request";

export function getChartData() {
  return request({
    url: "/api/getChartData",
    method: "post"
  });
}
