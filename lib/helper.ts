export async function getUser(username: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${username}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}