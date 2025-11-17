import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { diagnosticTests } from '@/data/tests';
import {
  calculatePostTestProbability,
  formatProbability,
  formatLR,
  interpretLR
} from '@/utils/bayesian';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function BayesianSimulator() {
  const [preTestProbability, setPreTestProbability] = useState(0.3);
  const [selectedTest, setSelectedTest] = useState(diagnosticTests[0].id);
  const [testResult, setTestResult] = useState<'positive' | 'negative'>('positive');

  const test = diagnosticTests.find(t => t.id === selectedTest) || diagnosticTests[0];
  const lr = testResult === 'positive' ? test.lrPositive : test.lrNegative;
  const postTestProbability = calculatePostTestProbability(preTestProbability, lr);

  // Generate data for visualization
  const chartData = [];
  for (let i = 0; i <= 100; i += 5) {
    const preTest = i / 100;
    const postTestPos = calculatePostTestProbability(preTest, test.lrPositive);
    const postTestNeg = calculatePostTestProbability(preTest, test.lrNegative);
    chartData.push({
      preTest: i,
      'Positive Result': postTestPos * 100,
      'Negative Result': postTestNeg * 100,
      'No Test': i
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bayesian Updating Simulator</h1>
        <p className="text-muted-foreground mt-2">
          Visualize how test results update probability using likelihood ratios
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Test Parameters</CardTitle>
          <CardDescription>
            Adjust the pre-test probability and select a diagnostic test
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pre-test Probability */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Pre-Test Probability</label>
              <span className="text-sm font-bold text-primary">
                {formatProbability(preTestProbability)}
              </span>
            </div>
            <Slider
              value={preTestProbability * 100}
              onChange={(value) => setPreTestProbability(value / 100)}
              min={0}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              The probability of disease before performing the test, based on clinical presentation and prevalence
            </p>
          </div>

          {/* Test Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Diagnostic Test</label>
            <Select value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
              {diagnosticTests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Test Result */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Test Result</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setTestResult('positive')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  testResult === 'positive'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Positive
              </button>
              <button
                onClick={() => setTestResult('negative')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  testResult === 'negative'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Negative
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle>{test.name}</CardTitle>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Sensitivity</p>
              <p className="text-2xl font-bold">{formatProbability(test.sensitivity)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Specificity</p>
              <p className="text-2xl font-bold">{formatProbability(test.specificity)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LR+</p>
              <p className="text-2xl font-bold">{formatLR(test.lrPositive)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LR−</p>
              <p className="text-2xl font-bold">{formatLR(test.lrNegative)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>Bayesian Update Result</CardTitle>
          <CardDescription>
            Impact of {testResult} test result on disease probability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Pre-Test Probability</p>
              <p className="text-4xl font-bold">{formatProbability(preTestProbability)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Likelihood Ratio</p>
              <p className="text-4xl font-bold text-primary">{formatLR(lr)}</p>
              <Badge variant="secondary" className="mt-2">
                {testResult === 'positive' ? 'LR+' : 'LR−'}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Post-Test Probability</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {formatProbability(postTestProbability)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-secondary/50 rounded-md">
            <p className="text-sm font-medium mb-2">Interpretation:</p>
            <p className="text-sm">
              {interpretLR(lr, testResult === 'positive')}
            </p>
            <p className="text-sm mt-2">
              The {testResult} {test.name} result {testResult === 'positive' ? 'increases' : 'decreases'} the
              probability of disease from {formatProbability(preTestProbability)} to{' '}
              {formatProbability(postTestProbability)}.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Probability Curves</CardTitle>
          <CardDescription>
            Post-test probability across different pre-test probabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="preTest"
                  label={{ value: 'Pre-Test Probability (%)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Post-Test Probability (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Positive Result"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Negative Result"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="No Test"
                  stroke="#6b7280"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <ReferenceLine
                  x={preTestProbability * 100}
                  stroke="#3b82f6"
                  strokeDasharray="3 3"
                  label="Current"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Learning Points */}
      <Card>
        <CardHeader>
          <CardTitle>Key Learning Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Likelihood ratios (LRs) quantify how much a test result changes the probability of disease
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                LR+ &gt; 10 or LR− &lt; 0.1 indicate large changes in probability (strong tests)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Post-test probability depends on BOTH pre-test probability AND test characteristics
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Even "good" tests may not change probability much if pre-test probability is very high or very low
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                The diagonal line represents "no test" - tests should move probability away from this line
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
