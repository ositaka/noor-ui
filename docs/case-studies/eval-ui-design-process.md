<!-- CASE STUDY DOCUMENT - DO NOT DELETE -->
<!-- This is source material for blog posts and educational content -->

# Eval UI Design - Component Composition Plan

## 📋 Overview
This document outlines how to compose the AI Agent Evaluation UI using existing Noor UI components.

## 🎯 Page Structure

```
┌─────────────────────────────────────────────────────┐
│  Header (Breadcrumb + Title + Agent Selector)       │
├─────────────────────────────────────────────────────┤
│  Metrics Overview (4x Stats Cards)                  │
├─────────────────────────────────────────────────────┤
│  Tabs (E-commerce | Islamic Services)               │
│  ├─ Tab Content                                     │
│  │  ├─ Agent Info Card                              │
│  │  ├─ Filters (Date, Language, Status)             │
│  │  └─ Results Data Table                           │
│  └─ Detailed View Dialog/Sheet                      │
└─────────────────────────────────────────────────────┘
```

## 🧩 Component Mapping

### 1. Header Section
**Components Used:**
- `Breadcrumb` - Navigation trail
- `Badge` - Status indicators
- `Select` - Agent switcher

```tsx
<nav className="mb-8">
  <Breadcrumb>
    <BreadcrumbItem>Examples</BreadcrumbItem>
    <BreadcrumbItem>AI Evaluations</BreadcrumbItem>
  </Breadcrumb>
</nav>

<div className="flex items-center justify-between mb-8">
  <div>
    <h1>AI Agent Evaluations</h1>
    <p>OpenTelemetry-based evaluation dashboard</p>
  </div>
  <Select>
    <option>E-commerce Agent</option>
    <option>Islamic Services Agent</option>
  </Select>
</div>
```

### 2. Metrics Overview
**Components Used:**
- `Stats Card` (x4)
- `Badge` for trends

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <StatsCard
    title="Accuracy"
    value="93.2%"
    trend="+2.4%"
    icon={CheckCircle2}
  />
  <StatsCard
    title="Avg Latency"
    value="900ms"
    trend="-50ms"
    icon={Zap}
  />
  <StatsCard
    title="Shariah Compliance"
    value="100%"
    badge={<Badge variant="success">Verified</Badge>}
    icon={Shield}
  />
  <StatsCard
    title="Cost/1k Requests"
    value="$0.38"
    icon={DollarSign}
  />
</div>
```

### 3. Tabs for Different Agents
**Components Used:**
- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

```tsx
<Tabs defaultValue="ecommerce">
  <TabsList>
    <TabsTrigger value="ecommerce">
      E-commerce Support
      <Badge variant="outline">8 tests</Badge>
    </TabsTrigger>
    <TabsTrigger value="islamic">
      Islamic Services
      <Badge variant="outline">10 tests</Badge>
    </TabsTrigger>
  </TabsList>

  <TabsContent value="ecommerce">
    {/* E-commerce eval content */}
  </TabsContent>

  <TabsContent value="islamic">
    {/* Islamic services eval content */}
  </TabsContent>
</Tabs>
```

### 4. Agent Info Card
**Components Used:**
- `Card`
- `CardHeader`
- `CardContent`
- `Badge`
- `Separator`

```tsx
<Card className="mb-6">
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <h3>Islamic Services Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Specialized in Islamic practices & guidance
        </p>
      </div>
      <Badge variant="success">Production</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div>
        <span className="text-muted-foreground">Model</span>
        <p className="font-medium">GPT-4</p>
      </div>
      <div>
        <span className="text-muted-foreground">Version</span>
        <p className="font-medium">2.1.0</p>
      </div>
      <div>
        <span className="text-muted-foreground">Languages</span>
        <p className="font-medium">EN, AR</p>
      </div>
      <div>
        <span className="text-muted-foreground">Last Evaluated</span>
        <p className="font-medium">15 Nov 2024</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### 5. Filters Section
**Components Used:**
- `Input` (search)
- `Select` (language, category)
- `Checkbox` (pass/fail filter)
- `Button` (reset filters)

```tsx
<Card className="mb-6">
  <CardContent className="pt-6">
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search test cases..."
        className="max-w-xs"
      />
      <Select>
        <option>All Languages</option>
        <option>English</option>
        <option>Arabic</option>
      </Select>
      <Select>
        <option>All Categories</option>
        <option>Prayer</option>
        <option>Zakat</option>
        <option>Hajj</option>
        <option>Fasting</option>
      </Select>
      <div className="flex items-center gap-2">
        <Checkbox id="passed" />
        <label htmlFor="passed">Passed only</label>
      </div>
      <Button variant="outline">Reset Filters</Button>
    </div>
  </CardContent>
</Card>
```

### 6. Results Data Table
**Components Used:**
- `Data Table`
- `Badge` (status, language)
- `Progress` (score visualization)
- `Tooltip` (hover details)
- `Button` (view details)

