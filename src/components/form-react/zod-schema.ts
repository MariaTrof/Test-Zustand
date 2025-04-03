import { z } from 'zod'

export const formValuesSchema = z.object({
  label: z
    .string()
    .min(1, 'Label must not be emppty')
    .max(80, 'Max lenght for Label is 80 symbols'),
  text: z.string().min(5, 'Text must be longer than 5 symbols'),
  options: z
    .enum(['left', 'right'])
    .refine((val) => val === 'left' || val === 'right', {
      message: 'Choose left or right'
    })
})

export const formPropsSchema = z.object({
  label: z.string().min(1),
  text: z.string().min(5),
  left: z.boolean(),
  right: z.boolean()
})

export type FormValues = z.infer<typeof formValuesSchema>
export type FormProps = z.infer<typeof formPropsSchema>
