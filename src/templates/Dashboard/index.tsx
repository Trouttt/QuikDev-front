import Button from 'components/Button'
import Card from 'components/Card'
import Form from 'components/Form'
import Header from 'components/Header'
import Input from 'components/Input'
import Cookies from 'js-cookie'

import downloadjs from 'downloadjs'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import jwt from 'jwt-decode'
import { api, aws_s3_api } from 'services/api'
import 'react-toastify/dist/ReactToastify.css'
import * as S from './styles'
import TextArea from 'components/TextArea'

type User = {
  id: string
  name: string
}

type Post = {
  id: string
  user: User
  title: string
  description: string
  image_path: string
  comment: Comment[]
}

type Comment = {
  id: string
  description: string
  user: User
}
type Image = {
  name: string
  size: number
  type: string
}

export default function Dashboard() {
  const router = useRouter()

  const [editComment, setEditComment] = useState({
    idCommentToEdit: '',
    isEditting: false
  })
  const [updateCommentValue, setUpdateCommentValue] = useState({
    value: '',
    isValid: false
  })

  const [posts, setPosts] = useState<Post[]>([])
  const [questionPreviewImage, setQuestionPreviewImage] = useState('')

  const [questionImage, setQuestionImage] = useState<Image>({
    name: '',
    size: 0,
    type: ''
  })

  const [questionTitle, setQuestionTitle] = useState({
    value: '',
    isValid: false
  })

  const [questionDescription, setQuestionDescription] = useState({
    value: '',
    isValid: false
  })

  const [commentDescription, setCommentDescription] = useState({
    value: '',
    isValid: false
  })

  const clearPreviewFileImageWhenClicked = () => {
    setQuestionPreviewImage('')
  }

  const onQuestionTitleHandler = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionTitle({
      value: value.target.value,
      isValid: value.target.value.length > 1
    })
  }

  const onQuestionImageHandler = async (event: any) => {
    const image = event.target.files[0]

    if (event.target.files[0]) {
      setQuestionPreviewImage(
        URL.createObjectURL(new Blob([image], { type: 'application/zip' }))
      )

      setQuestionImage(image)
    }
  }
  const onQuestionTitleBlur = () => {
    setQuestionTitle({
      value: questionTitle.value,
      isValid: questionTitle.value.length > 1
    })
  }

  const onQuestionDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionDescription({
      value: event.target.value,
      isValid: event.target.value.length >= 3
    })
  }

  const onQuestionDescriptionBlur = () => {
    setQuestionDescription({
      value: questionDescription.value,
      isValid: questionDescription.value.length >= 3
    })
  }
  const onCommentDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentDescription({
      value: event.target.value,
      isValid: event.target.value.length >= 3
    })
  }

  const onCommentDescriptionBlur = () => {
    setCommentDescription({
      value: commentDescription.value,
      isValid: commentDescription.value.length >= 3
    })
  }

  const onUpdateValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCommentValue({
      value: event.target.value,
      isValid: event.target.value.length >= 3
    })
  }
  const onUpdateValueBlur = () => {
    setUpdateCommentValue({
      value: updateCommentValue.value,
      isValid: updateCommentValue.value.length >= 3
    })
  }
  const getPostsHandler = async () => {
    try {
      const foundPosts: any = await api.get('posts', {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
      if (foundPosts) {
        setPosts(foundPosts.data)
      }
    } catch (e: any) {
      if (e.message === 'Network Error') {
        toast.error('Servidor offline')
        return router.push('/sign-in')
      }
      if (e.response.data.statusCode === 401) {
        toast.error('Não autorizado')
        return router.push('/sign-in')
      }
    }
  }
  const deletePostHandler = async (
    event: React.FormEvent,
    post_id: string,
    post_user_id: string
  ) => {
    event.preventDefault()
    const token = getToken()
    try {
      if (token.id !== post_user_id)
        return toast.error('Apenas o dono da postagem pode excluir ela')

      const response = await api.delete(`posts/${post_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })

      if (response) toast.success(response.data.message)
      location.reload()
    } catch (e: any) {
      if (e.response.status === 400) return toast.error(e.response.data.message)
      return toast.error('Aconteceu um error')
    }
  }
  const cancelUpdateCommentHandler = async () => {
    setUpdateCommentValue({ isValid: false, value: '' })
    setEditComment((prevState) => ({
      idCommentToEdit: '',
      isEditting: !prevState.isEditting
    }))
  }
  const confirmUpdateCommentHandler = async (
    event: React.FormEvent,
    comment_id: string
  ) => {
    event.preventDefault()

    try {
      if (!updateCommentValue.isValid)
        return toast.error('É necessário no mínimo 3 caracteres')

      const body = {
        description: updateCommentValue.value
      }

      const response = await api.patch(`comments/${comment_id}`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
      setEditComment((prevState) => ({
        idCommentToEdit: '',
        isEditting: !prevState.isEditting
      }))
      if (response.status === 201) toast.success(response.data.message)
      location.reload()
    } catch (e: any) {
      if (e.response.status === 400) return toast.error(e.response.message)
      return toast.error('Aconteceu um error')
    }
  }
  const updateCommentHandler = async (
    event: React.FormEvent,
    comment_user_id: string,
    comment_id: string
  ) => {
    event.preventDefault()
    const token = getToken()

    try {
      if (token.id !== comment_user_id)
        return toast.error('Apenas o dono do comentário pode editar ele')

      setEditComment((prevState) => ({
        idCommentToEdit: comment_id,
        isEditting: !prevState.isEditting
      }))
    } catch (e: any) {
      if (e.response.status === 400) return toast.error(e.response.message)
      return toast.error('Aconteceu um error')
    }
  }
  const deleteCommentHandler = async (
    event: React.FormEvent,
    comment_id: string,
    comment_user_id: string,
    post_user_id: string
  ) => {
    event.preventDefault()
    const token = getToken()

    try {
      if (token.id !== comment_user_id && token.id !== post_user_id)
        return toast.error(
          'Apenas o dono do comentário ou o dono da postagem podem deletar o comentário '
        )
      const response = await api.delete(`comments/${comment_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
      if (response.status === 201) toast.success(response.data.message)
      location.reload()
    } catch (e: any) {
      if (e.response.status === 400) toast.error(e.response.data.message)
      else toast.error('Aconteceu um error')
    }
  }
  const generateReport = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await api.get(`reports`, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })

      const blob = new Blob([response.data], { type: 'application/pdf' })

      downloadjs(blob, 'eita.pdf', 'application/pdf')
    } catch (e) {
      toast.error('Error ao gerar relatório')
    }
  }
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    let getMedia
    try {
      if (questionImage) {
        const createMediaDto = {
          folder_name: 'Foods'
        }
        getMedia = await api.post(`aws-s3`, createMediaDto, {
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        })

        const responseAws = await aws_s3_api(
          getMedia.data.uploadUrl,
          questionImage
        )
        if (responseAws.status !== 200) {
          toast.error(`Aconteceu um erro`, {})
        }
      }
      const body = {
        title: questionTitle.value,
        description: questionDescription.value,
        image_path: getMedia && questionPreviewImage ? getMedia.data.key : null
      }
      const response = await api.post(`posts`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })

      setPosts((prevState) => [
        ...prevState,
        {
          id: response.data.id,
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          image_path: response.data.image_path,
          comment: response.data.comments
        }
      ])

      toast.success(`Postagem criada com sucesso!!`, {})
      location.reload()
    } catch (e: any) {
      if (e.response.data.statusCode === 400)
        toast.error(`Aconteceu um erro: ${e.response.data.message}`, {})
    }
  }
  const submitCommentHandler = async (
    event: React.FormEvent,
    post_id: string
  ) => {
    event.preventDefault()
    try {
      const body = {
        post_id: post_id,
        description: commentDescription.value
      }
      const response = await api.post(`comments`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
      if (response) toast.success('Comentário cadastrado com sucesso')
      location.reload()
    } catch (e: any) {
      if (e.response.status === 400) toast.error(e.response.message)
      toast.error('Aconteceu um error')
    }
  }
  const getToken = () => {
    const payload = Cookies.get('auth_token')
    let token = { id: '', name: '', exp: '', iat: '' }
    if (payload) token = jwt(payload)
    return token
  }
  useEffect(() => {
    getPostsHandler()
  }, [])

  return (
    <S.Base>
      <Header generateReport={generateReport}></Header>
      <S.Main>
        <Card>
          <Form onSubmit={submitHandler}>
            <Input
              placeholder="Título da pergunta"
              inputChangeHandler={onQuestionTitleHandler}
              onBlur={onQuestionTitleBlur}
              type="text"
              isValid={questionTitle.isValid}
            />
            <TextArea
              placeholder="Descrição da pergunta"
              textAreaChangeHandler={onQuestionDescriptionHandler}
              onBlur={onQuestionDescriptionBlur}
            ></TextArea>
            <Input
              placeholder="Faça o upload de uma imagem"
              isValid={true}
              onClick={clearPreviewFileImageWhenClicked}
              inputChangeHandler={onQuestionImageHandler}
              type="file"
            ></Input>
            {questionPreviewImage && (
              <S.Image src={questionPreviewImage}></S.Image>
            )}
            <Button>POSTAR</Button>
          </Form>
        </Card>
        {Array.isArray(posts)
          ? posts.map((post: Post, index: number) => (
              <Card key={index}>
                <S.Comment>
                  <S.UserName>{post.user.name}</S.UserName>
                  <S.Title>{post.title}</S.Title>
                  <S.Description>{post.description}</S.Description>
                </S.Comment>

                {post.image_path && (
                  <S.Image
                    src={
                      process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL +
                      post.image_path
                    }
                  ></S.Image>
                )}
                {Array.isArray(post.comment)
                  ? post.comment.map((comment: Comment, index) => (
                      <Card styleCard="medium" key={index}>
                        <S.Comment>
                          <S.UserName>{comment.user.name}</S.UserName>
                          {editComment.isEditting &&
                            editComment.idCommentToEdit === comment.id && (
                              <Input
                                type="text"
                                onBlur={onUpdateValueBlur}
                                inputChangeHandler={onUpdateValueHandler}
                                isValid={updateCommentValue.isValid}
                                placeholder="Atualizar comentário"
                              ></Input>
                            )}
                          {!editComment.isEditting && (
                            <S.Description>{comment.description}</S.Description>
                          )}
                          <S.CommentButtonHeaderBox>
                            {!editComment.isEditting && (
                              <Button
                                type="button"
                                onClick={(e) =>
                                  deleteCommentHandler(
                                    e,
                                    comment.id,
                                    comment.user.id,
                                    post.user.id
                                  )
                                }
                              >
                                Deletar
                              </Button>
                            )}
                            {editComment.isEditting &&
                              editComment.idCommentToEdit === comment.id && (
                                <Button
                                  type="button"
                                  onClick={cancelUpdateCommentHandler}
                                >
                                  Cancelar
                                </Button>
                              )}
                            {!editComment.isEditting && (
                              <Button
                                onClick={(e) =>
                                  updateCommentHandler(
                                    e,
                                    comment.user.id,
                                    comment.id
                                  )
                                }
                              >
                                Editar
                              </Button>
                            )}
                            {editComment.isEditting &&
                              editComment.idCommentToEdit === comment.id && (
                                <Button
                                  onClick={(e) =>
                                    confirmUpdateCommentHandler(e, comment.id)
                                  }
                                >
                                  Confirmar
                                </Button>
                              )}
                          </S.CommentButtonHeaderBox>
                        </S.Comment>
                      </Card>
                    ))
                  : null}

                <S.CommentArea>
                  <Form
                    onSubmit={(e) => {
                      submitCommentHandler(e, post.id)
                    }}
                  >
                    <TextArea
                      placeholder={'Adicionar novo comentário'}
                      textAreaChangeHandler={onCommentDescriptionHandler}
                      onBlur={onCommentDescriptionBlur}
                    ></TextArea>
                    <S.ButtonBox>
                      <Button>Enviar comentário</Button>
                      <Button
                        onClick={(e) =>
                          deletePostHandler(e, post.id, post.user.id)
                        }
                        type="button"
                      >
                        Deletar postagem
                      </Button>
                    </S.ButtonBox>
                  </Form>
                </S.CommentArea>
              </Card>
            ))
          : null}
      </S.Main>
    </S.Base>
  )
}
