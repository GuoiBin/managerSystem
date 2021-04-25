import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: "/api/getForumList",
    method: "post",
    data: query
  });
}

export function fetchArticle(id) {
  return request({
    url: "/vue-element-admin/article/detail",
    method: "get",
    params: { id }
  });
}

export function fetchPv(pv) {
  return request({
    url: "/vue-element-admin/article/pv",
    method: "get",
    params: { pv }
  });
}

export function createArticle(data) {
  return request({
    url: "/vue-element-admin/article/create",
    method: "post",
    data
  });
}

export function updateArticle(data) {
  return request({
    url: "/api/updateArticle",
    method: "post",
    data
  });
}

export function deleteArticle(data) {
  return request({
    url: "/api/deleteArticle",
    method: "post",
    data
  });
}

export function changeAcountStatus(data) {
  return request({
    url: "/api/changeAcountStatus",
    method: "post",
    data
  });
}

export function changeArticleStatus(data) {
  return request({
    url: "/api/changeArticleStatus",
    method: "post",
    data
  });
}

export function fetchListOfBanned(data) {
  return request({
    url: "/api/fetchListOfBanned",
    method: "post",
    data
  });
}
