import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteFormValues } from "../../types/note";
import type { ModalProps } from "../Modal/Modal";
import { createNote } from "@/lib/api";


const initialState = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Please give your note a title"),
  content: Yup.string().required("Please add some more details"),
  tag: Yup.string().required("Please, choose one of the tags"),
});

const NoteForm = ({onClose}: ModalProps) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']})
        }
    })
    const handleSubmit = (
  values: NoteFormValues,
  actions: FormikHelpers<NoteFormValues>
) => {
  mutation.mutate(values, {
    onSuccess: () => {
        onClose()
     actions.resetForm();   
    }
  })
  
};
  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
