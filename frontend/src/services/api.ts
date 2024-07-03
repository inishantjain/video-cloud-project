const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function loginApi(fname: string, password: string) {
  const res = await fetch(new URL("login", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname, password }),
  });
  const jsonRes = await res.json();
  localStorage.setItem("access_token", `Bearer ${jsonRes.token}`); //FIXME: send token with cookie
  if (res.ok) return jsonRes.user;
  throw new Error("Could not login, Error: " + jsonRes?.message);
}

export async function registerApi(fname: string, lname: string, email: string, number: number) {
  const res = await fetch(new URL("register", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname, lname, email, number }),
  });
  const jsonRes = await res.json();
  if (res.ok) return true;
  throw new Error("Could not Register User, Error: " + jsonRes?.message);
}

export async function editUserApi({ bio, imgUrl = "" }: { bio: string; imgUrl?: string }) {
  const res = await fetch(new URL("editUser", BASE_URL), {
    method: "PATCH",
    headers: { authorization: localStorage.getItem("access_token")!, "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ bio, imgUrl }),
  });
  const jsonRes = await res.json();
  if (res.ok) return true;
  throw new Error("Could not change bio: " + jsonRes?.message);
}

export async function uploadVideoApi(formData: FormData) {
  const res = await fetch(new URL("uploadVideo", BASE_URL), {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("access_token")!,
    },
    credentials: "include",
    body: formData,
  });

  const jsonRes = await res.json();
  if (res.ok) return jsonRes.videoData;
  throw new Error("Could not change bio: " + jsonRes?.message);
}

export async function getVideoFeedApi() {
  const res = await fetch(new URL("videoFeed", BASE_URL));
  const jsonRes = await res.json();
  if (res.ok) return jsonRes.users;
  throw new Error("Could not fetch videos: " + jsonRes?.message);
}

export async function getVideoByUserIdApi(userId: string) {
  let url = new URL("videos", BASE_URL);
  url.searchParams.set("user", userId);
  const res = await fetch(url);
  const jsonRes = await res.json();
  if (res.ok) return jsonRes.videosData;
  throw new Error("Could not fetch videos: " + jsonRes?.message);
}
