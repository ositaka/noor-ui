'use client'

import * as React from 'react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Stepper, type Step } from '@/components/ui/stepper'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  ecommerceEvalResults,
  ecommerceMetrics,
  ecommerceAgentInfo,
  type EvalResult,
} from '@/lib/mock-data/eval-ecommerce'
import {
  islamicServicesEvalResults,
  islamicServicesMetrics,
  islamicServicesAgentInfo,
  type IslamicEvalResult,
} from '@/lib/mock-data/eval-islamic-services'
import {
  CheckCircle2,
  XCircle,
  Zap,
  DollarSign,
  Shield,
  TrendingUp,
  Search,
  ChevronRight,
  Activity,
  Play,
  Loader2,
  Check,
  Download,
  Pause,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RunningTest {
  id: string
  testCase: string
  status: 'pending' | 'running' | 'complete' | 'failed'
  score?: number
  passed?: boolean
}

export default function AIAgentEvalsPage() {
  const { direction, locale } = useDirection()
  const t = content[locale]

  const [selectedTab, setSelectedTab] = React.useState('ecommerce')
  const [selectedTest, setSelectedTest] = React.useState<EvalResult | IslamicEvalResult | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [languageFilter, setLanguageFilter] = React.useState<string>('all')
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all')
  const [passedOnlyFilter, setPassedOnlyFilter] = React.useState(false)

  // Evaluation workflow state
  const [isEvalFlowOpen, setIsEvalFlowOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [selectedAgent, setSelectedAgent] = React.useState<'ecommerce' | 'islamic'>('ecommerce')
  const [selectedTests, setSelectedTests] = React.useState<string[]>([])
  const [runningTests, setRunningTests] = React.useState<RunningTest[]>([])
  const [evalProgress, setEvalProgress] = React.useState(0)
  const [completedCount, setCompletedCount] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([])
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false)

  // Live metrics during evaluation
  const [liveMetrics, setLiveMetrics] = React.useState({
    accuracy: 0,
    avgLatency: 0,
    avgScore: 0,
    passRate: 0,
    shariahCompliance: 100,
  })

  // Get current agent data
  const currentResults = selectedTab === 'ecommerce' ? ecommerceEvalResults : islamicServicesEvalResults
  const currentMetrics = selectedTab === 'ecommerce' ? ecommerceMetrics : islamicServicesMetrics
  const currentAgentInfo = selectedTab === 'ecommerce' ? ecommerceAgentInfo : islamicServicesAgentInfo

  // Filter results
  const filteredResults = currentResults.filter((result) => {
    if (searchQuery && !result.testCase.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (languageFilter !== 'all' && result.language !== languageFilter) {
      return false
    }
    if (passedOnlyFilter && !result.passed) {
      return false
    }
    if (categoryFilter !== 'all') {
      const islamicResult = result as IslamicEvalResult
      if (islamicResult.metadata?.category !== categoryFilter) {
        return false
      }
    }
    return true
  })

  const openDetails = (test: EvalResult | IslamicEvalResult) => {
    setSelectedTest(test)
    setIsDetailOpen(true)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setLanguageFilter('all')
    setCategoryFilter('all')
    setPassedOnlyFilter(false)
  }

  // Evaluation workflow functions
  const evalSteps: Step[] = [
    { id: 'configure', title: 'Configure', description: 'Select agent and tests' },
    { id: 'running', title: 'Running', description: 'Tests in progress' },
    { id: 'complete', title: 'Complete', description: 'View results' },
  ]

  const availableTests = selectedAgent === 'ecommerce' ? ecommerceEvalResults : islamicServicesEvalResults

  const startEvaluation = () => {
    setIsEvalFlowOpen(true)
    setCurrentStep(0)
    setSelectedAgent('ecommerce')
    setSelectedTests([])
    setRunningTests([])
    setEvalProgress(0)
    setCompletedCount(0)
  }

  const toggleTestSelection = (testId: string) => {
    setSelectedTests(prev =>
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    )
  }

  const selectAllTests = () => {
    setSelectedTests(availableTests.map(t => t.id))
  }

  const deselectAllTests = () => {
    setSelectedTests([])
  }

  const calculateLiveMetrics = (tests: RunningTest[]) => {
    const completed = tests.filter(t => t.status === 'complete' || t.status === 'failed')
    if (completed.length === 0) return

    const totalScore = completed.reduce((acc, t) => acc + (t.score || 0), 0)
    const passed = completed.filter(t => t.passed).length
    const avgScore = totalScore / completed.length
    const passRate = (passed / completed.length) * 100

    setLiveMetrics({
      accuracy: passRate,
      avgLatency: 900, // Would be calculated from actual latencies
      avgScore,
      passRate,
      shariahCompliance: selectedAgent === 'islamic' ? 100 : 0,
    })
  }

  const estimatedDuration = selectedTests.length * 1.2 // ~1.2 seconds per test

  const startRunning = () => {
    const testsToRun = availableTests.filter(t => selectedTests.includes(t.id))
    setRunningTests(testsToRun.map(t => ({
      id: t.id,
      testCase: t.testCase,
      status: 'pending',
    })))
    setCurrentStep(1)
    setEvalProgress(0)
    setCompletedCount(0)
    setIsPaused(false)
    setLiveMetrics({
      accuracy: 0,
      avgLatency: 0,
      avgScore: 0,
      passRate: 0,
      shariahCompliance: selectedAgent === 'islamic' ? 100 : 0,
    })

    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    // Mock streaming - run tests one by one
    let currentIndex = 0
    const runNextTest = () => {
      if (currentIndex >= testsToRun.length) {
        // All tests complete
        setEvalProgress(100)
        const timeout = setTimeout(() => setCurrentStep(2), 500)
        timeoutsRef.current.push(timeout)
        return
      }

      const currentTest = testsToRun[currentIndex]

      // Set test as running
      setRunningTests(prev => {
        const updated = prev.map(t =>
          t.id === currentTest.id ? { ...t, status: 'running' as 'running' } : t
        )
        return updated
      })

      // Simulate test execution (800ms - 1500ms per test)
      const duration = 800 + Math.random() * 700
      const timeout1 = setTimeout(() => {
        // Complete the test
        setRunningTests(prev => {
          const updated = prev.map(t =>
            t.id === currentTest.id
              ? {
                  ...t,
                  status: (currentTest.passed ? 'complete' : 'failed') as 'complete' | 'failed',
                  score: currentTest.score,
                  passed: currentTest.passed,
                }
              : t
          )
          // Update live metrics
          calculateLiveMetrics(updated)
          return updated
        })

        const completed = currentIndex + 1
        setCompletedCount(completed)
        setEvalProgress(Math.round((completed / testsToRun.length) * 100))

        currentIndex++
        const timeout2 = setTimeout(runNextTest, 300) // Small delay between tests
        timeoutsRef.current.push(timeout2)
      }, duration)
      timeoutsRef.current.push(timeout1)
    }

    // Start the first test after a brief delay
    const timeout = setTimeout(runNextTest, 500)
    timeoutsRef.current.push(timeout)
  }

  const pauseEvaluation = () => {
    setIsPaused(true)
    // Clear all pending timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const cancelEvaluation = () => {
    pauseEvaluation()
    closeEvalFlow()
  }

  const showExportDialog = () => {
    setIsExportDialogOpen(true)
  }

  const confirmExport = () => {
    // Generate OpenTelemetry-compliant trace format
    const traceId = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')

    const baseTimeNano = Date.now() * 1000000 // Convert to nanoseconds

    // Create OTel trace with spans for each test
    const otelReport = {
      resourceSpans: [
        {
          resource: {
            attributes: [
              {
                key: 'service.name',
                value: { stringValue: 'ai-agent-evaluator' }
              },
              {
                key: 'service.version',
                value: { stringValue: '1.0.0' }
              },
              {
                key: 'agent.type',
                value: { stringValue: selectedAgent }
              },
              {
                key: 'agent.name',
                value: {
                  stringValue: selectedAgent === 'ecommerce'
                    ? 'E-commerce Support Agent'
                    : 'Islamic Services Assistant'
                }
              },
            ]
          },
          scopeSpans: [
            {
              scope: {
                name: 'eval-framework',
                version: '1.0.0'
              },
              spans: runningTests.map((test, index) => {
                const spanId = Array.from({ length: 16 }, () =>
                  Math.floor(Math.random() * 16).toString(16)
                ).join('')

                const startTime = baseTimeNano + (index * 1200000000) // 1.2s apart
                const endTime = startTime + 900000000 // 900ms duration

                return {
                  traceId,
                  spanId,
                  name: `eval.test.${test.id}`,
                  kind: 'SPAN_KIND_INTERNAL',
                  startTimeUnixNano: startTime.toString(),
                  endTimeUnixNano: endTime.toString(),
                  attributes: [
                    {
                      key: 'test.id',
                      value: { stringValue: test.id }
                    },
                    {
                      key: 'test.name',
                      value: { stringValue: test.testCase }
                    },
                    {
                      key: 'test.status',
                      value: { stringValue: test.status }
                    },
                    {
                      key: 'test.score',
                      value: { intValue: test.score || 0 }
                    },
                    {
                      key: 'test.passed',
                      value: { boolValue: test.passed || false }
                    },
                    {
                      key: 'test.language',
                      value: {
                        stringValue: availableTests.find(t => t.id === test.id)?.language || 'en'
                      }
                    },
                  ],
                  status: {
                    code: test.passed ? 'STATUS_CODE_OK' : 'STATUS_CODE_ERROR',
                    message: test.passed ? 'Test passed' : 'Test failed'
                  }
                }
              })
            }
          ]
        }
      ],
      // Include metrics in OTel format
      resourceMetrics: [
        {
          resource: {
            attributes: [
              {
                key: 'service.name',
                value: { stringValue: 'ai-agent-evaluator' }
              }
            ]
          },
          scopeMetrics: [
            {
              scope: {
                name: 'eval-metrics',
                version: '1.0.0'
              },
              metrics: [
                {
                  name: 'eval.accuracy',
                  description: 'Evaluation accuracy percentage',
                  unit: 'percent',
                  gauge: {
                    dataPoints: [
                      {
                        timeUnixNano: baseTimeNano.toString(),
                        asDouble: liveMetrics.accuracy
                      }
                    ]
                  }
                },
                {
                  name: 'eval.avg_score',
                  description: 'Average test score',
                  unit: 'percent',
                  gauge: {
                    dataPoints: [
                      {
                        timeUnixNano: baseTimeNano.toString(),
                        asDouble: liveMetrics.avgScore
                      }
                    ]
                  }
                },
                {
                  name: 'eval.pass_rate',
                  description: 'Test pass rate',
                  unit: 'percent',
                  gauge: {
                    dataPoints: [
                      {
                        timeUnixNano: baseTimeNano.toString(),
                        asDouble: liveMetrics.passRate
                      }
                    ]
                  }
                },
                {
                  name: 'eval.total_tests',
                  description: 'Total number of tests',
                  unit: 'count',
                  gauge: {
                    dataPoints: [
                      {
                        timeUnixNano: baseTimeNano.toString(),
                        asInt: runningTests.length.toString()
                      }
                    ]
                  }
                },
                ...(selectedAgent === 'islamic' ? [{
                  name: 'eval.shariah_compliance',
                  description: 'Shariah compliance percentage',
                  unit: 'percent',
                  gauge: {
                    dataPoints: [
                      {
                        timeUnixNano: baseTimeNano.toString(),
                        asDouble: liveMetrics.shariahCompliance
                      }
                    ]
                  }
                }] : [])
              ]
            }
          ]
        }
      ]
    }

    const blob = new Blob([JSON.stringify(otelReport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `otel-trace-${selectedAgent}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsExportDialogOpen(false)
  }

  const closeEvalFlow = () => {
    // Clean up timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    setIsEvalFlowOpen(false)
    setCurrentStep(0)
    setSelectedAgent('ecommerce')
    setSelectedTests([])
    setRunningTests([])
    setEvalProgress(0)
    setCompletedCount(0)
    setIsPaused(false)
  }

  const viewResults = () => {
    setSelectedTab(selectedAgent)
    closeEvalFlow()
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/examples">Examples</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>AI Agent Evaluations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Agent Evaluations</h1>
          <p className="text-lg text-muted-foreground">
            OpenTelemetry-based evaluation dashboard for bilingual AI agents
          </p>
        </div>
        <Button onClick={startEvaluation} size="lg" className="gap-2">
          <Play className="w-4 h-4" />
          Run New Evaluation
        </Button>
      </div>

      {/* Metrics Overview - Live updating during evaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-300">
        <StatsCard
          label="Accuracy"
          value={currentStep === 1 && selectedAgent === selectedTab ? liveMetrics.accuracy : currentMetrics.accuracy}
          trend={currentStep === 1 ? undefined : (selectedTab === 'islamic' ? 5.7 : 2.4)}
          icon={<CheckCircle2 />}
          format="percentage"
          className={currentStep === 1 && selectedAgent === selectedTab ? 'ring-2 ring-primary ring-offset-2' : ''}
        />
        <StatsCard
          label="Avg Latency"
          value={currentStep === 1 && selectedAgent === selectedTab ? `${liveMetrics.avgLatency}ms` : `${currentMetrics.avgLatency}ms`}
          trend={currentStep === 1 ? undefined : (selectedTab === 'islamic' ? -12 : -5)}
          trendLabel={currentStep === 1 ? undefined : "vs last week"}
          icon={<Zap />}
          className={currentStep === 1 && selectedAgent === selectedTab ? 'ring-2 ring-primary ring-offset-2' : ''}
        />
        {selectedTab === 'islamic' && (
          <StatsCard
            label="Shariah Compliance"
            value={currentStep === 1 && selectedAgent === 'islamic' ? liveMetrics.shariahCompliance : islamicServicesMetrics.shariahCompliance}
            icon={<Shield />}
            format="percentage"
            className={currentStep === 1 && selectedAgent === 'islamic' ? 'ring-2 ring-primary ring-offset-2' : ''}
          />
        )}
        {selectedTab === 'ecommerce' && (
          <StatsCard
            label="Pass Rate"
            value={currentStep === 1 && selectedAgent === 'ecommerce' ? liveMetrics.passRate : ((currentMetrics.passed / currentMetrics.totalTests) * 100).toFixed(1)}
            icon={<Activity />}
            format="percentage"
            className={currentStep === 1 && selectedAgent === 'ecommerce' ? 'ring-2 ring-primary ring-offset-2' : ''}
          />
        )}
        <StatsCard
          label="Cost/1k Requests"
          value={`$${currentMetrics.costPer1k.toFixed(2)}`}
          icon={<DollarSign />}
        />
      </div>

      {/* Tabs for Different Agents */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="ecommerce" className="flex items-center gap-2">
            E-commerce Support
            <Badge variant="outline">{ecommerceMetrics.totalTests} tests</Badge>
          </TabsTrigger>
          <TabsTrigger value="islamic" className="flex items-center gap-2">
            Islamic Services
            <Badge variant="outline">{islamicServicesMetrics.totalTests} tests</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          {/* Agent Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{currentAgentInfo.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedTab === 'islamic'
                      ? 'Specialized in Islamic practices & guidance'
                      : 'Customer support for e-commerce queries'}
                  </p>
                </div>
                <Badge variant={currentAgentInfo.status === 'production' ? 'default' : 'secondary'}>
                  {currentAgentInfo.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Model</span>
                  <p className="font-medium">{currentAgentInfo.model}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Version</span>
                  <p className="font-medium">{currentAgentInfo.version}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Languages</span>
                  <p className="font-medium">{currentAgentInfo.languages.join(', ')}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Last Evaluated</span>
                  <p className="font-medium">
                    {new Date(currentAgentInfo.lastEvaluated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {selectedTab === 'islamic' && (
                <>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Reviewed by:</span>
                    <span className="font-medium">{islamicServicesAgentInfo.reviewedBy}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search test cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>

                {selectedTab === 'islamic' && (
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="prayer">Prayer</SelectItem>
                      <SelectItem value="zakat">Zakat</SelectItem>
                      <SelectItem value="hajj">Hajj</SelectItem>
                      <SelectItem value="fasting">Fasting</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="passed"
                    checked={passedOnlyFilter}
                    onCheckedChange={(checked) => setPassedOnlyFilter(checked as boolean)}
                  />
                  <label htmlFor="passed" className="text-sm cursor-pointer">
                    Passed only
                  </label>
                </div>

                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Test Case</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Language</th>
                      {selectedTab === 'islamic' && (
                        <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                      )}
                      <th className="px-4 py-3 text-left text-sm font-medium">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Latency</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredResults.length === 0 ? (
                      <tr>
                        <td colSpan={selectedTab === 'islamic' ? 7 : 6} className="px-4 py-8 text-center text-muted-foreground">
                          No results found
                        </td>
                      </tr>
                    ) : (
                      filteredResults.map((result) => (
                        <tr key={result.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-4 text-sm font-medium">
                            {result.testCase}
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={result.language === 'ar' ? 'default' : 'outline'}>
                              {result.language === 'ar' ? 'العربية' : 'English'}
                            </Badge>
                          </td>
                          {selectedTab === 'islamic' && (
                            <td className="px-4 py-4">
                              {(result as IslamicEvalResult).metadata?.category && (
                                <Badge variant="secondary" className="capitalize">
                                  {(result as IslamicEvalResult).metadata!.category}
                                </Badge>
                              )}
                            </td>
                          )}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 min-w-[120px]">
                              <Progress value={result.score} className="w-16 h-2" />
                              <span className="text-sm font-medium tabular-nums">{result.score}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm tabular-nums">
                            {result.latency}ms
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={result.passed ? 'default' : 'destructive'}>
                              {result.passed ? 'Pass' : 'Fail'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDetails(result)}
                            >
                              View
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Tests</p>
                  <p className="text-2xl font-bold">{currentMetrics.totalTests}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{currentMetrics.passed}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{currentMetrics.failed}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
                  <p className="text-2xl font-bold">{currentMetrics.avgScore.toFixed(1)}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedTest && (
            <>
              <SheetHeader>
                <SheetTitle className={cn(
                  "text-xl",
                  selectedTest.language === 'ar' && "text-right"
                )}>
                  {selectedTest.testCase}
                </SheetTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant={selectedTest.passed ? 'default' : 'destructive'}>
                    {selectedTest.passed ? 'Pass' : 'Fail'}
                  </Badge>
                  <Badge variant="outline">
                    {selectedTest.language === 'ar' ? 'العربية' : 'English'}
                  </Badge>
                  {(selectedTest as IslamicEvalResult).metadata?.category && (
                    <Badge variant="secondary" className="capitalize">
                      {(selectedTest as IslamicEvalResult).metadata!.category}
                    </Badge>
                  )}
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Score */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold">Score</h4>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Progress value={selectedTest.score} className="flex-1" />
                      <span className="text-2xl font-bold tabular-nums">{selectedTest.score}%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Input */}
                <div>
                  <h4 className="font-semibold mb-2">User Input</h4>
                  <Card>
                    <CardContent className={cn(
                      "pt-4",
                      selectedTest.language === 'ar' && "text-right"
                    )}>
                      <p className="text-sm">{selectedTest.input}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Expected Output */}
                <div>
                  <h4 className="font-semibold mb-2">Expected Output</h4>
                  <Card>
                    <CardContent className={cn(
                      "pt-4",
                      selectedTest.language === 'ar' && "text-right"
                    )}>
                      <p className="text-sm text-muted-foreground">
                        {selectedTest.expected}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Actual Output */}
                <div>
                  <h4 className="font-semibold mb-2">Actual Output</h4>
                  <Card className={cn(
                    "border-2",
                    selectedTest.passed ? 'border-green-500' : 'border-red-500'
                  )}>
                    <CardContent className={cn(
                      "pt-4",
                      selectedTest.language === 'ar' && "text-right"
                    )}>
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
                        {(selectedTest as IslamicEvalResult).metadata?.category && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Category:</dt>
                            <dd className="font-medium capitalize">{(selectedTest as IslamicEvalResult).metadata!.category}</dd>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Latency:</dt>
                          <dd className="font-medium tabular-nums">{selectedTest.latency}ms</dd>
                        </div>
                        {selectedTest.metadata?.tokensUsed && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Tokens Used:</dt>
                            <dd className="font-medium tabular-nums">{selectedTest.metadata.tokensUsed}</dd>
                          </div>
                        )}
                        {(selectedTest as IslamicEvalResult).metadata?.calculationMethod && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Calculation Method:</dt>
                            <dd className="font-medium">{(selectedTest as IslamicEvalResult).metadata!.calculationMethod}</dd>
                          </div>
                        )}
                        {(selectedTest as IslamicEvalResult).metadata?.location && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Location:</dt>
                            <dd className="font-medium">{(selectedTest as IslamicEvalResult).metadata!.location}</dd>
                          </div>
                        )}
                        {(selectedTest as IslamicEvalResult).metadata?.shariahCompliant !== undefined && (
                          <div className="flex justify-between items-center">
                            <dt className="text-muted-foreground">Shariah Compliant:</dt>
                            <dd>
                              <Badge variant={(selectedTest as IslamicEvalResult).metadata!.shariahCompliant ? 'default' : 'destructive'}>
                                {(selectedTest as IslamicEvalResult).metadata!.shariahCompliant ? 'Yes' : 'No'}
                              </Badge>
                            </dd>
                          </div>
                        )}
                        {(selectedTest as EvalResult).metadata?.intent && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Intent:</dt>
                            <dd className="font-medium capitalize">{(selectedTest as EvalResult).metadata?.intent?.replace('_', ' ')}</dd>
                          </div>
                        )}
                        {(selectedTest as EvalResult).metadata?.sentiment && (
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Sentiment:</dt>
                            <dd className="font-medium capitalize">{(selectedTest as EvalResult).metadata?.sentiment}</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Evaluation Flow Sheet */}
      <Sheet open={isEvalFlowOpen} onOpenChange={setIsEvalFlowOpen}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Run New Evaluation</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Stepper steps={evalSteps} currentStep={currentStep} className="mb-8" />

            {/* Step 1: Configure */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Select Agent</h3>
                    <p className="text-sm text-muted-foreground">Choose which AI agent to evaluate</p>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedAgent} onValueChange={(val) => setSelectedAgent(val as 'ecommerce' | 'islamic')}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                          <RadioGroupItem value="ecommerce" id="agent-ecommerce" />
                          <Label htmlFor="agent-ecommerce" className="cursor-pointer flex-1">
                            <div className="font-medium">E-commerce Support Agent</div>
                            <div className="text-sm text-muted-foreground">Customer support for e-commerce queries ({ecommerceEvalResults.length} tests)</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                          <RadioGroupItem value="islamic" id="agent-islamic" />
                          <Label htmlFor="agent-islamic" className="cursor-pointer flex-1">
                            <div className="font-medium">Islamic Services Assistant</div>
                            <div className="text-sm text-muted-foreground">Specialized in Islamic practices & guidance ({islamicServicesEvalResults.length} tests)</div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Select Tests</h3>
                        <p className="text-sm text-muted-foreground">Choose which tests to run</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={selectAllTests}>
                          Select All
                        </Button>
                        <Button variant="outline" size="sm" onClick={deselectAllTests}>
                          Deselect All
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {availableTests.map((test) => (
                        <div key={test.id} className="flex items-start gap-3 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`test-${test.id}`}
                            checked={selectedTests.includes(test.id)}
                            onCheckedChange={() => toggleTestSelection(test.id)}
                          />
                          <Label htmlFor={`test-${test.id}`} className="cursor-pointer flex-1">
                            <div className="font-medium text-sm">{test.testCase}</div>
                            <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                              <Badge variant={test.language === 'ar' ? 'default' : 'outline'} className="text-xs">
                                {test.language === 'ar' ? 'AR' : 'EN'}
                              </Badge>
                              {selectedAgent === 'islamic' && (test as IslamicEvalResult).metadata?.category && (
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {(test as IslamicEvalResult).metadata!.category}
                                </Badge>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedTests.length > 0 && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Estimated duration:</span>
                        <span className="font-medium">~{Math.ceil(estimatedDuration)} seconds</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEvalFlowOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={startRunning} disabled={selectedTests.length === 0}>
                    Start Evaluation ({selectedTests.length} tests)
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Running */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Running Tests</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedCount} of {runningTests.length} tests completed
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span className="font-medium tabular-nums">{evalProgress}%</span>
                        </div>
                        <Progress value={evalProgress} className="h-2" />
                      </div>

                      <Separator />

                      <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {runningTests.map((test) => (
                          <div
                            key={test.id}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ease-in-out",
                              test.status === 'complete' && "bg-green-50 border-green-200 dark:bg-green-950/20",
                              test.status === 'failed' && "bg-red-50 border-red-200 dark:bg-red-950/20",
                              test.status === 'running' && "bg-blue-50 border-blue-200 dark:bg-blue-950/20"
                            )}
                          >
                            <div className="shrink-0">
                              {test.status === 'pending' && (
                                <div className="w-5 h-5 rounded-full border-2 border-muted" />
                              )}
                              {test.status === 'running' && (
                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                              )}
                              {test.status === 'complete' && (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              )}
                              {test.status === 'failed' && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{test.testCase}</div>
                              {test.status === 'running' && (
                                <div className="text-xs text-muted-foreground">Testing...</div>
                              )}
                              {(test.status === 'complete' || test.status === 'failed') && test.score !== undefined && (
                                <div className="text-xs text-muted-foreground">Score: {test.score}%</div>
                              )}
                            </div>
                            {(test.status === 'complete' || test.status === 'failed') && (
                              <Badge variant={test.passed ? 'default' : 'destructive'} className="text-xs">
                                {test.passed ? 'Pass' : 'Fail'}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                  <Button variant="destructive" onClick={cancelEvaluation} disabled={isPaused}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Evaluation
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Complete */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-600 rounded-full">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Evaluation Complete!</h3>
                        <p className="text-sm text-muted-foreground">
                          All {runningTests.length} tests have been executed successfully
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Summary</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{runningTests.length}</div>
                        <div className="text-sm text-muted-foreground">Total Tests</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {runningTests.filter(t => t.passed).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Passed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {runningTests.filter(t => !t.passed).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Failed</div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Average Score:</span>
                        <span className="font-medium tabular-nums">
                          {(runningTests.reduce((acc, t) => acc + (t.score || 0), 0) / runningTests.length).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pass Rate:</span>
                        <span className="font-medium tabular-nums">
                          {((runningTests.filter(t => t.passed).length / runningTests.length) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Agent:</span>
                        <span className="font-medium capitalize">{selectedAgent === 'ecommerce' ? 'E-commerce Support' : 'Islamic Services'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={showExportDialog} className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Report (JSON)
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={closeEvalFlow}>
                      Close
                    </Button>
                    <Button onClick={viewResults}>
                      View Full Results
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Export Preview Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export OpenTelemetry Trace</DialogTitle>
            <DialogDescription className="space-y-3 pt-4">
              <p>
                This will download an <span className="font-semibold">OpenTelemetry-compliant JSON file</span> containing traces and metrics from your evaluation run.
              </p>

              <div className="bg-muted p-3 rounded-md text-sm space-y-2">
                <p className="font-medium text-foreground">What&apos;s included:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><span className="font-medium text-foreground">Traces:</span> Each test as a span with timing, attributes, and status</li>
                  <li><span className="font-medium text-foreground">Metrics:</span> Accuracy, pass rate, avg score{selectedAgent === 'islamic' && ', Shariah compliance'}</li>
                  <li><span className="font-medium text-foreground">Metadata:</span> Agent info, service name, timestamps</li>
                </ul>
              </div>

              <p className="text-xs">
                ℹ️ Compatible with Jaeger, Grafana, Honeycomb, and other OpenTelemetry backends.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmExport}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
