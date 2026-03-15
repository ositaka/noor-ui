'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Callout } from '@/components/ui/callout'
import { FileUpload } from '@/components/ui/file-upload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  FolderOpen,
  FilePdf,
  FileJpg,
  FileDoc,
  Upload,
  Download,
  Warning,
  Clock,
  Plus,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

interface Document {
  id: string
  name: string
  nameAr: string
  type: 'pdf' | 'jpg' | 'doc'
  category: 'id' | 'certificates' | 'financial' | 'photos'
  size: string
  uploadDate: string
  uploadDateAr: string
  expiryDate?: string
  expiryDateAr?: string
  expiringSoon?: boolean
}

const t = {
  en: {
    dashboard: 'Dashboard',
    documentVault: 'Document Vault',
    subtitle: 'Manage and organize your uploaded documents',
    all: 'All',
    idDocuments: 'ID Documents',
    certificates: 'Certificates',
    financial: 'Financial',
    photos: 'Photos',
    uploadNew: 'Upload Document',
    documentType: 'Document Type',
    selectType: 'Select document type',
    nationalIdType: 'National ID',
    passportType: 'Passport',
    tenancyType: 'Tenancy Contract',
    salaryType: 'Salary Certificate',
    birthCertType: 'Birth Certificate',
    photoType: 'Personal Photo',
    nocType: 'NOC Letter',
    otherType: 'Other',
    uploadFile: 'Upload File',
    acceptedFormats: 'PDF, JPG, PNG or DOC up to 10MB',
    upload: 'Upload',
    cancel: 'Cancel',
    expiresOn: 'Expires',
    uploadedOn: 'Uploaded',
    expiringSoonTitle: 'Documents Expiring Soon',
    expiringSoonDesc: 'The following documents will expire within 30 days. Please upload updated versions.',
    download: 'Download',
    noDocuments: 'No documents in this category',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    documentVault: 'خزنة المستندات',
    subtitle: 'إدارة وتنظيم المستندات المحملة',
    all: 'الكل',
    idDocuments: 'وثائق الهوية',
    certificates: 'الشهادات',
    financial: 'المالية',
    photos: 'الصور',
    uploadNew: 'تحميل مستند',
    documentType: 'نوع المستند',
    selectType: 'اختر نوع المستند',
    nationalIdType: 'الهوية الوطنية',
    passportType: 'جواز السفر',
    tenancyType: 'عقد الإيجار',
    salaryType: 'شهادة الراتب',
    birthCertType: 'شهادة الميلاد',
    photoType: 'الصورة الشخصية',
    nocType: 'شهادة عدم ممانعة',
    otherType: 'أخرى',
    uploadFile: 'رفع الملف',
    acceptedFormats: 'PDF أو JPG أو PNG أو DOC بحد أقصى ١٠ ميغابايت',
    upload: 'رفع',
    cancel: 'إلغاء',
    expiresOn: 'ينتهي',
    uploadedOn: 'تم الرفع',
    expiringSoonTitle: 'مستندات تنتهي صلاحيتها قريباً',
    expiringSoonDesc: 'المستندات التالية ستنتهي صلاحيتها خلال ٣٠ يوم. يرجى رفع نسخ محدثة.',
    download: 'تنزيل',
    noDocuments: 'لا توجد مستندات في هذا التصنيف',
  },
}

const documents: Document[] = [
  {
    id: '1',
    name: 'National ID - Front & Back',
    nameAr: 'الهوية الوطنية - الأمام والخلف',
    type: 'pdf',
    category: 'id',
    size: '1.2 MB',
    uploadDate: 'Jan 15, 2026',
    uploadDateAr: '١٥ يناير ٢٠٢٦',
    expiryDate: 'Dec 31, 2027',
    expiryDateAr: '٣١ ديسمبر ٢٠٢٧',
  },
  {
    id: '2',
    name: 'Passport Copy',
    nameAr: 'صورة جواز السفر',
    type: 'pdf',
    category: 'id',
    size: '2.4 MB',
    uploadDate: 'Jan 15, 2026',
    uploadDateAr: '١٥ يناير ٢٠٢٦',
    expiryDate: 'Aug 20, 2030',
    expiryDateAr: '٢٠ أغسطس ٢٠٣٠',
  },
  {
    id: '3',
    name: 'Personal Photo',
    nameAr: 'الصورة الشخصية',
    type: 'jpg',
    category: 'photos',
    size: '450 KB',
    uploadDate: 'Feb 10, 2026',
    uploadDateAr: '١٠ فبراير ٢٠٢٦',
  },
  {
    id: '4',
    name: 'Tenancy Contract (Tawtheeq)',
    nameAr: 'عقد الإيجار (توثيق)',
    type: 'pdf',
    category: 'financial',
    size: '3.1 MB',
    uploadDate: 'Mar 1, 2026',
    uploadDateAr: '١ مارس ٢٠٢٦',
    expiryDate: 'Feb 28, 2027',
    expiryDateAr: '٢٨ فبراير ٢٠٢٧',
  },
  {
    id: '5',
    name: 'Salary Certificate',
    nameAr: 'شهادة الراتب',
    type: 'pdf',
    category: 'financial',
    size: '890 KB',
    uploadDate: 'Feb 1, 2026',
    uploadDateAr: '١ فبراير ٢٠٢٦',
    expiryDate: 'Mar 30, 2026',
    expiryDateAr: '٣٠ مارس ٢٠٢٦',
    expiringSoon: true,
  },
  {
    id: '6',
    name: 'Birth Certificate',
    nameAr: 'شهادة الميلاد',
    type: 'pdf',
    category: 'certificates',
    size: '1.8 MB',
    uploadDate: 'Dec 10, 2025',
    uploadDateAr: '١٠ ديسمبر ٢٠٢٥',
  },
  {
    id: '7',
    name: 'Trade License',
    nameAr: 'الرخصة التجارية',
    type: 'pdf',
    category: 'certificates',
    size: '2.2 MB',
    uploadDate: 'Jan 20, 2026',
    uploadDateAr: '٢٠ يناير ٢٠٢٦',
    expiryDate: 'Apr 15, 2026',
    expiryDateAr: '١٥ أبريل ٢٠٢٦',
    expiringSoon: true,
  },
  {
    id: '8',
    name: 'NOC Letter',
    nameAr: 'شهادة عدم ممانعة',
    type: 'doc',
    category: 'certificates',
    size: '340 KB',
    uploadDate: 'Feb 20, 2026',
    uploadDateAr: '٢٠ فبراير ٢٠٢٦',
  },
  {
    id: '9',
    name: 'Medical Fitness Certificate',
    nameAr: 'شهادة اللياقة الطبية',
    type: 'pdf',
    category: 'certificates',
    size: '1.1 MB',
    uploadDate: 'Mar 5, 2026',
    uploadDateAr: '٥ مارس ٢٠٢٦',
    expiryDate: 'Sep 5, 2026',
    expiryDateAr: '٥ سبتمبر ٢٠٢٦',
  },
]

