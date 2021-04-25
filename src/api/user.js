import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/api/info",
    method: "post",
    data: token
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "post"
  });
}

export function changePassword(data) {
  return request({
    url: "/api/changePassword",
    method: "post",
    data
  });
}
