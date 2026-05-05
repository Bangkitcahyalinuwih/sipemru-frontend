export const getUser = async () => {
  // simulasi delay API
  await new Promise((res) => setTimeout(res, 500))

  return {
    id: 1,
    name: "Septian Angga",
    email: "septian@gmail.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
}

// import axios from "axios"

// export const getUser = async () => {
//   const token = localStorage.getItem("token")

//   const res = await axios.get("/api/me", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })

//   return res.data
// }