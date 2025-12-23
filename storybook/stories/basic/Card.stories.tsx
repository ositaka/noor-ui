import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Bell, Heart, Share2, Star, TrendingUp } from 'lucide-react';

const meta = {
  title: 'Basic/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content area. Add any content here.</p>
        </CardContent>
      </>
    ),
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => <Card {...args} className="w-[350px]" />,
};

// With Footer
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action cannot be undone.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// Notification Card
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">New Notification</CardTitle>
          </div>
          <Badge variant="secondary">New</Badge>
        </div>
        <CardDescription>2 minutes ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          You have a new message from the support team. Click to view details.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full">
          View Message
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="pb-2">
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-3xl">$45,231</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 me-1" />
          <span>+20.1% from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// Product Card
export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Premium Product</CardTitle>
            <CardDescription>High quality item</CardDescription>
          </div>
          <Badge>$99</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// Article Card
export const ArticleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Badge className="w-fit" variant="outline">
          Technology
        </Badge>
        <CardTitle className="mt-2">
          The Future of Web Development
        </CardTitle>
        <CardDescription>By John Doe • 5 min read</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Explore the latest trends and technologies shaping the future of web
          development in 2024 and beyond.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 me-1" />
            245
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 me-1" />
            Share
          </Button>
        </div>
        <Button size="sm">Read More</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// RTL Card
export const RTLCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>عنوان البطاقة</CardTitle>
        <CardDescription>وصف البطاقة يظهر هنا</CardDescription>
      </CardHeader>
      <CardContent>
        <p>محتوى البطاقة. يمكنك إضافة أي محتوى هنا.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">إلغاء</Button>
        <Button>تأكيد</Button>
      </CardFooter>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Card with Arabic content demonstrating RTL support. Automatically switches to RTL mode.',
      },
    },
  },
};

// RTL Product Card
export const RTLProductCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-blue-400 to-teal-400" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>منتج فاخر</CardTitle>
            <CardDescription>عنصر عالي الجودة</CardDescription>
          </div>
          <Badge>٩٩ ريال</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          منتج رائع بجودة عالية ومميزات استثنائية. مناسب لجميع الأذواق.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">أضف للسلة</Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Product card with Arabic text showing proper RTL layout. Automatically switches to RTL mode.',
      },
    },
  },
};

// Multiple Cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card className="w-[200px]">
        <CardHeader className="pb-3">
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl">12,543</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-green-600">
          <TrendingUp className="inline h-3 w-3 me-1" />
          +12.5%
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-3">
          <CardDescription>Revenue</CardDescription>
          <CardTitle className="text-2xl">$89,232</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-green-600">
          <TrendingUp className="inline h-3 w-3 me-1" />
          +8.3%
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-3">
          <CardDescription>Rating</CardDescription>
          <CardTitle className="text-2xl flex items-center gap-1">
            4.8 <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          From 1,234 reviews
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
