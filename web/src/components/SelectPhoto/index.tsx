import React, { useContext, useEffect, useState } from 'react';

// Icones e Imagens //
import avatarDefault from './../../assets/images/user.png'
import cameraIcon from './../../assets/images/icons/camera.svg'
import saveIcon from './../../assets/images/icons/save.svg'
import trashIcon from './../../assets/images/icons/trash-2.svg'
import xIcon from './../../assets/images/icons/x.svg'

// Context & API//
import auth from './../../contexts/auth'
import api from '../../services/api';

// CSS //
import './style.css'

// URL - Arquivos Estáticos //
const staticFileURL = 'http://localhost:8081/public'

interface SelectPhotoProps {
    avatar: string,
    onPhotoChange: (avatar: string | null) => void,
    handleToVisible: (value: boolean) => void
}

const SelectPhoto: React.FC<SelectPhotoProps> = ({ avatar, onPhotoChange, handleToVisible }) => {

    const { user } = useContext(auth)

    const [photo, setPhoto] = useState('')
    const [file, setFile] = useState('') as any

    // Carrega a imagem passada como prop //
    useEffect(() => {
        avatar ? setPhoto(`${staticFileURL}/${avatar}`) : setPhoto('')
    }, [avatar])

    function uploadImage(event: any) {

        if (event.target.files || event.target.files[0]) {
            const data = event.target.files[0]

            setPhoto(URL.createObjectURL(data))
            setFile(data)
        }
    }

    function savePhoto() {
        if (photo) {

            const formData = new FormData()
            const { email } = user as any

            formData.append('file', file)
            formData.append('email', email)

            api.post('/upload', formData)
                .then(res => {
                    onPhotoChange(res.data)
                    handleToVisible(false)
                })
                .catch(e => {
                    alert(e)
                })
        }
        else {
            onPhotoChange('')
            handleToVisible(false)
        }
    }

    function deletePhoto() {

        if (photo) {
            const { email } = user as any

            api.delete('/upload', {
                params: { email, image: photo }
            })
                .then(res => {
                    onPhotoChange('')
                    handleToVisible(false)
                })
                .catch(e => {
                    alert(e.response.data)
                })
        } else {
            alert('Não há foto para excluir')
        }
    }

    return (
        <div id='container'>
            <div className='content'>

                <h1 className='title'>Foto de Perfil</h1>

                <img src={photo ? photo : avatarDefault} alt="Foto de Perfil" className='photo' />

                <div id='choose-photo-buttom'>

                    {/* Select Image */}
                    <input
                        type='file'
                        className='inputFile'
                        id='fileChooser'
                        accept='image/jpeg, image/png, image/jpg'
                        onChange={(e) => uploadImage(e)}
                        multiple={false}
                    />
                    <label id='select-photo' className='button' htmlFor='fileChooser'>
                        <img src={cameraIcon} alt="Escolher Foto" />
                        <span>Escolher Foto</span>
                    </label>

                </div>

                <div className='actions-buttons'>

                    <button id='save' className='button' onClick={savePhoto}>
                        <span>Salvar</span>
                        <img src={saveIcon} alt="Salvar" />
                    </button>

                    <button id='delete' className='button'>
                        <span>Excluir</span>
                        <img src={trashIcon} alt="Deletar" onClick={deletePhoto} />
                    </button>

                    <button id='clear' className='button' onClick={() => { handleToVisible(false) }}>
                        <span>Fechar</span>
                        <img src={xIcon} alt="Fechar" />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default SelectPhoto;