function FileTypeIcon({ type }: { type: Document['type'] }) {
  switch (type) {
    case 'pdf':
      return <FilePdf className="h-6 w-6 text-destructive" />
    case 'jpg':
      return <FileJpg className="h-6 w-6 text-info" />
    case 'doc':
      return <FileDoc className="h-6 w-6 text-primary" />
  }
}

export default function DocumentsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const [activeTab, setActiveTab] = React.useState('all')

  const filteredDocs = activeTab === 'all'
    ? documents
    : documents.filter((d) => d.category === activeTab)

  const expiringSoon = documents.filter((d) => d.expiringSoon)

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h.documentVault}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <FolderOpen className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{h.documentVault}</h1>
            <p className="text-muted-foreground text-sm">{h.subtitle}</p>
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 me-2" />
              {h.uploadNew}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{h.uploadNew}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="doc-type">{h.documentType}</Label>
                <Select>
                  <SelectTrigger id="doc-type">
                    <SelectValue placeholder={h.selectType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national-id">{h.nationalIdType}</SelectItem>
                    <SelectItem value="passport">{h.passportType}</SelectItem>
                    <SelectItem value="tenancy">{h.tenancyType}</SelectItem>
                    <SelectItem value="salary">{h.salaryType}</SelectItem>
                    <SelectItem value="birth-cert">{h.birthCertType}</SelectItem>
                    <SelectItem value="photo">{h.photoType}</SelectItem>
                    <SelectItem value="noc">{h.nocType}</SelectItem>
                    <SelectItem value="other">{h.otherType}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{h.uploadFile}</Label>
                <FileUpload
                  accept=".pdf,.jpg,.png,.doc,.docx"
                  maxSize={10 * 1024 * 1024}
                />
                <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
              </div>
              <Button className="w-full">
                <Upload className="h-4 w-4 me-2" />
                {h.upload}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expiry Warning */}
      {expiringSoon.length > 0 && (
        <Callout type="warning" title={h.expiringSoonTitle} className="mb-6">
          <p>{h.expiringSoonDesc}</p>
          <ul className="mt-2 space-y-1">
            {expiringSoon.map((doc) => (
              <li key={doc.id} className="text-sm flex items-center gap-2">
                <Clock className="h-3 w-3 shrink-0" />
                {isRTL ? doc.nameAr : doc.name} — {h.expiresOn}: {isRTL ? doc.expiryDateAr : doc.expiryDate}
              </li>
            ))}
          </ul>
        </Callout>
      )}

      {/* Document Tabs & Grid */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">{h.all} ({documents.length})</TabsTrigger>
          <TabsTrigger value="id">{h.idDocuments} ({documents.filter((d) => d.category === 'id').length})</TabsTrigger>
          <TabsTrigger value="certificates">{h.certificates} ({documents.filter((d) => d.category === 'certificates').length})</TabsTrigger>
          <TabsTrigger value="financial">{h.financial} ({documents.filter((d) => d.category === 'financial').length})</TabsTrigger>
          <TabsTrigger value="photos">{h.photos} ({documents.filter((d) => d.category === 'photos').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredDocs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {h.noDocuments}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocs.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <FileTypeIcon type={doc.type} />
                      </div>
                      <Badge variant="outline" className="text-xs uppercase">
                        {doc.type}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {isRTL ? doc.nameAr : doc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {doc.size}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground mb-4">
                      <p>{h.uploadedOn}: {isRTL ? doc.uploadDateAr : doc.uploadDate}</p>
                      {doc.expiryDate && (
                        <p className={doc.expiringSoon ? 'text-destructive font-medium' : ''}>
                          {doc.expiringSoon && <Warning className="h-3 w-3 inline me-1" />}
                          {h.expiresOn}: {isRTL ? doc.expiryDateAr : doc.expiryDate}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 me-2" />
                        {h.download}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
