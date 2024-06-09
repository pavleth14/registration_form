import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: ''
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.lastname) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
    }

    catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <>
      <h1>Registration Form</h1>
      <form onSubmit={submitHandler}>

        <div>
          <label>
            Name:
            <input name='name' onChange={formHandler} type='name' value={formData.name} required />
          </label>
        </div>

        <div>
          <label>
            Lastname:
            <input name='lastname' onChange={formHandler} type='lastname' value={formData.lastname} required />
          </label>
        </div>

        <button type='submit'>Submit</button>

      </form>
    </>
  )
}

export default App
