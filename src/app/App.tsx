import './App.css'
import { useStore } from '../store/store'
import { useFormStore } from '../store/form'
import { ChangeEvent, FormEvent, Key } from 'react'
import { AuthPage } from '../components/auth-context/AuthPage'

function App() {
  const { count, increment, reset } = useStore()
  const { formData, setFormData, submitForm, submittedData } = useFormStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submitForm()
  }
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>+</button>
        <h1>count is {count}</h1>
        <button onClick={reset}>Reset</button>
      </div>
      <h2 className="read-the-docs">Form Element</h2>
      <form className="form" onSubmit={handleSubmit}>
        <p>Enter Your Secret Word Here:</p>
        <input className="input-custom" value={formData.name} name="name" onChange={handleChange} />
        <button type="submit">Submit!</button>
      </form>

      <h2 className="read-the-docs">Your Other Secret Words Are Here:</h2>
      <div className="list">
        {submittedData.map((item: { id: Key | number; name: string }) => (
          <li key={item.id}>
            <p className="text">{item.name}</p>
          </li>
        ))}
      </div>

      <AuthPage />
    </>
  )
}

export default App
