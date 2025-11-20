'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Upload, X, File, Image as ImageIcon, FileText, Film, Music } from 'lucide-react'
import { Card } from './card'
import { useDirection } from '../providers/direction-provider'

export interface FileUploadProps {
  onUpload?: (files: File[]) => void
  onChange?: (files: File[]) => void
  maxSize?: number // in bytes
  maxFiles?: number
  accept?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  value?: File[]
}

interface FileWithPreview extends File {
  preview?: string
}

const formatFileSize = (bytes: number, locale: 'en' | 'ar' = 'en'): string => {
  if (bytes === 0) return locale === 'ar' ? '٠ بايت' : '0 Bytes'
  const k = 1024
  const sizesEn = ['Bytes', 'KB', 'MB', 'GB']
  const sizesAr = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت']
  const sizes = locale === 'ar' ? sizesAr : sizesEn
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const getFileIcon = (file: File) => {
  const type = file.type
  if (type.startsWith('image/')) return <ImageIcon className="h-8 w-8" />
  if (type.startsWith('video/')) return <Film className="h-8 w-8" />
  if (type.startsWith('audio/')) return <Music className="h-8 w-8" />
  if (type.includes('pdf') || type.includes('document')) return <FileText className="h-8 w-8" />
  return <File className="h-8 w-8" />
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      onUpload,
      onChange,
      maxSize = 5 * 1024 * 1024, // 5MB default
      maxFiles = 1,
      accept,
      multiple = false,
      disabled = false,
      className,
      value = [],
    },
    ref
  ) => {
    const { locale } = useDirection()
    const [files, setFiles] = React.useState<FileWithPreview[]>(value as FileWithPreview[])
    const [dragActive, setDragActive] = React.useState(false)
    const [error, setError] = React.useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Bilingual text content
    const text = {
      en: {
        dropFiles: 'Drop files here',
        clickToUpload: 'Click to upload or drag and drop',
        acceptedFormats: 'Accepted formats',
        anyFileType: 'Any file type',
        maxSize: 'Max size',
        maxFiles: 'Max',
        files: 'files',
        addMoreFiles: 'Add More Files',
        fileSizeTooLarge: 'File size must be less than',
        fileTypeNotAccepted: 'File type not accepted. Accepted types',
        maxFilesReached: 'Maximum',
        filesAllowed: 'allowed',
      },
      ar: {
        dropFiles: 'أسقط الملفات هنا',
        clickToUpload: 'انقر للتحميل أو اسحب وأسقط',
        acceptedFormats: 'الصيغ المقبولة',
        anyFileType: 'أي نوع ملف',
        maxSize: 'الحجم الأقصى',
        maxFiles: 'بحد أقصى',
        files: 'ملفات',
        addMoreFiles: 'إضافة المزيد من الملفات',
        fileSizeTooLarge: 'يجب أن يكون حجم الملف أقل من',
        fileTypeNotAccepted: 'نوع الملف غير مقبول. الأنواع المقبولة',
        maxFilesReached: 'الحد الأقصى',
        filesAllowed: 'مسموح',
      },
    }
    const t = text[locale]

    // Sync with external value only on mount
    React.useEffect(() => {
      if (value.length > 0) {
        setFiles(value as FileWithPreview[])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array - only run on mount

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `${t.fileSizeTooLarge} ${formatFileSize(maxSize, locale)}`
      }

      if (accept) {
        const acceptedTypes = accept.split(',').map((type) => type.trim())
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
        const mimeType = file.type

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase()
          }
          if (type.endsWith('/*')) {
            return mimeType.startsWith(type.replace('/*', ''))
          }
          return mimeType === type
        })

        if (!isAccepted) {
          return `${t.fileTypeNotAccepted}: ${accept}`
        }
      }

      return null
    }

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles || disabled) return

      setError('')

      const fileArray = Array.from(newFiles)

      // Check max files
      if (files.length + fileArray.length > maxFiles) {
        setError(`${t.maxFilesReached} ${maxFiles} ${maxFiles > 1 ? t.files : ''} ${t.filesAllowed}`)
        return
      }

      // Validate each file
      for (const file of fileArray) {
        const validationError = validateFile(file)
        if (validationError) {
          setError(validationError)
          return
        }
      }

      // Create previews for images
      const filesWithPreviews = fileArray.map((file) => {
        const fileWithPreview = file as FileWithPreview
        if (file.type.startsWith('image/')) {
          fileWithPreview.preview = URL.createObjectURL(file)
        }
        return fileWithPreview
      })

      const updatedFiles = multiple ? [...files, ...filesWithPreviews] : filesWithPreviews

      setFiles(updatedFiles)
      onChange?.(updatedFiles)
      onUpload?.(updatedFiles)
    }

    const removeFile = (index: number) => {
      const fileToRemove = files[index]
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }

      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onChange?.(updatedFiles)
    }

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return

      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true)
      } else if (e.type === 'dragleave') {
        setDragActive(false)
      }
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (disabled) return

      handleFiles(e.dataTransfer.files)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    }

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault()
        inputRef.current?.click()
      }
    }

    // Cleanup previews on unmount
    React.useEffect(() => {
      return () => {
        files.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview)
          }
        })
      }
    }, [files])

    return (
      <div className={cn('w-full', className)}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-label="File upload"
        />

        {/* Drop Zone */}
        {files.length === 0 && (
          <div
            onClick={handleClick}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-label="Upload files"
            aria-disabled={disabled}
            className={cn(
              'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed',
              'px-6 py-10 text-center transition-colors cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              dragActive && 'border-primary bg-primary/5',
              !dragActive && 'border-muted-foreground/25 hover:border-muted-foreground/50',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <Upload className={cn('h-10 w-10 mb-4 text-muted-foreground', dragActive && 'text-primary')} />
            <p className="text-sm font-medium mb-1">
              {dragActive ? t.dropFiles : t.clickToUpload}
            </p>
            <p className="text-xs text-muted-foreground">
              {accept ? `${t.acceptedFormats}: ${accept}` : t.anyFileType}
              {maxSize && ` • ${t.maxSize}: ${formatFileSize(maxSize, locale)}`}
              {maxFiles > 1 && ` • ${t.maxFiles} ${maxFiles} ${t.files}`}
            </p>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4">
            {files.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="p-4">
                <div className="flex items-start gap-4">
                  {/* Preview or Icon */}
                  <div className="shrink-0">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        {getFileIcon(file)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatFileSize(file.size, locale)}
                      {file.type && ` • ${file.type}`}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add More Button */}
            {multiple && files.length < maxFiles && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClick}
                disabled={disabled}
                className="w-full"
              >
                <Upload className="h-4 w-4 me-2" />
                {t.addMoreFiles}
              </Button>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive mt-2" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
