import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card', () => {
  it('should render card with all parts', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('should apply custom className to Card', () => {
    const { container } = render(
      <Card className="custom-card-class">
        <CardContent>Content</CardContent>
      </Card>
    )
    const card = container.firstChild
    expect(card).toHaveClass('custom-card-class')
  })

  it('should render CardHeader with proper structure', () => {
    render(
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
    )
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H3')
  })

  it('should render CardDescription with muted foreground', () => {
    render(<CardDescription>Description text</CardDescription>)
    const description = screen.getByText('Description text')
    expect(description).toHaveClass('text-muted-foreground')
  })

  it('should apply proper spacing classes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    )
    const header = screen.getByText('Title').parentElement
    expect(header).toHaveClass('flex', 'flex-col')
  })
})
