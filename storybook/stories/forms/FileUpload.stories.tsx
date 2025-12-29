import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../../../components/ui/file-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

/**
 * File Upload Component Stories
 *
 * All examples are taken from /app/(docs)/components/file-upload/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: File Upload provides drag-and-drop file upload with validation,
 * image previews, and full accessibility support. Has built-in bilingual support.
 */

const meta = {
  title: 'Forms/File Upload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onUpload: {
      control: false,
    },
    onChange: {
      control: false,
    },
    maxSize: {
      control: { type: 'number' },
    },
    maxFiles: {
      control: { type: 'number' },
    },
    accept: {
      control: { type: 'text' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-full max-w-xl">
        <FileUpload
          {...args}
          onChange={setFiles}
          onUpload={(files) => console.log('Uploaded:', files)}
        />
        {files.length > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            {files.length} file(s) selected
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// Basic File Upload - from component page lines 224-228
export const BasicFileUpload: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-full max-w-xl">
        <FileUpload
          onChange={setFiles}
          onUpload={(files) => console.log('Uploaded:', files)}
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic file upload with drag-and-drop support and default settings (5MB max, single file).',
      },
    },
  },
};

// Images Only - from component page lines 300-304
export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardContent className="p-6">
          <FileUpload
            accept="image/*"
            onChange={setFiles}
            onUpload={(files) => console.log('Uploading images:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'File upload that only accepts image files (JPEG, PNG, GIF, WebP, etc.) with automatic image previews.',
      },
    },
  },
};

// Multiple Files - from component page lines 321-326
export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardContent className="p-6">
          <FileUpload
            multiple
            maxFiles={5}
            onChange={setFiles}
            onUpload={(files) => console.log('Uploading files:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'File upload that allows multiple files (up to 5) with "Add More Files" button.',
      },
    },
  },
};

// Custom Size Limit - from component page lines 343-347
export const CustomSizeLimit: Story = {
  render: () => (
    <Card className="w-full max-w-xl">
      <CardContent className="p-6">
        <FileUpload
          maxSize={2 * 1024 * 1024} // 2MB
          onChange={() => {}}
          onUpload={(files) => console.log('Uploading files:', files)}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'File upload with custom size limit of 2MB (instead of default 5MB).',
      },
    },
  },
};

// Documents Only
export const DocumentsOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>PDF and Word documents only</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            accept=".pdf,.doc,.docx"
            onChange={setFiles}
            onUpload={(files) => console.log('Uploading documents:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'File upload restricted to PDF and Word documents only.',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <FileUpload
        disabled
        onChange={() => {}}
        onUpload={() => {}}
      />
      <p className="text-sm text-muted-foreground mt-4">File upload is disabled</p>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'File upload in disabled state.',
      },
    },
  },
};

// RTL Example - Basic (component has built-in bilingual support)
export const RTLExample: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-full max-w-xl">
        <FileUpload
          onChange={setFiles}
          onUpload={(files) => console.log('تم التحميل:', files)}
        />
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic file upload with Arabic text in RTL mode. Component automatically displays bilingual text based on locale.',
      },
    },
  },
};

// RTL Images Only
export const RTLImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardContent className="p-6">
          <FileUpload
            accept="image/*"
            onChange={setFiles}
            onUpload={(files) => console.log('تحميل الصور:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Image-only file upload with Arabic interface in RTL mode.',
      },
    },
  },
};

// RTL Multiple Files
export const RTLMultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardContent className="p-6">
          <FileUpload
            multiple
            maxFiles={5}
            onChange={setFiles}
            onUpload={(files) => console.log('تحميل الملفات:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Multiple file upload with Arabic interface showing "إضافة المزيد من الملفات" button in RTL.',
      },
    },
  },
};

// RTL Documents Upload
export const RTLDocumentsUpload: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>تحميل المستندات</CardTitle>
          <CardDescription>مستندات PDF و Word فقط</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            accept=".pdf,.doc,.docx"
            onChange={setFiles}
            onUpload={(files) => console.log('تحميل المستندات:', files)}
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Document upload with Arabic labels and RTL layout for PDF and Word files.',
      },
    },
  },
};
