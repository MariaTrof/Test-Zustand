import { create } from 'zustand'
import { FormStore } from './types/form.types'

export const useFormStore = create<FormStore>((set) => ({
    formData: {name: ''},
    submittedData: [],
    setFormData: (data) => set({formData: data}),
    submitForm: () => 
        set((state) => ({
            submittedData: [
                ...state.submittedData,
                {...state.formData, id: Date.now()},
            ],
            formData: {name: ''},
        })),
        resetForm: () => set({ formData: {name: ''}})
}))