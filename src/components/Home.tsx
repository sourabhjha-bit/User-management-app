import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "./Loader";
import { Link } from "react-router-dom";
import '../App.css'

interface User {
    id: number,
    name:string,
    email:string,
    phone:string
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then( res => {
            setUsers(res.data)
            setLoading(false)
        }).catch(()=>{
            setError('failed to fetch users')
            setLoading(false)
        })
    }, [])

    const deleteUser = (id: number) =>{
        setLoading(true);
        setLoading(true);
        axios.delete(`https://jsonplaceholder.typicode.com/${id}`).then(()=>{
            setUsers(users.filter(user =>
                user.id !== id
            ))
            setLoading(false)
        }).catch(()=>{
            setError('failed to delete user')
            setLoading(false)
        })
    }

    if(loading) return < Loader/>
    if(error) return <p>{error}</p>

  return (
    <div>
      <h1>Users List</h1>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <Link className='edit-user' to={`/edit/${user.id}`}>Edit</Link>
                            <button onClick={()=>deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
      </table>
      <Link to='/create' className='new-user'>Tab Here To Create A New User</Link>
    </div>
  )
}
