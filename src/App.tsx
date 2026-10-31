
import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from './store'
import {
  adicionarContato,
  removerContato,
  editarContato
} from './store/contatosSlice'

const Container = styled.main`
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  font-family: Arial, sans-serif;
  color: #252525;
`

const Titulo = styled.h1`
  text-align: center;
  color: #553c9a;
  margin-bottom: 30px;
`

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`

const Campo = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`

const Botao = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: #553c9a;
  color: white;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #382568;
  }
`

const Cartao = styled.article`
  background: #f3f0fa;
  padding: 18px;
  margin-bottom: 15px;
  border-radius: 10px;

  h2 {
    margin-top: 0;
    color: #553c9a;
  }
`

const Acoes = styled.div`
  display: flex;
  gap: 10px;
`

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const contatos = useSelector(
    (state: RootState) => state.contatos.lista
  )

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [editando, setEditando] = useState<number | null>(null)

  const salvarContato = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      alert('Preencha todos os campos!')
      return
    }

    if (editando !== null) {
      dispatch(editarContato({ id: editando, nome, email, telefone }))
      setEditando(null)
    } else {
      dispatch(
        adicionarContato({
          id: Date.now(),
          nome,
          email,
          telefone
        })
      )
    }

    setNome('')
    setEmail('')
    setTelefone('')
  }

  const prepararEdicao = (contato: (typeof contatos)[number]) => {
    setNome(contato.nome)
    setEmail(contato.email)
    setTelefone(contato.telefone)
    setEditando(contato.id)
  }

  return (
    <Container>
      <Titulo>Minha Lista de Contatos</Titulo>

      <Formulario onSubmit={salvarContato}>
        <Campo
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Campo
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Campo
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <Botao type="submit">
          {editando !== null ? 'Salvar edição' : 'Adicionar contato'}
        </Botao>
      </Formulario>

      {contatos.map((contato) => (
        <Cartao key={contato.id}>
          <h2>{contato.nome}</h2>
          <p>{contato.email}</p>
          <p>{contato.telefone}</p>

          <Acoes>
            <Botao
              type="button"
              onClick={() => prepararEdicao(contato)}
            >
              Editar
            </Botao>

            <Botao
              type="button"
              onClick={() => dispatch(removerContato(contato.id))}
            >
              Remover
            </Botao>
          </Acoes>
        </Cartao>
      ))}
    </Container>
  )
}

export default App
