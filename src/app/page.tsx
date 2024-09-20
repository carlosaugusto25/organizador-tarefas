"use client"
import styles from '@/app/page.module.scss'
import { ButtonComponent } from '@/components/ButtonComponent';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { useState } from 'react';

export default function Home() {
  
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  
  return (
    <>
    <div className={styles.container}>
      <h2>Suas tarefas de hoje</h2>
      <div className={styles.contentCards}>
        <Card onClickDelete={() => setModalDelete(!modalDelete)} />
        <Card onClickDelete={() => setModalDelete(!modalDelete)} />
      </div>
      <h2>Tarefas finalizadas</h2>
      <div className={styles.contentCards}>
        <Card onClickDelete={() => setModalDelete(!modalDelete)} />
      </div>
    </div>
    <ButtonComponent type='create' text='Adicionar nova tarefa' onClick={() => setModalCreate(!modalCreate)} width='450px' />
      {
        modalCreate && 
          <Modal 
            onClose={() => setModalCreate(!modalCreate)} 
            typeButton1="cancel" 
            typeButton2="create" 
            textButton1="Cancelar" 
            textButton2="Adicionar"
          >
            <div className={styles.contentModalCreate}>
              <label>Título</label>
              <input type="text" placeholder='Digite' />
            </div>
          </Modal>
      }
      {
        modalDelete && 
          <Modal 
            onClose={() => setModalDelete(!modalDelete)} 
            typeButton1="cancel" 
            typeButton2="delete" 
            textButton1="Cancelar" 
            textButton2="Deletar"
          >
            <div className={styles.contentModalDelete}>
              <p>Tem certeza que deseja excluir esta tarefa?</p>
            </div>
          </Modal>
      }
    </>
  );
}
