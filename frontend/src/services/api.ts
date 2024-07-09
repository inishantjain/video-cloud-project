const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function loginApi(fname: string, password: string) {
  const res = await fetch(new URL("login", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname, password }),
  });
  return res;
}

export async function registerApi(fname: string, lname: string, email: string, number: string) {
  const res = await fetch(new URL("register", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname, lname, email, number }),
  });
  return res;
}

export async function editUserApi({ bio, imgUrl = "" }: { bio: string; imgUrl?: string }) {
  const res = await fetch(new URL("editUser", BASE_URL), {
    method: "PATCH",
    headers: { authorization: `Bearer ${localStorage.getItem("access_token")!}`, "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ bio, imgUrl }),
  });
  return res;
}

export async function uploadVideoApi(formData: FormData) {
  const res = await fetch(new URL("uploadVideo", BASE_URL), {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")!}`,
    },
    credentials: "include",
    body: formData,
  });

  return res;
}

export async function getVideoFeedApi() {
  const res = await fetch(new URL("videoFeed", BASE_URL));
  return res;
}

//TODO: fix this function integrity
export async function getVideoByUserApi({ userId, username }: { userId?: string; username?: string }) {
  let url = new URL("videos", BASE_URL);
  if (userId) url.searchParams.set("userId", userId);
  else if (username) url.searchParams.set("username", username);
  const res = await fetch(url);
  const jsonRes = await res.json();
  if (res.ok) return jsonRes.videosData;
  throw new Error("Could not fetch videos: " + jsonRes?.message);
}
