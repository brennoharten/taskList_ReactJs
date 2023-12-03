import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { TrashIcon } from '@radix-ui/react-icons'

function App() {
  const [tarefas, setTarefas ] = useState([])
  const [isModalOpen, setmodalIsOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const openModal = () => setmodalIsOpen(true)
  const closeModal = () => setmodalIsOpen(false)

  const saveTasks = (tarefas) => {
    localStorage.setItem("tasks", JSON.stringify(tarefas))
  }

  const getTasks = () => {
    const taskJson = localStorage.getItem('tasks')
    return taskJson ? JSON.parse(taskJson) : []
  }

  const addNewTask = () => {
    const currentTasks = [...tarefas]

    const task = {
      id: uuidv4(),
      title,
      description,
      done: false
    }

    currentTasks.unshift(task)
    setTarefas(currentTasks)
    saveTasks(currentTasks)
    closeModal()
    setTitle('')
    setDescription('')
  }

  const deleteTask = (index) =>
  {
    const currentTasks = [...tarefas]
    currentTasks.splice(index, 1)
    setTarefas(currentTasks)
    saveTasks(currentTasks)
  }

  const changeCheckStatus = (index) =>
  {
    const currentTasks = [...tarefas]
    const task = currentTasks[index]
    task.done = !task.done;
    currentTasks.splice(index, 1, task)
    setTarefas(currentTasks)
    saveTasks(currentTasks)
  }

  useEffect(() => {
    const savedTasks = getTasks()
    setTarefas(savedTasks)
  }, [])
  

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-slate-950'>
      <div className='flex flex-col h-2/3 w-1/2'>
        <div className='flex justify-between items-center'>
          <h1 className='text-slate-200 text-4xl mb-2.5'>todo app</h1>
          <button 
            onClick={openModal}
            className='py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500'>
            + Nova Tarefa
          </button>
        </div>
        <div className='flex flex-col divide-y divide-slate-700 flex-grow bg-slate-900 rounded-xl px-6'>
          {tarefas.map((tarefa, index) => {
            return(
              <div key={tarefa.id} className={`${tarefa.done ? 'opacity-50': ''} flex items-center justify-between`}>
                <div className='flex gap-6 text-slate-200 text-sm py-2.5'>
                  <input type="checkbox" className='scale-125' onChange={() => {changeCheckStatus(index)}} checked={tarefa.done} />
                  <div>
                    <p className='font-medium'>{tarefa.title}</p>
                    <p className='text-slate-400'>{tarefa.description}</p>
                  </div>
                </div>  
                <TrashIcon role='button'className='text-slate-100 scale-150' onClick={() => {deleteTask(index)}}/>
              </div>
            ) 
          })}
        </div>
      </div>

      {isModalOpen  && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-xl">
            <h2 className="mb-4 text-slate-200 text-sm">Nova Tarefa</h2>
            <input 
              type="text" 
              className="border border-slate-700 mb-4 p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-600" 
              placeholder="Título" 
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              />
            <textarea 
              className="h-25 resize-none border border-slate-700 mb-4 p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-600" 
              placeholder="Descrição"
              value={description}
              onChange={(e)=>{
                setDescription(e.target.value)
              }}></textarea>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="text-sm py-1.5 px-3 rounded-lg border border-red-500 text-red-500">
                Cancelar
              </button>
              <button onClick={addNewTask} className="text-sm py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500 ml-2">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App