"use client"
import styles from '@/app/page.module.scss'
import { ButtonComponent } from '@/components/ButtonComponent';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { tasks as taskData } from '@/utils/dates';
import Image from "next/image";
import { days, months } from "@/utils/dates";
import { useCallback, useEffect, useState } from 'react';

interface TaskProps {
  id: number
  name: string
  completed: boolean
}

export default function Home() {

  const [screenWidth, setScreenWidth] = useState<number>();

  const date = new Date();
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [dateNow, setDateNow] = useState(0);

  useEffect(() => {
    setDay(date.getDay())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setDateNow(date.getDate())
  }, [])

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    const items = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : taskData
    if (items) {
      setTasks(items)
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [idTask, setIdTask] = useState<number | null>(null);

  const completed = useCallback((id: number) => {
    const arr = tasks.map((task: any) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    })
    setTasks(arr)
    localStorage.setItem("tasks", JSON.stringify(arr))
  }, [tasks])

  const createTask = useCallback((name: string) => {
    setTasks([...tasks, { id: tasks.length + 1, name, completed: false }])
    localStorage.setItem("tasks", JSON.stringify([...tasks, { id: tasks.length + 1, name, completed: false }]))
    setNewTask("")
  }, [tasks])

  const deleteTaks = useCallback((id: number) => {
    const arr = tasks.filter((task: any) => task.id !== id)
    setTasks(arr)
    localStorage.setItem("tasks", JSON.stringify(arr))
  }, [tasks])


  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Image src="/assets/logo.png" alt="Logo" width={150} height={36} />
          <h1>Bem-vindo de volta, Marcus</h1>
          <p>{`${days[day]}`}, {`${dateNow}`} de {`${months[month]}`} de {year}</p>
        </div>
      </header>
      <div className={styles.container} >
        <h2>Suas tarefas de hoje</h2>
        <div className={styles.contentCards}>
          {
            tasks.map((task: any) => {
              if (!task.completed) {
                return (
                  <Card key={task.id} name={task.name} completed={task.completed} setCompleted={() => completed(task.id)} onClickDelete={() => { setModalDelete(!modalDelete); setIdTask(task.id) }} />
                )
              }
            })
          }
        </div>
        <h2>Tarefas finalizadas</h2>
        <div className={styles.contentCards}>
          {
            tasks.map((task: any) => {
              if (task.completed) {
                return (
                  <Card key={task.id} name={task.name} completed={task.completed} setCompleted={() => completed(task.id)} onClickDelete={() => { setModalDelete(!modalDelete); setIdTask(task.id) }} />
                )
              }
            })
          }
        </div>
      </div>
      <div className={styles.footerButtom}>
        <ButtonComponent type='create' text='Adicionar nova tarefa' onClick={() => setModalCreate(!modalCreate)} width={screenWidth! < 600 ? '100%' : '450px'} />
      </div>
      {
        modalCreate &&
        <Modal
          onClose={() => { setModalCreate(!modalCreate); setIdTask(null); setNewTask("") }}
          typeButton1="cancel"
          typeButton2="create"
          textButton1="Cancelar"
          textButton2="Adicionar"
          onClick={() => { createTask(newTask); setModalCreate(!modalCreate) }}
        >
          <div className={styles.contentModalCreate}>
            <label>Título</label>
            <input type="text" placeholder='Digite' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          </div>
        </Modal>
      }
      {
        modalDelete &&
        <Modal
          onClose={() => { setModalDelete(!modalDelete); setIdTask(null) }}
          typeButton1="cancel"
          typeButton2="delete"
          textButton1="Cancelar"
          textButton2="Deletar"
          onClick={() => { deleteTaks(idTask!); setModalDelete(!modalDelete) }}
        >
          <div className={styles.contentModalDelete}>
            <p>Tem certeza que deseja excluir esta tarefa?</p>
          </div>
        </Modal>
      }
    </>
  );
}
