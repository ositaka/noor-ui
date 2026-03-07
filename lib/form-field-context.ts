import * as React from 'react'

const FormFieldIdContext = React.createContext<string | undefined>(undefined)

export const FormFieldIdProvider = FormFieldIdContext.Provider

export function useFormFieldId() {
  return React.useContext(FormFieldIdContext)
}
