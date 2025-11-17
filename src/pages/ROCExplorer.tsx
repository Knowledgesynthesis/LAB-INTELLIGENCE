import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { diagnosticTests } from '@/data/tests';
import { formatProbability } from '@/utils/bayesian';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function ROCExplorer() {
  const [selectedTest, setSelectedTest] = useState(diagnosticTests[0].id);
  const [threshold, setThreshold] = useState(0.5);

  const test = diagnosticTests.find(t => t.id === selectedTest) || diagnosticTests[0];

  // Generate ROC curve data points
  // In a real implementation, this would come from actual threshold data
  // Here we approximate based on sensitivity and specificity
  const generateROCData = () => {
    const points = [];
    for (let i = 0; i <= 100; i += 5) {
      const t = i / 100;
      // Approximate sensitivity/specificity trade-off
      const sens = test.sensitivity - (1 - t) * (test.sensitivity - 0.3);
      const spec = test.specificity - t * (test.specificity - 0.3);
      const fpRate = 1 - spec;
      points.push({
        fpRate: fpRate * 100,
        sensitivity: sens * 100,
        threshold: t
      });
    }
    return points;
  };

  const rocData = generateROCData();

  // Current point based on threshold
  const currentSens = test.sensitivity - (1 - threshold) * (test.sensitivity - 0.3);
  const currentSpec = test.specificity - threshold * (test.specificity - 0.3);
  const currentFPRate = 1 - currentSpec;

  // Calculate AUC (approximation)
  const auc = (test.sensitivity + test.specificity) / 2;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ROC Curve Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Explore test performance and threshold trade-offs
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Test</CardTitle>
            <CardDescription>Choose a diagnostic test to explore</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
              {diagnosticTests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
            </Select>
            <p className="text-sm text-muted-foreground mt-2">{test.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Threshold</CardTitle>
            <CardDescription>Adjust cutoff value</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={threshold * 100}
              onChange={(value) => setThreshold(value / 100)}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-sm">
              <span>More Sensitive</span>
              <span className="font-bold">{(threshold * 100).toFixed(0)}%</span>
              <span>More Specific</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Test Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle>Current Operating Point</CardTitle>
          <CardDescription>Performance at selected threshold</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Sensitivity</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatProbability(currentSens)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">True Positive Rate</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Specificity</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formatProbability(currentSpec)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">True Negative Rate</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">FP Rate</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {formatProbability(currentFPRate)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">1 - Specificity</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">AUC</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {auc.toFixed(3)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Area Under Curve</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROC Curve */}
      <Card>
        <CardHeader>
          <CardTitle>ROC Curve</CardTitle>
          <CardDescription>
            Receiver Operating Characteristic - Sensitivity vs False Positive Rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="fpRate"
                  name="False Positive Rate"
                  label={{ value: 'False Positive Rate (%)', position: 'insideBottom', offset: -5 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="number"
                  dataKey="sensitivity"
                  name="Sensitivity"
                  label={{ value: 'Sensitivity (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                {/* ROC Curve */}
                <Scatter
                  name="ROC Curve"
                  data={rocData}
                  fill="#3b82f6"
                  line={{ stroke: '#3b82f6', strokeWidth: 2 }}
                  shape="circle"
                />

                {/* Current point */}
                <Scatter
                  name="Current Threshold"
                  data={[{ fpRate: currentFPRate * 100, sensitivity: currentSens * 100 }]}
                  fill="#ef4444"
                  shape="star"
                  legendType="star"
                />

                {/* Chance line (diagonal) */}
                <ReferenceLine
                  segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]}
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  label="Chance"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding ROC Curves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">What is an ROC Curve?</h4>
              <p className="text-sm text-muted-foreground">
                The ROC curve plots sensitivity (true positive rate) against the false positive rate (1 - specificity)
                at various threshold settings. It shows the trade-off between catching all cases (high sensitivity)
                and avoiding false alarms (high specificity).
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Area Under Curve (AUC)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AUC = 1.0: Perfect test (all cases correctly classified)</li>
                <li>• AUC = 0.9-1.0: Excellent discrimination</li>
                <li>• AUC = 0.8-0.9: Good discrimination</li>
                <li>• AUC = 0.7-0.8: Fair discrimination</li>
                <li>• AUC = 0.5: No better than chance (diagonal line)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Threshold Selection</h4>
              <p className="text-sm text-muted-foreground">
                Moving the threshold left (lower) increases sensitivity but decreases specificity.
                Moving it right (higher) increases specificity but decreases sensitivity.
                The optimal threshold depends on the clinical context and consequences of false positives vs false negatives.
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">⚠️ Important</p>
              <p className="text-sm mt-1">
                ROC curves show test performance but don't account for disease prevalence.
                Even a test with excellent AUC may have poor PPV in low-prevalence settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
