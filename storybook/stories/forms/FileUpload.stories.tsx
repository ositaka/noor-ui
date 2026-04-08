import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../../../components/ui/file-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';
import { fn } from 'storybook/test';

/**
 *
 *
 * image previews, and full accessibility support. Has built-in bilingual support.
 *
 */

const meta = {
  title: 'Advanced Forms & Inputs/File Upload',
  component: FileUpload,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onUpload: {
      control: false
    },
    onChange: {
      control: false
    },
    maxSize: {
      control: { type: 'number' }
    },
    maxFiles: {
      control: { type: 'number' }
    },
    accept: {
      control: { type: 'text' }
    },
    multiple: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onChange: fn(),
    onUpload: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-full max-w-xl">
        <FileUpload
          {...args}
          onChange={(newFiles) => {
            setFiles(newFiles);
            args.onChange?.(newFiles);
          }}
          onUpload={args.onUpload}
        />
        {files.length > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            {isRTL ? `${files.length} ملف/ملفات محددة` : `${files.length} file(s) selected`}
          </p>
        )}
      </div>
    );
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic file upload with drag-and-drop support and default settings (5MB max, single file).'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File upload that only accepts image files (JPEG, PNG, GIF, WebP, etc.) with automatic image previews.'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File upload that allows multiple files (up to 5) with "Add More Files" button.'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File upload with custom size limit of 2MB (instead of default 5MB).'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File upload restricted to PDF and Word documents only.'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File upload in disabled state.'
      }
    }
  }
};

