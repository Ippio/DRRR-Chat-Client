import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Common/Modal/index'
import './styles.css'
import { closeModal } from '../../../actions/lounge'
import axios from 'axios'
import { setRoom } from '../../../actions/room';
import { useNavigate } from 'react-router-dom'
const inputs = [
    {
        id: 1,
        name: 'name',
        type: 'text',
        label: 'Tên phòng',
        placeholder: 'Tên phòng',
        errorMsg: 'Tên phòng bắt buộc phải có',
        maxLength: 20,
        required: true,
        autoFocus: true,
        autoComplete: 'off'
    },
    {
        id: 2,
        name: 'description',
        type: 'text',
        label: 'Giới thiệu phòng',
        placeholder: 'Giới thiệu phòng',
        errorMsg: '',
        maxLength: 140,
        autoComplete: 'off'
    },
    {
        id: 3,
        name: 'limit',
        onKeyPress: (event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        },
        label: 'Số lượng thành viên',
        placeholder: 'Số lượng thành viên',
        errorMsg: 'Tối thiểu 2 người và tối đa 20 người',
        pattern: `^([2-9]|1[0-9]|20)$`,
        required: true,
        autoComplete: 'off',
        maxLength: 2
    },
]

const NewRoomModal = () => {
    const modalState = useSelector(state => state.lounge.modalState)
    return (
        <Modal display={modalState} children={<FormModal />}>
        </Modal>
    )
}

const FormModal = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        limit: '',
    })
    const [errorMsg,setError] = useState('') 
    const modalState = useSelector(state => state.lounge.modalState)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const close = () => {
        dispatch(closeModal(!modalState))
    }
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newRoom = Object.fromEntries(formData.entries())
        try {
            const res = await axios.post('http://localhost:5000/room/create', { ...newRoom, members: [user],host: user.username })
            if (res) {
                const room = res.data.data
                close()
                dispatch(setRoom(room))
                const body = document.getElementsByTagName('body')[0]
                body.className = ''
                navigate(`/room/${room.name}`)
            }
        } catch (error) {
            console.log(error)
            setError('Tên phòng được sử dụng')
        }
    }
    const formHandleClick = ()=>{
        if(errorMsg) setError('')
    }
    return (
        <div className='wrap wrap-sm clearfix'>
            <h2 className="sr-only">Tạo phòng</h2>
            <div className="login-error" role="alert">{errorMsg}</div>
            <form onSubmit={(e) => handleSubmit(e)} onClick={formHandleClick}>
                {/* ---------------- */}
                {
                    inputs.map(input => (
                        <Input onChange={(e) => handleChange(e)} key={input.id} {...input} value={values[input.name]} />
                    ))
                }
                {/* ---------------- */}
                {/* <div className="form-group">
                    <label>
                        <input type="checkbox" id="form-user-adult" name="adult" />
                        {" Phòng 18+ "}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input type="checkbox" id="form-user-hidden" name="conceal" />
                        {" Hidden Room "}
                    </label>
                </div> */}
                {/* ---------------- */}
                <div className='pull-right'>
                    <span onClick={close} className='btn btn-default'>Back</span>
                    <input type='submit' name='submit' value="Tạo phòng" className="create-room-submit-input btn btn-primary" />
                </div>
                {/* ---------------- */}
                <div></div>
            </form>
        </div>
    )
}

const Input = ({ label, errorMsg, onChange, ...inputProps }) => {
    const [focused, setFocused] = useState('false')
    const handleFocus = () => {
        setFocused('true')
    }
    return (
        <div className='form-group'>
            <label>{label}</label>
            <input onChange={onChange} onBlur={handleFocus} {...inputProps} focused={focused} className="form-control"></input>
            <span className='error-msg'>{errorMsg}</span>
        </div>
    )
}

export default NewRoomModal