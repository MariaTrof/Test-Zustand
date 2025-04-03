export interface FormValues {
  label: string
  text: string
  options: 'left' | 'right'
}

export interface FormProps {
  label: string
  text: string
  left: boolean
  right: boolean
}
