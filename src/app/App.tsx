import './App.css'
import { useStore } from '../store/store'
import { useFormStore } from '../store/form'
import { ChangeEvent, FormEvent, Key } from 'react'
import { AuthPage } from '../components/auth-context/AuthPage'
import { FormReact } from '../components/form-react/Form'
import { FormValues } from '../components/form-react/zod-schema'

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
      <h1>This is A Test Project for Testing React and other Libraries</h1>
      <div className="contents">
        <h3 className="label-content">Already used:</h3>
        <li className="used">
          <ul>Zustand</ul>
          <ul>AuthContext</ul>
          <ul>ErrorBoundary</ul>
          <ul>use-hook-form + Zod</ul>
          <ul></ul>
        </li>
        <h3 className="label-content">Need to use:</h3>
        <li className="not-used">
          <ul>React Router</ul>
          <ul>Three.js</ul>
          <ul>useMemo()</ul>
          <ul>React 19 NEW</ul>
          <ul></ul>
        </li>
      </div>

      <div className="card">
        <button onClick={increment}>+</button>
        <h1>count is {count}</h1>
        <button onClick={reset}>Reset</button>
      </div>
      <h2 className="read-the-docs">Form Element</h2>
      <form className="form" onSubmit={handleSubmit}>
        <p>Enter Your Secret Word Here:</p>
        <input
          className="input-custom"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
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
      <FormReact
        onSubmit={function (data: FormValues): void {
          throw new Error('Function not implemented.')
        }}
        label={''}
        text={''}
        left={false}
        right={false}
      />
    </>
  )
}

export default App
