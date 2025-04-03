import './Form.css'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formValuesSchema, FormValues, FormProps } from './zod-schema'

interface FormComponentProps extends FormProps {
  onSubmit: (data: FormValues) => void
}

const FormReact: FC<FormComponentProps> = ({
  label: initialLabel,
  text: initialText,
  left,
  right,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    defaultValues: {
      label: initialLabel,
      text: initialText,
      options: left ? 'left' : 'right'
    }
  })
  // const onSubmit = (data: FormValues) => {
  //   console.log('Форма отправлена:', data)
  //   setIsSubmitted(true) // Показываем модалку

  //   // Если передан внешний onSubmit (например, для отправки на сервер)
  //   if (externalOnSubmit) {
  //     externalOnSubmit(data)
  //   }
  // }

  // // Закрытие модалки
  // const closeModal = () => {
  //   setIsSubmitted(false)
  // }

  return (
    <div className="container">
      <h1>Fill this form and magic will happen!</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-custom"
          placeholder="label"
          {...register('label')}
        />
        {errors.label && <p>{errors.label.message}</p>}
        <input
          className="input-custom"
          placeholder="text"
          {...register('text')}
        />
        {errors.text && <p>{errors.text.message}</p>}
        <h1>Select you`re type</h1>
        <select {...register('options')} className="custom-option">
          <option className="custom-option" value="left">
            left
          </option>
          <option className="custom-option" value="right">
            right
          </option>
        </select>
        <button type="submit">
          Submit
        </button>
      </form>



            {/* {isSubmitted && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Форма успешно заполнена! 🎉</h2>
            <p>Данные сохранены.</p>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )} */}
    </div>
  )
}

export { FormReact }
