export type ValidationFunc = (value: any) => boolean | string

export function fieldRequired(value: any): boolean | string {
  return !!value || 'Field is required'
}
