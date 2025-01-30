export const server_url = "http://localhost:34567";

export const postapi = (url,data, success = (f) => f, error = (f) => f ) => {
  const token = localStorage.getItem("@@token");
  fetch(`${server_url}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const getapi = (url, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`)
   .then((raw) => raw.json())
   .then((result) => {
      success(result);
    })
   .catch((err) => {
      error(err);
    });
}