```tsx
<DataTable
  columns={[
    {
      key: 'testCase',
      header: 'Test Case',
      sortable: true,
    },
    {
      key: 'language',
      header: 'Language',
      render: (row) => (
        <Badge variant={row.language === 'ar' ? 'default' : 'outline'}>
          {row.language === 'ar' ? 'العربية' : 'English'}
        </Badge>
      )
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Progress value={row.score} className="w-20" />
          <span className="text-sm font-medium">{row.score}%</span>
        </div>
      )
    },
    {
      key: 'latency',
      header: 'Latency',
      sortable: true,
      render: (row) => `${row.latency}ms`
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.passed ? 'success' : 'destructive'}>
          {row.passed ? 'Pass' : 'Fail'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openDetails(row.id)}
        >
          View Details
        </Button>
      )
    }
  ]}
  data={islamicServicesEvalResults}
/>
```

### 7. Detailed View (Dialog/Sheet)
**Components Used:**
- `Sheet` or `Dialog`
- `Card`
- `Badge`
- `Separator`
- `Code Block` (for showing input/output)

```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
    <SheetHeader>
      <SheetTitle>{selectedTest.testCase}</SheetTitle>
      <div className="flex gap-2">
        <Badge variant={selectedTest.passed ? 'success' : 'destructive'}>
          {selectedTest.passed ? 'Pass' : 'Fail'}
        </Badge>
        <Badge>{selectedTest.language === 'ar' ? 'العربية' : 'English'}</Badge>
        <Badge variant="outline">{selectedTest.metadata.category}</Badge>
      </div>
    </SheetHeader>

    <div className="space-y-6 mt-6">
      {/* Score */}
      <Card>
        <CardHeader>
          <h4>Score</h4>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={selectedTest.score} className="flex-1" />
            <span className="text-2xl font-bold">{selectedTest.score}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <div>
        <h4 className="font-semibold mb-2">User Input</h4>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm">{selectedTest.input}</p>
          </CardContent>
        </Card>
      </div>

      {/* Expected Output */}
      <div>
        <h4 className="font-semibold mb-2">Expected Output</h4>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              {selectedTest.expected}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actual Output */}
      <div>
        <h4 className="font-semibold mb-2">Actual Output</h4>
        <Card className={selectedTest.passed ? 'border-green-500' : 'border-red-500'}>
          <CardContent className="pt-4">
            <p className="text-sm">{selectedTest.actual}</p>
          </CardContent>
        </Card>
      </div>

      {/* Metadata */}
      <div>
        <h4 className="font-semibold mb-2">Metadata</h4>
        <Card>
          <CardContent className="pt-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="font-medium">{selectedTest.metadata.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Latency:</dt>
                <dd className="font-medium">{selectedTest.latency}ms</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tokens Used:</dt>
                <dd className="font-medium">{selectedTest.metadata.tokensUsed}</dd>
              </div>
              {selectedTest.metadata.shariahCompliant !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shariah Compliant:</dt>
                  <dd>
                    <Badge variant={selectedTest.metadata.shariahCompliant ? 'success' : 'destructive'}>
                      {selectedTest.metadata.shariahCompliant ? 'Yes' : 'No'}
                    </Badge>
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  </SheetContent>
</Sheet>
```

## 🎨 Special Features for Islamic Services

### Unique Badges
- **Shariah Compliance** badge with mosque icon
- **Calculation Method** badge (Umm Al-Qura, etc.)
- **Category** badges with icons (prayer, zakat, hajj)

### Arabic-Specific Styling
- Proper RTL layout for Arabic test cases
- Arabic numerals using `<ArabicNumber>` component
- Hijri dates using `<HijriDate>` component where relevant

## 📊 What This Showcases

### For E-commerce Example:
✅ Standard business use case
✅ Bilingual support (EN/AR)
✅ Customer service scenarios
✅ International appeal

### For Islamic Services Example:
✅ **Cultural awareness** - Shows understanding of GCC market
✅ **Unique positioning** - Nobody else has this
✅ **Technical depth** - Prayer time calculations, Zakat formulas
✅ **Shariah compliance** - Extra validation layer
✅ **Real-world utility** - Actually useful for the region

## 🚀 Impact on Portfolio

When employers see this, they'll think:

1. **"This person understands our market"** - Islamic services use case
2. **"They can build complex UIs"** - Sophisticated eval dashboard
3. **"They know modern AI tooling"** - OpenTelemetry integration
4. **"They care about quality"** - Detailed evaluation metrics
5. **"They think about culture"** - Shariah compliance checking

## 📝 Documentation to Include

On the example page, explain:

1. **What is OpenTelemetry (OTel)?**
   - Industry standard for observability
   - Traces, metrics, logs
   - Vendor-neutral format

2. **Why evaluate AI agents?**
   - Ensure accuracy before production
   - Monitor performance over time
   - Catch regressions early
   - Measure cost vs quality

3. **How to use this UI:**
   - Filter by language, category, status
   - Click rows to see details
   - Compare metrics across agents
   - Export results for reporting

4. **Components used:**
   - List all Noor UI components composed
   - Show how easy it is to build complex UIs
   - Emphasize RTL support throughout

---

This design uses **15+ different Noor UI components** composed together to create a sophisticated evaluation dashboard that would impress any GCC employer! 🎯
