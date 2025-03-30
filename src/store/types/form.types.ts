export interface FormData{
id: number;
name: string;
}

export interface FormStore{
formData: {name: string};
submittedData: FormData[];
setFormData: (data: {name: string}) => void;
submitForm: () => void;
resetForm: () => void;
}