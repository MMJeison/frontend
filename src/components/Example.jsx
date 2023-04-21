import { useState } from "react"

export const isValidEmail = (email) => {
    if (email.length > 30) return false
    const emailRegex = /^[a-zA-Z0-9]+[.]*[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{1,4}$/g
    return emailRegex.test(email)
}

export const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/g
    return phoneRegex.test(phone)
}

export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/g
    return nameRegex.test(name)
}


export default function Example() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const resetForm = () => {
        setName("")
        setEmail("")
        setPhone("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValidEmail(email) && isValidName(name) && isValidPhone(phone)) {
            resetForm()
            console.log("Submitted")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}