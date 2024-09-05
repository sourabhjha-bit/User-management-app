import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "./Loader";



interface User {
    id: number,
    name:string,
    email:string,
    phone:string
}

export default function EditUser() {
    const { id } = useParams<{id:string}>()
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res)=>{
            setUser(res.data)
            setLoading(false)
        }).catch(()=>{
            setError('failed to fetch user')
            setLoading(false)
        })
    }, [id])

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(false)

        axios.put('https://jsonplaceholder.typicode.com/users/${id}', user).then(()=>{
            setLoading(false)
            navigate('/')
        })
        .catch(() => {
            setError('Failed to update user');
            setLoading(false);
          });
    }

    if(loading) return <Loader/>
    if(error) return <p>{error}</p>

  return (
    <div>
      <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user?.name || ''}
          onChange={(e) => setUser({ ...user, name: e.target.value } as User)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user?.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value } as User)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={user?.phone || ''}
          onChange={(e) => setUser({ ...user, phone: e.target.value } as User)}
          required
        />
        <button type="submit">Update</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  )
}
