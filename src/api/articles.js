import client from "./client";

const endpoint = "/articles";

const getArticles = () => client.get(endpoint);

export const addArticle = (article, onUploadProgress) => {
  const data = new FormData();
  data.append("title", article.title);
  data.append("time", article.time);
  data.append("categoryId", article.category.value);
  data.append("description", article.description);

  article.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (article.location)
    data.append("location", JSON.stringify(article.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addArticle,
  getArticles,
};
